import DecorativeArches from './DecorativeArches.jsx'
import IngredientList from './IngredientList.jsx'
import CustomList from './CustomList.jsx'
import SourceList from './SourceList.jsx'
import Toggle from './Toggle.jsx'

import { dbFetch } from '../../utils/postgres.js'

export default async function Recipe(recipeID) {
  console.log(recipeID);
let fetchedRecipe = await dbFetch('SELECT * FROM all_recipes WHERE id = $1', [recipeID.recipeID]);
  fetchedRecipe = fetchedRecipe[0];

  return (
    <section className="recipe-detailed">
      <div className="recipe-title-pic">
        <div className="recipe-title">
          <h2>{fetchedRecipe.name_en}</h2>
          <h3>{fetchedRecipe.name_kr}</h3>
        </div>
        <div className="recipe-pic">
          <img src={`/recipe_pics/${fetchedRecipe.pic}`} alt={fetchedRecipe.pic_alt}/>
        </div>
      </div>
      <div className="card-section recipe-details">
        <DecorativeArches additionalClasses={'top'}/>
        <h3>quick info</h3>
        <div className="details-container">
          <span>Prep Time: {fetchedRecipe.prep_time}</span>
          <span>Cook Time: {fetchedRecipe.cook_time}</span>
          <span>Total Time: {fetchedRecipe.prep_time + fetchedRecipe.cook_time}</span>
          <span>Servings: {fetchedRecipe.servings}</span>
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
        <IngredientList ingredients={fetchedRecipe.ingredients} />
        <h3>Directions</h3>
        <CustomList listItems={fetchedRecipe.directions}/>
      </div>
      <div className="card-section notes">
        <h3>Notes</h3>
        <CustomList listItems={fetchedRecipe.notes } /> 
      </div>  
      <div className="card-section sources">
        <h3>Sources / Inspiration</h3>
        <SourceList listItems={fetchedRecipe.sources} /> 
    </div>

    </section>
  );
}
