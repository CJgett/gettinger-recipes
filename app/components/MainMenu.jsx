"use client"

import React, { useEffect } from 'react'
import { useInView, InView } from 'react-intersection-observer'

import '../styles/mainmenu.css'

import Link from 'next/link'
import Eyes from './Eyes.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import MenuNav from './MenuNav.jsx'
import OffCanvasMenu from './OffCanvasMenu.jsx'
import Hamburger from './Hamburger'
import Smile from './Smile'
import Mouth from './Mouth'

export default function MainMenu() {

  useEffect(() => {
    if (document.readyState === 'complete') {
      document.getElementById('main-mouth').firstChild.style.strokeDashoffset = '0';
    }
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
      <Smile />
      <Eyes />
      <Link href="/"><h1>A Pinch of 한미</h1></Link>
      <MenuNav /> 
      <Mouth optionalID={'main-mouth'}/>
      <ThemeToggle />
      <Hamburger />
      <OffCanvasMenu />
    </header>
    </InView>
  );
}
