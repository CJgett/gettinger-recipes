import '../styles/admin.css'

import { dbFetch } from '../../utils/postgres.js'

import DurationInputField from '../components/form-components/DurationInputField.jsx'
import Ingredients from '../components/form-components/Ingredients.jsx'
import Directions from '../components/form-components/Directions.jsx'
import Notes from '../components/form-components/Notes.jsx'
import Sources from '../components/form-components/Sources.jsx'
import Tags from '../constants/Tags.jsx'
import { formatIngredientsAsJSON, formatSourcesAsJSON } from '../components/form-components/form-functions.js'
import { saveFile } from '../components/form-components/form-server-functions.js'

export default function AddRecipePage() {

  async function addRecipeToDB(formData) {
  "use server"

    const recipeAuthor = formData.get("recipe-author");
    const nameEN = formData.get("name_en");
    const nameKR = formData.get("name_kr");

    //TODO restrict size and type of file
    const picAltText = formData.get("pic_alt");

    const prepTime = formData.get("prep_time_hrs") + "hrs " + formData.get("prep_time_mins") + "mins";
    const cookTime = formData.get("cook_time_hrs") + "hrs " + formData.get("cook_time_mins") + "mins";
    const servings = formData.get("servings");

    const ingredients = formatIngredientsAsJSON(formData.getAll("ingredient_name"), formData.getAll("metric_measurement"), formData.getAll("metric_measurement_unit"), formData.getAll("imperial_measurement"), formData.getAll("imperial_measurement_unit"));
    const directions = JSON.stringify(formData.getAll("direction_text"));
    const notes = JSON.stringify(formData.getAll("note_text"));
    const sources = formatSourcesAsJSON(formData.getAll("source-link"), formData.getAll("source-title"));

    const isFamilyRecipe = (formData.get("family_recipe") === "yes");
    const tags = formData.getAll("tags");
    console.log("tags");
    console.log(tags);

    console.log("TEST RESULTS - SUBMIT");

    const postResult = await dbFetch(`INSERT INTO test_table (author, name_en, name_kr, pic, pic_alt, prep_time, cook_time, servings, ingredients, directions, notes, sources, is_family_recipe) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;`, [recipeAuthor, nameEN, nameKR, nameEN, picAltText, prepTime, cookTime, servings, ingredients, directions, notes, sources, isFamilyRecipe]);

    console.log("DB result: " + postResult);
    saveFile(formData.get("recipe_pic"), postResult[0].id);
    console.log("submitted");

    //TODO auto refresh page so you can see the new recipe
    //revalidatePath("/recipes");
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
            <input type="file" name="recipe_pic" id="pic" accept="image/*">
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
            <legend>
            Please select the appropriate tag(s)
            </legend>
            {Tags.map((tag, index) => (
              <div key={index}>
                <input type="checkbox" id={tag} name="tags" value={tag} />
                <label htmlFor={tag}>{tag}</label>
              </div>
            ))}
          </fieldset>
        </div>

        <div className="form-question">
          <fieldset>
            <legend>Is this a Family Recipe?</legend>
            <div>
              <input id="family_recipe_yes" name="family_recipe" value="yes" type="radio" />
              <label htmlFor="family_recipe_yes">yes </label>
              <input id="family_recipe_no" name="family_recipe" value="no" type="radio" />
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
