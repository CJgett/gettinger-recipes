import { useState, useRef, useEffect } from 'react';

export function RecipeTabs({ categories, activeTab, onTabChange }) {
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabsRef = useRef(null);

  const checkScrollable = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (tabsRef.current) {
        const { scrollWidth, clientWidth } = tabsRef.current;
        setHasOverflow(scrollWidth > clientWidth);
        checkScrollable();
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
      <button 
        className={`scroll-arrow left ${!hasOverflow ? 'hidden' : ''}`} 
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
      >
        &lt;
      </button>
      <div 
        className="recipe-box-tabs" 
        role="tablist" 
        ref={tabsRef}
        onScroll={checkScrollable}
      >
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
      <button 
        className={`scroll-arrow right ${!hasOverflow ? 'hidden' : ''}`} 
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
      >
        &gt;
      </button>
    </div>
  );
}
