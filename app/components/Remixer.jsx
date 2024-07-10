export default function Remixer() {

  return (
    <div className="remixer-container">
      <div className="remixer">
        <div className="remixer-sidebar">
          <h3>Saved Recipes</h3> 
          <ul className="saved-recipes-list">
            <li>example recipe - spicy</li>
            <li>auto-save recipes into local storage</li>
          </ul>
        </div>
        <div className="remixer-chatbox">
          <div className="remixer-messages">
            <div className="remixer-message bot">
              this is an example message from the chatbot.
            </div>
            <div className="remixer-message user">
              this is an example message from the user.
            </div>
            <div className="remixer-message user">
   teeny message 
            </div>
          </div>
          <div>
          <div className="remixer-input">
            <textarea></textarea>
            <button>&crarr;</button>
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
