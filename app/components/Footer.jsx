"use client"

import '../styles/footer.css'
import Link from 'next/link'
import MenuNav from './MenuNav.jsx'
import Squiggle from './Squiggle.jsx'

export default function Footer() {
  return (
    <footer>
      <Squiggle />
      <div className="footer-container"> 
        <div className="footer-logocontainer">
          <h2>A Pinch of 한미</h2> 
          <p>Two friends having fun, one recipe at a time :)</p>
        </div>
        <div className="footer-restcontainer"> 
        <div className="footer-subcontainer">
          <h2 className="footer-header">Sitemap</h2>
          <MenuNav />
          <nav>
            <ul>
              <li><Link href="/accessibility">Accessibility</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
            </ul>
          </nav>
        </div>
          <div className="footer-subcontainer">
          <h2 className="footer-header">Socials</h2>
          <div className="footer-sm-icons">
            <svg width="800px" height="800px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke="#000000" strokeWidth="12" d="M170 96c0-45-4.962-49.999-50-50H72c-45.038.001-50 5-50 50s4.962 49.999 50 50h48c45.038-.001 50-5 50-50Z"/><path stroke="#000000" strokeLinejoin="round" strokeWidth="12" d="M118 96 82 74v44l36-22Z"/></svg>
            <svg width="800px" height="800px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><path stroke="currentColor" strokeWidth="12" d="M96 162c-14.152 0-24.336-.007-32.276-.777-7.849-.761-12.87-2.223-16.877-4.741a36 36 0 0 1-11.33-11.329c-2.517-4.007-3.98-9.028-4.74-16.877C30.007 120.336 30 110.152 30 96c0-14.152.007-24.336.777-32.276.76-7.849 2.223-12.87 4.74-16.877a36 36 0 0 1 11.33-11.33c4.007-2.517 9.028-3.98 16.877-4.74C71.663 30.007 81.847 30 96 30c14.152 0 24.336.007 32.276.777 7.849.76 12.87 2.223 16.877 4.74a36 36 0 0 1 11.329 11.33c2.518 4.007 3.98 9.028 4.741 16.877.77 7.94.777 18.124.777 32.276 0 14.152-.007 24.336-.777 32.276-.761 7.849-2.223 12.87-4.741 16.877a36 36 0 0 1-11.329 11.329c-4.007 2.518-9.028 3.98-16.877 4.741-7.94.77-18.124.777-32.276.777Z"/><circle cx="96" cy="96" r="30" stroke="currentColor" strokeWidth="12"/><circle cx="135" cy="57" r="9" fill="currentColor"/></svg>
          </div>
        </div>
        <div className="footer-subcontainer">
          <h2 className="footer-header">Contact</h2>
          <button>email us!</button>
        </div>
      </div>
      </div>
      <div className="footer-container footer-copyright">
        <p>&#169; 2024 A Pinch of 한미 | Website by Carly Gettinger</p>
      </div>
    </footer>
  );
}
