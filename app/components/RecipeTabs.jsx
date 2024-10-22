import { useState, useRef, useEffect } from 'react';

export function RecipeTabs({ categories, activeTab, onTabChange }) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabsRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (tabsRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = tabsRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [categories]);

  const scroll = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="recipe-tabs-container">
      {showLeftArrow && (
        <button className="scroll-arrow left" onClick={() => scroll('left')}>
          &lt;
        </button>
      )}
      <div className="recipe-box-tabs" ref={tabsRef} onScroll={() => {
        const { scrollWidth, clientWidth, scrollLeft } = tabsRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
      }}>
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
      {showRightArrow && (
        <button className="scroll-arrow right" onClick={() => scroll('right')}>
          &gt;
        </button>
      )}
    </div>
  );
}
