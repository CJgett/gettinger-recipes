"use client";

import React, { useEffect } from "react";
import Image from 'next/image'
import recipePic from '../../assets/img/youtube_profile_v1.png'

import DecorativeArches from './DecorativeArches.jsx'
import IngredientList from './IngredientList.jsx'
import DirectionList from './DirectionList.jsx'
import Toggle from './Toggle.jsx'

export default function RecipeCard() {

  useEffect(() => {
    if(document.readyState === 'complete') {
      const arches = document.querySelector('.decorative-arches.top');
      const bottomArches = document.querySelector('.decorative-arches.bottom');
      const parentPosition = arches.parentElement.getBoundingClientRect();

      arches.style.right = (parentPosition.width - 35) + "px"; 
      arches.style.top = "-" + (parentPosition.height - 35) + "px";

      bottomArches.style.right = (-35) + "px"; 
      bottomArches.style.top = (35) + "px";


    }
  });


  return (
    <div className="recipe-card">
      <div className="recipe-title-pic">
        <div className="recipe-title">
          <h2>RECIPE NAME</h2>
          <p>Korean Name</p>
        </div>
        <div className="recipe-pic">
          <Image src={recipePic} width="200" height="200" alt="EXAMPLE: cucmbers in a spicy sauce on a bed of rice"/>
        </div>
      </div>
      <div className="card-section recipe-details">
        <DecorativeArches additionalClasses={'top'}/>
        <h3>quick info</h3>
        <div className="details-container">
          <span>Prep Time: 3 mins</span>
          <span>Cook Time: 3 mins</span>
          <span>Total Time: 3 mins</span>
          <span>Servings: </span>
        </div>
        <div className="details-clickables">
          <button>print</button>
          <button>Pinterest</button>
          <Toggle />
        </div>
        <DecorativeArches additionalClasses={'bottom'}/>
      </div>
      <div className="card-section ingredients-directions">
        <h3>Ingredients:</h3>
        <IngredientList />
        <h3>Directions</h3>
        <DirectionList />
      </div>
      <div className="card-section notes">
        <h3>Notes</h3>
        <DirectionList /> 
      </div>  
    </div>
    
  );
}
