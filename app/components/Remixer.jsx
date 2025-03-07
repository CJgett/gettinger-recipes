"use client"
import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { InView } from 'react-intersection-observer'

import RecipeDropdown from './form-components/RecipeDropdown'
import { firstPrompt } from '../constants/FirstPrompt'
import { nextPrompt } from '../constants/NextPrompt'
import { queryAI } from './component-server-functions'
import Smile from './decorations/Smile'

export function RemixerInner() {

  /* setup textarea input */ 
  const [textareaValue, setTextareaValue] = useState("");
  const textareaRef = useRef(null);

  function handleTextareaChange(event) {
    setTextareaValue(event.target.value);
  }

  /* setup array of chat arrays (Saved Recipes) */
  const initMessage = {"botOrUser":"bot", "botAnimText": "<span>Hello!&nbsp;</span>", "messageText":"How can I help you remix your recipe? :)"};
  const [allChatsArray, setAllChatsArray] = useState(new Array(new Array (initMessage)));
  const [currentChatID, setCurrentChatID] = useState(0);
  const [chatTitles, setChatTitles] = useState(["New Recipe Remix!"]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [focusedRecipeIndex, setFocusedRecipeIndex] = useState(0);

  /* setup variables from local storage, handle if recipeID is provided */
  const recipeID = useSearchParams().get('recipeId');

  useEffect(() => {
    const chatsFromLocalStorage = JSON.parse(window.localStorage.getItem('chatsFromLocalStorage'));
    const chatTitlesFromLocalStorage = JSON.parse(window.localStorage.getItem('chatTitles'));
    let lastChatID = JSON.parse(window.localStorage.getItem('lastChatID')); 
    if (chatsFromLocalStorage !== 'undefined' && chatsFromLocalStorage !== null ) {
      if (lastChatID === null || lastChatID === undefined || lastChatID >= chatsFromLocalStorage.length) {
        lastChatID = 0;
      }

      setAllChatsArray(chatsFromLocalStorage);
      setChatTitles(chatTitlesFromLocalStorage);
      setCurrentChatID(lastChatID);
      if (recipeID !== null) {
        startNewRemix();
      }
    }
  },[]);

  function updateAllChatsArray(newMessage) {
    setAllChatsArray(prevChats => {
        const newAllChatsArray = prevChats.slice();
        newAllChatsArray[currentChatID] = [...newAllChatsArray[currentChatID], newMessage];
        window.localStorage.setItem('chatTitles', JSON.stringify(chatTitles));
        window.localStorage.setItem('chatsFromLocalStorage', JSON.stringify(newAllChatsArray));
        window.localStorage.setItem('lastChatID', currentChatID);
        return newAllChatsArray; 
    });
  }

  function findChatTitle(message) {
    let title = "New Recipe Remix!";
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
    setAllChatsArray(prevChats => [...prevChats, new Array(initMessage)]); 
    setCurrentChatID(prevChatID => prevChatID + 1);
    setChatTitles(prevTitles => [...prevTitles, "New Recipe Remix!"]);
    textareaRef.current.focus();
    setFocusedRecipeIndex(allChatsArray.length);
  }

  function handleSavedRecipeKeyDown(e) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedRecipeIndex((prevIndex) => Math.min(prevIndex + 1, allChatsArray.length - 1));
        const nextElement = e.target.nextElementSibling;
        if (nextElement) {  
          nextElement.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedRecipeIndex((prevIndex) => Math.min(prevIndex - 1, 0));
        const prevElement = e.target.previousElementSibling;
        if (prevElement) {
          prevElement.focus();
        }
        break;
      case 'Enter':
        handleSavedRecipeClick(e);
        break;
      default:
        break;
    }
  }

  /* when user clicks an old chat, load it*/
  function handleSavedRecipeClick(e) {
    const newCurrentChatID = parseInt(e.target.dataset.key);
    const oldCurrentChatID = currentChatID;
    setCurrentChatID(newCurrentChatID);
    setFocusedRecipeIndex(newCurrentChatID);
    window.localStorage.setItem('lastChatID', newCurrentChatID);

    // Remove empty chats when switching
    if (allChatsArray[oldCurrentChatID] !== undefined && allChatsArray[oldCurrentChatID].length == 1) {
        setAllChatsArray(prevChats => 
            prevChats.filter((_, index) => index !== oldCurrentChatID)
        );
        
        setChatTitles(prevTitles => 
            prevTitles.filter((_, index) => index !== oldCurrentChatID)
        );
    }
  }

  useEffect(() => {
    if (isLoading) {  // Only scroll when loading starts
      const messagesContainer = document.querySelector('.remixer-messages');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }, [isLoading]);

  async function handleUserInput(e) { 
    e.preventDefault();
    try {
        const currentChatLength = allChatsArray[currentChatID].length;
        let currentMessage = textareaValue;
        let messageToAI = currentMessage;
        setTextareaValue("");

        // Create conversation history
        const conversationHistory = allChatsArray[currentChatID].map(msg => ({
            role: msg.botOrUser === "bot" ? "assistant" : "user",
            content: msg.botOrUser === "bot" ? msg.botAnimText + msg.messageText : msg.messageText
        }));

        // Save the current textarea value and clear it
        if (currentChatLength <= 1) {
            const recipe = document.getElementById('recipe-dropdown-selected').value;
            currentMessage = `The recipe I'd like to remix is: ${recipe}.\n${currentMessage}`;
            messageToAI = firstPrompt(recipe, currentMessage);
        } else {
            messageToAI = nextPrompt(currentMessage);
        }
        
        // Add user message
        updateAllChatsArray({"botOrUser":"user", "messageText": currentMessage});
        setIsLoading(true);
        // Get the bot's response
        const botResponse = await queryAI(messageToAI, conversationHistory);
        
        // Update the existing chat title if it's the first bot response
        if(currentChatLength <= 1) {
            setChatTitles(prevTitles => {
                const newTitles = [...prevTitles];
                newTitles[currentChatID] = findChatTitle(botResponse);
                window.localStorage.setItem('chatTitles', JSON.stringify(newTitles));
                return newTitles;
            });
        }
        // Add bot message
        updateAllChatsArray({"botOrUser":"bot", "botAnimText": botResponse, "messageText": ""});
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setIsLoading(false);
        setTextareaValue("");
        // clear selected recipe if it's the first message
        if (allChatsArray[currentChatID].length <= 2) {
            document.getElementById('recipe-dropdown-selected').value = "";
        }
    }
  }
  
  function toggleSidebar() {
    setIsSidebarCollapsed(prevState => !prevState);
  }

  // Add click handler for closing sidebar when clicking outside
  function handleOutsideClick(e) {
    const sidebar = document.querySelector(".remixer-sidebar");
    const toggleButton = document.querySelector(".toggle-sidebar");
    
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

  useEffect(() => {
    setIsSidebarCollapsed(window.innerWidth <= 768);
    
    function handleResize() {
      setIsSidebarCollapsed(window.innerWidth <= 768);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="remixer-container">
      <div className={`remixer ${!isSidebarCollapsed ? "sidebar-open" : ""}`}>
        <div className={`remixer-sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
          <h3>Saved Recipes</h3> 
          <ul className="saved-recipes-list">
            {allChatsArray.map(
              function(currentChat, index) {
                return(
                 <li 
                  className={`${currentChatID == index ? "current-recipe" :"" }`} 
                  key={index} data-key={index} 
                  onClick={handleSavedRecipeClick} 
                  onKeyDown={handleSavedRecipeKeyDown}
                  tabIndex={index === focusedRecipeIndex ? 0 : -1}>
                    {chatTitles[index]}
                  </li> 
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
              <button title={`${isSidebarCollapsed ? "expand" : "collapse"} sidebar`} className={`toggle-sidebar ${isSidebarCollapsed ? "collapsed" : ""}`} onClick={toggleSidebar} >&lt;</button>
              <h3>{chatTitles[currentChatID]}</h3>
              <button title="start new remix!" className="new-remix-button"  onClick={startNewRemix} disabled={(allChatsArray[currentChatID].length === 1 || isLoading) ? true : false}>&#43;</button>
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
              {isLoading && (
                  <div className="loading-symbol-bot">
                     <Smile />
                  </div>
              )}
            </div>
          </div>
          <div>
            <div className="remixer-input">
              {allChatsArray[currentChatID].length <= 1 ? 
                <div className="remixer-first-input-container">
                  <div className="recipe-dropdown-container">
                    <RecipeDropdown selectedRecipe={recipeID} />
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

export default function Remixer() {
  return (
    <Suspense fallback={
      <div className="remixer-container">
        <div className="remixer">
          <div className="remixer-chatbox">
            <div className="loading-symbol-bot">
              <Smile />
            </div>
          </div>
        </div>
      </div>
    }>
      <RemixerInner />
    </Suspense>
  );
}