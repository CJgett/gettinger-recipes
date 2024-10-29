"use client"
import { useState, useRef, useEffect } from 'react'
import { InView } from 'react-intersection-observer'
import RecipeDropdown from './form-components/RecipeDropdown'
import { firstPrompt } from '../constants/FirstPrompt'
import { queryAI } from './component-server-functions'

export default function Remixer() {

  /* setup textarea input */ 
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef(null);

  function handleTextareaChange(event) {
    setTextareaValue(event.target.value);
  }

  /* setup array of chat arrays (Saved Recipes) */
  const initMessage = {"botOrUser":"bot", "botAnimText": "Hello! ", "messageText":"How can I help you remix your recipe? :)"};
  const [allChatsArray, setAllChatsArray] = useState(new Array(new Array (initMessage)));
  const [currentChatID, setCurrentChatID] = useState(0);
  const [chatTitles, setChatTitles] = useState([]);


  // use to get data from local storage only once.
  let setupDone = false;

  /* setup variables from local storage */
  useEffect(() => {
    if(document.readyState === 'complete' && setupDone == false) {
      setupDone = true;
      const chatsFromLocalStorage = JSON.parse(window.localStorage.getItem('chatsFromLocalStorage'));

      let lastChatID = JSON.parse(window.localStorage.getItem('lastChatID')); 
      if (chatsFromLocalStorage !== 'undefined' && chatsFromLocalStorage !== null ) {
        if(lastChatID > chatsFromLocalStorage.length) {
          lastChatID = 0;
        }
        setAllChatsArray(chatsFromLocalStorage);
        setCurrentChatID(lastChatID);
      }
    }
  },[]);

  function updateAllChatsArray(newMessage) {
    setAllChatsArray(prevChats => {
        const newAllChatsArray = prevChats.slice();
        newAllChatsArray[currentChatID] = [...newAllChatsArray[currentChatID], newMessage];
        window.localStorage.setItem('chatsFromLocalStorage', JSON.stringify(newAllChatsArray));
        window.localStorage.setItem('lastChatID', currentChatID);
        return newAllChatsArray; 
    });
  }

  function findChatTitle(message) {
    let title = "Remixed Recipe";
    if (message.includes("<h3>")) {
      title = message.substring(
        message.indexOf("<h3>") + 4,
        message.indexOf("</h3>")
      );
    } else if (message.includes("<name>")) {
      title = message.substring(
        message.indexOf("<name>") + 6,
        message.indexOf("</name>")
      );
    }
    return title;
  }

  /*plus button functionality (start a new chat)*/
  function startNewRemix() {
    setAllChatsArray([...allChatsArray, new Array(initMessage)]); 
    const newChatID = allChatsArray.length;
    setCurrentChatID(newChatID);
    setChatTitles(prevTitles => [...prevTitles, "Remixed Recipe"]);
    textareaRef.current.focus();
  }

  /* when user clicks an old chat, load it*/
  function handleSavedRecipeClick(e) {
    const newCurrentChatID = e.target.dataset.key;
    const oldCurrentChatID = currentChatID;
    setCurrentChatID(newCurrentChatID);
    window.localStorage.setItem('lastChatID', newCurrentChatID);

    if (allChatsArray[oldCurrentChatID].length == 1) {
      allChatsArray.pop();
    }
  }

  async function handleUserInput(e) { 
    e.preventDefault();

    const currentChatLength = allChatsArray[currentChatID].length;

    let currentMessage = textareaValue;
    let messageToAI = textareaValue;

    // Save the current textarea value and clear it
    if (currentChatLength <= 1) {
      const recipe = document.getElementById('recipe-dropdown-selected').value;
      currentMessage = `The recipe I'd like to remix is: ${recipe}.\n${currentMessage}`;
      messageToAI = firstPrompt(recipe, currentMessage);
    }
    
    // Add user message
    updateAllChatsArray({"botOrUser":"user", "messageText": currentMessage});
    // Get the bot's response
    const botResponse = await queryAI(messageToAI);
    // Add the new chat title if it's the first bot response
    if(currentChatLength <= 1) {
      console.log("setting new chat title");
      setChatTitles(prevTitles => [...prevTitles, findChatTitle(botResponse)]);
    }
    // Add bot message
    updateAllChatsArray({"botOrUser":"bot", "botAnimText": botResponse, "messageText": ""});
    window.localStorage.setItem('lastChatID', currentChatID);
    setTextareaValue("");
  }
  
  function toggleSidebar() {
    const sidebarClasses = document.querySelector(".remixer-sidebar").classList;
    const sidebarToggle = document.querySelector(".expand-sidebar");
    const remixerElement = document.querySelector(".remixer");
    console.log(sidebarClasses);

    if(sidebarClasses.contains("collapsed")) {
      console.log("collapsed");
        sidebarClasses.remove("collapsed");
        sidebarToggle.classList.remove("collapsed");
        sidebarToggle.title = "collapse sidebar";
        // Add overlay class for mobile
        remixerElement.classList.add("sidebar-open");
    } else {
      sidebarClasses.add("collapsed");
      sidebarToggle.classList.add("collapsed");
      sidebarToggle.title = "expand sidebar";
      remixerElement.classList.remove("sidebar-open");
    }
  }

  // Add click handler for closing sidebar when clicking outside
  function handleOutsideClick(e) {
    const sidebar = document.querySelector(".remixer-sidebar");
    const toggleButton = document.querySelector(".expand-sidebar");
    
    // If we're on mobile and clicking outside the sidebar
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !toggleButton.contains(e.target) && 
        !sidebar.classList.contains("collapsed")) {
        toggleSidebar();
    }
  }

  // Add the click handler to the component
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
        document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="remixer-container">
      <div className="remixer">
        <div className="remixer-sidebar">
          <h3>Saved Recipes</h3> 
          <ul className="saved-recipes-list">
            {allChatsArray.map(
              function(currentChat, index) {
                return(
                 <li className={`${index == currentChatID ? "current-recipe" :"" }`} key={index} data-key={index} onClick={handleSavedRecipeClick} tabIndex="0">{chatTitles[index]}</li> 
                );
              }
            )}
          </ul>
          <button 
            className="close-sidebar-mobile" 
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            >
             Close 
            </button>
        </div>
        <div className="remixer-chatbox">
          <div className="remixer-display-container">
            <div className="remixer-controls">
              <button title="collapse sidebar" className="expand-sidebar" onClick={toggleSidebar} >&lt;</button>
              <h3>Saved Recipe #{parseFloat(currentChatID) + 1}</h3>
              <button title="start new remix!" className="new-remix-button"  onClick={startNewRemix} disabled={allChatsArray[currentChatID].length === 1 ? true : false}>&#43;</button>
            </div>
            <div className="remixer-messages">
              {allChatsArray[currentChatID].map(
                function(message,index) {
                  return(
                    <div  key={index} className={`remixer-message ${message.botOrUser}`}> 
                    {message.botOrUser == "bot" ? 
                      (<InView as="div" triggerOnce="true">{({ inView, ref }) => 
                        (<div ref={ref} className={inView ? "in-view" : ""}> 
                          <p className="slide-in" dangerouslySetInnerHTML={{ __html: message.botAnimText }}></p> 
                          <p className="slide-over">{message.messageText}</p>
                        </div>)}</InView>) : 
                      <span>{message.messageText}</span>}
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div>
            <div className="remixer-input">
              {allChatsArray[currentChatID].length <= 1 ? 
                <div className="remixer-first-input-container">
                  <div className="recipe-dropdown-container">
                    <RecipeDropdown />
                  </div>
                  <textarea name="user-preferences" className="remixer-first-input" value={textareaValue} ref={textareaRef} onChange={handleTextareaChange} aria-label="please describe how you want to remix this recipe" placeholder="How should I remix this recipe?"></textarea>
                </div> 
                : 
                <textarea value={textareaValue} ref={textareaRef} onChange={handleTextareaChange} aria-label="start chatting with the remixer here"></textarea>
              }              
              <button type="submit" onClick={handleUserInput} disabled={(textareaValue === "") ? true : false}>&crarr;</button>
            </div>
            <div className="remixer-warning">
            All chatbots can make mistakes. Please use responsibly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
