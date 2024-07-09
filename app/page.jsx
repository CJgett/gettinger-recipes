"use client"

import './styles/home.css'
import Image from 'next/image'
import carlyPic from '../assets/img/placeholders/profile-pic.png' 

//import Soup from '../assets/img/handrawn-cooking/85365-hot-soup-bowl-hand-drawn-food.svg'
/*import bread from '../assets/img/handrawn-cooking/100604-bread-baguette-outline.svg'
import iceCream from '../assets/img/handrawn-cooking/107043-melting-hand-drawn-ice-cream-cone.svg'
import hotPot from '../assets/img/handrawn-cooking/117464-soup-spoon-hand-drawn-tool-with-hot-food.svg'
import watermelon from '../assets/img/handrawn-cooking/66663-watermelon-slice.svg'
import banana from '../assets/img/handrawn-cooking/81261-banana-fruit.svg'
import lemon from '../assets/img/handrawn-cooking/77691-half-lemon.svg'
import Sandwich from '../assets/img/handrawn-cooking/26521-thick-sandwich.svg'
import pizza from '../assets/img/handrawn-cooking/2291-pizza-slice.svg'*/



export default function HomePage() {
 
  return (
    <div className="home-content">
      <section className="home-hanmi">
        <h2>한미</h2>
        <span>[ han &#183; mi ]</span>
        <div className="grid-wrapper">
          <div className="grid-one"><strong>한</strong>국</div>
          <div className="grid-two">+</div>
          <div className="grid-three">미국</div>
          <div className="grid-four">=</div>
          <div className="grid-five">한미</div>
          <div className="grid-six">[korea]</div>
          <div className="grid-seven">[usa]</div>
          <div className="grid-eight">[korea + usa]</div>
        </div>
        <div className="hanmi-details">
          <div className="profile-container">  
            <Image src={carlyPic} width="200" height="250" alt="ugly white lady smiling"/>
            <h4>Carly (칼리)</h4>
            <p className="profile-text">Presenter and executive chef, she really puts the "미" in "미국" (This is a funny joke because "미국", the Korean word for the US, means "beautiful country", so this implies that she's beautiful. Now that the joke has been thoroughly explained...please laugh.)</p>
          </div>
          <div className="profile-container">  
          <Image src={carlyPic} width="200" height="250" alt="ugly white lady smiling"/>
            <h4>Hyoungsin (형신)</h4>
            <p className="profile-text">Camerawoman, editor, and all around fun person, Shin really puts the "han" in "hanmi" (this joke is less funny, because it doesn't make any sense, so you dont have to laugh.) </p>
          </div>
        </div>
        </section>
      <section className="banner-img">
      </section>
    </div>
  );
}
