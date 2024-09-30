import '../styles/admin.css'

import { dbFetch } from '../../utils/postgres.js'

import DurationInputField from '../components/form-components/DurationInputField.jsx'
import Ingredients from '../components/form-components/Ingredients.jsx'
import Directions from '../components/form-components/Directions.jsx'
import Notes from '../components/form-components/Notes.jsx'
import Sources from '../components/form-components/Sources.jsx'

export default function AddRecipePage() {
  
  async function addRecipeToDB(formData) {
  "use server"

    const recipeAuthor = formData.get("recipe-author");
    const escapedAuthor = recipeAuthor.replace(/'/g, "''");

    const postResult = await dbFetch(`INSERT INTO minimalest_test (author) VALUES ('${escapedAuthor}') RETURNING *;`);
    console.log("DB result: " + postResult);

    const prepTimeHrs = formData.get("prep_time_hrs");
    const prepTimeMins = formData.get("prep_time_mins");
    const picAltText = formData.get("pic_alt");
    console.log(recipeAuthor);
    console.log(picAltText);
    console.log(prepTimeHrs +"hrs, " + prepTimeMins + "min");
    console.log("submitted");
  }

  return (
    <section className="add-recipe-page">
      <h2>Add New Recipe</h2>
      <form action={addRecipeToDB} name="add new recipe">
        <div className="form-group">
          <div className="form-question">
            <label htmlFor="recipe-author">Recipe Author: </label>
            <input name="recipe-author" id="recipe-author" />
          </div>
          <div className="form-question">
            <label htmlFor="name_en">English Name: </label>
            <input name="name_en" id="name_en" />
          </div>
          <div className="form-question">
            <label htmlFor="name_kr">Korean Name: </label>
            <input name="name_kr" id="name_kr" />
          </div>
        </div>
        <div className="form-group pic">
          <div className="form-question">
            <label htmlFor="pic">Picture of finished dish: </label>
            <input type="file" name="recipe_pic" id="pic">
            </input>
          </div>
          <div className="form-question">
            <label htmlFor="pic_alt" type="textarea">Alternative text for recipe picture: </label>
            <textarea id="pic_alt" name="pic_alt" />
          </div>
        </div>
        <div className="form-group details">
          <div className="form-question">
            <label htmlFor="prep_time">Prep time: </label>
           <DurationInputField fieldID="prep_time" /> 
          </div>
          <div className="form-question">
            <label htmlFor="cook_time">Cook time: </label>
           <DurationInputField fieldID="cook_time" /> 
          </div>
          <div className="form-question">
            <label htmlFor="servings">Servings: </label>
            <span>ex: "4"(don't include "people") OR "makes 20 cookies"</span>
            <input id="servings" name="servings" />
          </div>
        </div>

        {/* INGREDIENTS */}       

        <div id="ingredients" className="form-question ingredients">
          <Ingredients />
        </div>

        {/* DIRECTIONS */}

        <div className="form-question directions"> 
          <Directions />
        </div>
             
        {/* NOTES */}

        <div className="form-question notes">
          <Notes />
        </div>

        {/* SOURCES */}

        <div className="form-question sources">
          <Sources />  
        </div>

        <div className="form-question">
          <fieldset>
            <legend>Is this a Family Recipe?</legend>
            <div>
              <input id="family_recipe_yes" name="family_recipe" type="radio" />
              <label htmlFor="family_recipe_yes">yes </label>
              <input id="family_recipe_no" name="family_recipe" type="radio" />
              <label htmlFor="family_recipe_no">no </label>
            </div>
          </fieldset>
        </div>
        <div className="form-question">
          <button type="submit" >
            add recipe
          </button>
        </div>
      </form>
    </section>
  );
 }
