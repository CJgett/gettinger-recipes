import recipePic from '../../assets/img/youtube_profile_v1.png'

import Image from 'next/image'
// my components
import DecorativeArches from './DecorativeArches.jsx'
import IngredientList from './IngredientList.jsx'
import DirectionList from './DirectionList.jsx'
import Toggle from './Toggle.jsx'

import { dbFetch } from '../../utils/postgres.js'

export default async function RecipeCard() {

const recipeTable = await dbFetch("SELECT * FROM all_recipes WHERE name_en = 'Yangnyeom Tofu'");

  return (
    <div className="recipe-card">
      <div className="recipe-title-pic">
        <div className="recipe-title">
          <h2>{recipeTable[0].name_en}</h2>
          <h3>{recipeTable[0].name_kr}</h3>
        </div>
        <div className="recipe-pic">
          <Image src={recipePic} width="200" height="200" alt="EXAMPLE: cucmbers in a spicy sauce on a bed of rice"/>
        </div>
      </div>
      <div className="card-section recipe-details">
        <DecorativeArches additionalClasses={'top'}/>
        <h3>quick info</h3>
        <div className="details-container">
          <span>Prep Time: {recipeTable[0].prep_time} min</span>
          <span>Cook Time: {recipeTable[0].cook_time} min</span>
          <span>Total Time: {recipeTable[0].prep_time + recipeTable[0].cook_time} min</span>
          <span>Servings: {recipeTable[0].servings}</span>
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
