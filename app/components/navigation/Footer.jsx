"use client"

import { InView } from 'react-intersection-observer'

import '../../styles/footer.css'
import Link from 'next/link'
import MenuNav from './MenuNav.jsx'
import Squiggle from '../decorations/Squiggle.jsx'


export default function Footer() {

  function moveSmile(footerInView) {
    const travellingSmileClasses = document.querySelector(".travelling-smile").classList;  
    if (footerInView == true || footerInView == "true") {
      travellingSmileClasses.add("in-footer");
    } else {
      travellingSmileClasses.remove("in-footer");
    }
  }

  return (
    <footer>
      <Squiggle />
      <div className="footer-container"> 
        <div className="footer-logocontainer">
          <h2>Gettinger Recipes</h2> 
          <p>One family having fun, one recipe at a time :)</p>
        </div>
        <div className="footer-restcontainer"> 
        <div className="footer-subcontainer footer-sitemap-container">
          <h2 className="footer-header">Sitemap</h2>
          <MenuNav />
          <nav>
            <ul>
              <li><Link href="/accessibility">Accessibility</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
            </ul>
          </nav>
        </div>
        <div className="footer-subcontainer socials">
          <h2 className="footer-header">Socials</h2>
          <p>I don't have social media, idk go touch grass or sth</p>
        </div>
        <div className="footer-subcontainer">
          <h2 className="footer-header">Contact</h2>
          <button>email me!</button>
        </div>
      </div>
      </div>
      <InView as="div" className="in-view-smile-trigger" onChange={(inView) => moveSmile(inView)}>
      <div className="footer-container footer-copyright">
        <p>&#169; 2024 Gettinger Recipes | Website by Carly Gettinger</p>
      </div>
    </InView>
    </footer>
  );

}
