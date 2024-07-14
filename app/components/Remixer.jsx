"use client"
import React, { useState, useRef } from 'react'

export default function Remixer() {

  /* setup textarea input */ 

  const [textareaValue, setTextareaValue] = useState("");

  function handleTextareaChange(event) {
    setTextareaValue(event.target.value);
  }

  /* setup array of chat arrays (Saved Recipes) */
  const initMessage = {"botOrUser":"bot", "messageText":`hello! how can i help you remix your recipe? :)`};
  const [allChatsArray, setAllChatsArray] = useState(new Array(new Array (initMessage)));

  const [currentChatID, setCurrentChatID] = useState(0);

  function updateAllChatsArray(newMessage) {
    let newAllChatsArray = allChatsArray.slice();
    newAllChatsArray[currentChatID] = [...newAllChatsArray[currentChatID], newMessage];
    setAllChatsArray(newAllChatsArray);
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

    /*TODO delete newest remix if there's no new chats*/
    if (allChatsArray[oldCurrentChatID].length == 1) {
      allChatsArray.pop();
    }

  }
    
  /* what to do when a user sends a message 
   * (update the chats array, reset textarea, focus text area)*/
  function sendMessage (e) { 
    e.preventDefault();
    updateAllChatsArray({"botOrUser":"user", "messageText":textareaValue});
    setTextareaValue("");
    textareaRef.current.focus();
  }

  
  function toggleSidebar() {
    const sidebarClasses = document.querySelector(".remixer-sidebar").classList;
    const sidebarToggle = document.querySelector(".expand-sidebar");

    if(sidebarClasses.contains("collapsed")) {
      sidebarClasses.remove("collapsed") 
      sidebarToggle.classList.remove("collapsed"); 
      sidebarToggle.title = "collapse sidebar";

    } else {
      sidebarClasses.add("collapsed"); 
      sidebarToggle.classList.add("collapsed"); 
      sidebarToggle.title = "expand sidebar";
    }
  }

  return (
    <div className="remixer-container">
      <div className="remixer">
        <div className="remixer-sidebar">
                    <h3>Saved Recipes</h3> 
          <ul className="saved-recipes-list">
            {allChatsArray.map(
              function(currentChat, index) {
                return(
                 <li className={`${index == currentChatID ? "current-recipe" :"" }`} key={index} data-key={index} onClick={handleSavedRecipeClick}>Saved Recipe #{index + 1}</li> 
                );
              }
            )}
          </ul>
        </div>
        <div className="remixer-chatbox">
          <div>
          <div className="remixer-controls">
            <button title="collapse sidebar" className="expand-sidebar" onClick={toggleSidebar} >&lt;</button>
            <h3>Saved Recipe #{parseFloat(currentChatID) + 1}</h3>
            <button title="start new remix!" className="new-remix-button"  onClick={startNewRemix} disabled={allChatsArray[currentChatID].length === 1 ? true : false}>&#43;</button>
          </div>
          <div className="remixer-messages">
            {allChatsArray[currentChatID].map(
              function(message,index) {
                return(
                  <div key={index} className={`remixer-message ${message.botOrUser}`}>
                  {message.messageText} 
                  </div>
                );
              }
            )}
          </div>
          </div>
          <div>
          <form className="remixer-input" onSubmit={sendMessage}>
            <textarea value={textareaValue} ref={textareaRef} onChange={handleTextareaChange} aria-label="start chatting with the remixer here"></textarea>
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
