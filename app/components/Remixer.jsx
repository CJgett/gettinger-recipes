"use client"
import { useState, useRef, useEffect } from 'react'
import { InView } from 'react-intersection-observer'
import { accessToken } from '../../ignore/huggingface_accesstoken'
import RecipeDropdown from './form-components/RecipeDropdown'

export default function Remixer() {

  /* setup textarea input */ 
  const [textareaValue, setTextareaValue] = useState("");

  function handleTextareaChange(event) {
    setTextareaValue(event.target.value);
  }

  /* setup array of chat arrays (Saved Recipes) */
  const initMessage = {"botOrUser":"bot", "botAnimText": "hello!", "messageText":"how can i help you remix your recipe? :)"};
  const [allChatsArray, setAllChatsArray] = useState(new Array(new Array (initMessage)));
  const [currentChatID, setCurrentChatID] = useState(0);


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

  const textareaRef = useRef(null);

  /*plus button functionality (start a new chat)*/
  function startNewRemix() {
    setAllChatsArray([...allChatsArray, new Array(initMessage)]); 
    const newChatID = allChatsArray.length;
    setCurrentChatID(newChatID);
    textareaRef.current.focus();
  }

  function handleSavedRecipeClick(e) {
    const newCurrentChatID = e.target.dataset.key;
    const oldCurrentChatID = currentChatID;
    setCurrentChatID(newCurrentChatID);
    window.localStorage.setItem('lastChatID', newCurrentChatID);

    if (allChatsArray[oldCurrentChatID].length == 1) {
      allChatsArray.pop();
    }
  }

  /* what to do when a user sends a message 
   * (update the chats array, reset textarea, focus text area)*/
  async function queryAndUpdate(textareaValue) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${accessToken}`);
    const toSend = "Hi! It's nice talking to you :) what is your response to the folllowing message? please dont say you don't know how to: " + textareaValue;
    
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407",
            {
                headers: myHeaders,
                method: "POST",
                body: JSON.stringify({inputs: toSend}),
            }
        );
        const result = await response.json();
        // Instead of directly updating, return the response
        console.log(result[0].generated_text);
        return result[0].generated_text;
    } catch (error) {
        console.error('Error:', error);
        return "Sorry, I encountered an error processing your request.";
    }
  }


  async function sendMessage(e) { 
    e.preventDefault();
    
    // Save the current textarea value and clear it
    const currentMessage = textareaValue;
    setTextareaValue("");
    textareaRef.current.focus();
    
    // Add user message
    updateAllChatsArray({"botOrUser":"user", "messageText": currentMessage});
    
    // Get the bot's response
    const botResponse = await queryAndUpdate(currentMessage);
    
    // Add bot message
    updateAllChatsArray({"botOrUser":"bot", "botAnimText": botResponse, "messageText": ""});
    
    window.localStorage.setItem('lastChatID', currentChatID);
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
                 <li className={`${index == currentChatID ? "current-recipe" :"" }`} key={index} data-key={index} onClick={handleSavedRecipeClick} tabIndex="0">Saved Recipe #{index + 1}</li> 
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
                    {message.botOrUser == "bot" ? (<InView as="div" triggerOnce="true">{({ inView, ref }) => (<div ref={ref} className={inView ? "in-view" : ""}> <p className="slide-in">{message.botAnimText}</p> <p className="slide-over">{message.messageText}</p></div>)}</InView>) : <span>{message.messageText}</span>}
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div>
            <form className="remixer-input" onSubmit={sendMessage}>
              {allChatsArray[currentChatID].length <= 1 ? 
                <div className="remixer-first-input-container">
                  <div className="recipe-dropdown-container">
                    <RecipeDropdown />
                  </div>
                  <textarea className="remixer-first-input" value={textareaValue} ref={textareaRef} onChange={handleTextareaChange} aria-label="please describe how you want to remix this recipe" placeholder="How should I remix this recipe?"></textarea>
                </div> 
                : 
                <textarea value={textareaValue} ref={textareaRef} onChange={handleTextareaChange} aria-label="start chatting with the remixer here"></textarea>
              }              
              <button type="submit" onClick={sendMessage} disabled={(textareaValue === "") ? true : false}>&crarr;</button>
            </form>
            <div className="remixer-warning">
            All chatbots can make mistakes. Please use responsibly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
