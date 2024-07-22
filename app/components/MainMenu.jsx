"use client"

import React, { useEffect, useRef } from 'react'

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

  const ref = useRef(null);

  useEffect(() => {
    if (document.readyState === 'complete') {
      document.getElementById('main-mouth').firstChild.style.strokeDashoffset = '0';
    }
  });

  return(
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
  );
}
