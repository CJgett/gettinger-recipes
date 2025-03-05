"use client";

import '../../styles/elements/skiptocontent.css';

export default function SkipToContent() {

  function handleSkipToContent() {
    const mainContent = document.getElementById('main-content');
    mainContent.focus();

    window.scrollTo({
        top: mainContent.offsetTop,
        behavior: 'smooth'
    });
  };
    
  return (
    <button className="skip-to-content" onClick={handleSkipToContent}>
        Skip to Content
    </button>
  );
}