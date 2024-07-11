"use client"
import React, { useState, useRef } from 'react'

export default function Remixer() {

  /* setup textarea input */ 

  const [textareaValue, setTextareaValue] = useState("");

  function handleTextareaChange(event) {
    setTextareaValue(event.target.value);
  }

  /* setup individual chat array */

  let initMessageArray = new Array();
  initMessageArray.push({"botOrUser":"bot", "messageText":"hello, how can i help you remix your recipe? :)"});
  const [messageArray, setMessageArray] = useState(initMessageArray);

  /* setup array of chat arrays */
  let initAllChatsArray = new Array(messageArray);
  const [allChatsArray, setAllChatsArray] = useState(initAllChatsArray);

  const [currentChatID, setCurrentChatID] = useState(0);

  function startNewRemix() {
    let newAllChatsArray = [...allChatsArray];
    newAllChatsArray[currentChatID] = messageArray;
    setMessageArray(initMessageArray);
    setAllChatsArray([...newAllChatsArray, messageArray]); 
    setCurrentChatID(allChatsArray.length - 1);
    console.log("made it here");
  }

  function handleSavedRecipeClick() {

  }
    
  /* what to do when a user sends a message */
  const sendMessage = (e) => { 
    e.preventDefault();
    setMessageArray(messageArray => [...messageArray, {"botOrUser":"user", "messageText":textareaValue}]);
    setTextareaValue("");
    e.target.previousElementSibling.focus();
  }

  return (
    <div className="remixer-container">
      <div className="remixer">
        <div className="remixer-sidebar">
          <div className="sidebar-header">
            <h3>Saved Recipes</h3> 
            <button title="start new remix!" className="new-remix-button" onClick={startNewRemix} disabled={messageArray.length === 1 ? true : false}>&#43;</button>
          </div>
          <ul className="saved-recipes-list">
            {allChatsArray.map(
              function(chatSession, index) {
                return(
                 <li key={index} onClick={handleSavedRecipeClick}>Saved Recipe #{index + 1}</li> 
                );
              }
            )}
          </ul>
        </div>
        <div className="remixer-chatbox">
          <div className="remixer-messages">
            {messageArray.map(
              function(message,index) {
                return(
                  <div key={index} className={`remixer-message ${message.botOrUser}`}>
                  {message.messageText} 
                  </div>
                );
              }
            )}
          </div>
          <div>
          <form className="remixer-input" onSubmit={sendMessage}>
            <textarea value={textareaValue} onChange={handleTextareaChange}></textarea>
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
