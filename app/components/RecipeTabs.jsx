export function RecipeTabs({ categories, activeTab, onTabChange }) {
  return (
    <div className="recipe-box-tabs">
      {categories.map((tab, index) => (
        <button 
          role="tab" 
          className={`recipe-box-tab ${activeTab === tab ? 'active' : ''}`}
          key={index}
          onClick={() => onTabChange(tab)}
        >        
          {tab}
        </button>
      ))}
    </div>
  );
}
