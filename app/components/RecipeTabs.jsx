"use client"

import React, { useState } from 'react';

export function RecipeTabs({ categories, children }) {
  const [activeTab, setActiveTab] = useState(categories[0]);

  function handleTabClick(tab) {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="recipe-box-tabs">
      {categories.map((tab, index) => (
        <button 
          role="tab" 
          className={`recipe-box-tab ${activeTab === tab ? 'active' : ''}`}
          key={index}
          onClick={() => handleTabClick(tab)}
        >        
          {tab}
        </button>
      ))}
      {children}
    </div>
  );
}

