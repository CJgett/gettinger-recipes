"use client"

import React, { useEffect } from 'react'
import { InView } from 'react-intersection-observer'

import '../../styles/mainmenu.css'

import Link from 'next/link'
import Eyes from '../decorations/Eyes.jsx'
import ThemeToggle from '../ThemeToggle.jsx'
import MenuNav from './MenuNav.jsx'
import OffCanvasMenu from './OffCanvasMenu.jsx'
import Hamburger from './Hamburger'
import StickyMenu from './StickyMenu'
import Mouth from '../decorations/Mouth.jsx'
import SearchBar from '../elements/SearchBar.jsx'

export default function MainMenu() {

  useEffect(() => {
      document.getElementById('main-mouth').firstChild.style.strokeDashoffset = '0';
  });
  
  function lowerSmile(navIsVisible) {
    const travellingSmileClasses = document.querySelector(".travelling-smile").classList;  
    if (navIsVisible == true || navIsVisible == "true") {
      travellingSmileClasses.remove("visible");
    } else {
      travellingSmileClasses.add("visible");
    }
  }

  return(
    <InView as="div" className="in-view-smile-trigger" onChange={(inView) => lowerSmile(inView)}>
    <header>
      <Eyes />
      <div className="sticky-part">
        <Link href="/"><h1>Gettinger Recipes</h1></Link>
        <MenuNav /> 
      </div>
      <Mouth optionalID={'main-mouth'}/>
      <div className="nav-top-right-fixed">
        <div className="nav-top-right-flex">
          <SearchBar isExpandable={true} />
          <ThemeToggle />
          <Hamburger />
        </div>
      </div>
      <OffCanvasMenu />
      <StickyMenu />
    </header>
    </InView>
  );
}
