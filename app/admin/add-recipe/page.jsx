"use client";

import '../../styles/admin.css'

import DurationInputField from '../../components/form-components/DurationInputField.jsx'
import Ingredients from '../../components/form-components/Ingredients.jsx'
import Directions from '../../components/form-components/Directions.jsx'
import Notes from '../../components/form-components/Notes.jsx'
import Sources from '../../components/form-components/Sources.jsx'
import Tags from '../../constants/Tags.jsx'
import { addRecipeToDB, updatePicFileName } from '../../components/form-components/form-server-functions.js'
import { saveFile } from '../../components/form-components/form-functions.js'

import { useEffect, useRef, useState } from 'react';

export default function AddRecipePage() {
  const formRef = useRef(null);
  const [recipeSubmitted, setRecipeSubmitted] = useState(false);

  useEffect(() => {
    if (recipeSubmitted) {
      formRef.current.reset();
      alert("Recipe added successfully!");
      // Optionally, you can add a success message or trigger other actions here
    }
  }, [recipeSubmitted]);

  async function submitRecipe(formData) {
    console.log("Starting recipe submission");
    const postResult = await addRecipeToDB(formData);
    if (postResult === false) {
      console.log("Failed to add recipe to DB");
      return;
    }
    const postResultID = postResult.id;
    try {
      console.log("Attempting to save file...");
      const picFileName = await saveFile(formData, postResultID);
      console.log("File saved successfully:", picFileName);
      try {
        const updatedResult = await updatePicFileName(postResultID, picFileName);
        console.log("DB updated with filename:", updatedResult);
      } catch (error) {
        console.error("Error updating recipe with picture file name:", error);
        return;
      }
    } catch (error) {
      console.error("Error saving picture file. Full error:", error);
      console.error("Error stack:", error.stack);
      return;
    }
    setRecipeSubmitted(true);
  }

  return (
    <section className="add-recipe-page">
      <h2>Add New Recipe</h2>
      <form ref={formRef} action={submitRecipe} name="add new recipe">
        <div className="form-group">
          <div className="form-question">
            <label htmlFor="recipe_author">Recipe Author: </label>
            <input name="recipe_author" id="recipe_author" />
          </div>
          <div className="form-question">
            <label htmlFor="name_en">English Name: </label>
            <input name="name_en" id="name_en" required />
          </div>
          <div className="form-question">
            <label htmlFor="name_kr">Korean Name: </label>
            <input name="name_kr" id="name_kr" />
          </div>
        </div>
        <div className="form-group pic">
          <div className="form-question">
            <label htmlFor="pic">Picture of finished dish: </label>
            <input type="file" name="recipe_pic" id="pic" accept="image/*" required>
            </input>
          </div>
          <div className="form-question">
            <label htmlFor="pic_alt" type="textarea">Alternative text for recipe picture: </label>
            <textarea id="pic_alt" name="pic_alt" required />
          </div>
        </div>
        <div className="form-group details">
          <div className="form-question">
            <label htmlFor="prep_time">Prep time: </label>
           <DurationInputField fieldID="prep_time" required /> 
          </div>
          <div className="form-question">
            <label htmlFor="cook_time">Cook time: </label>
           <DurationInputField fieldID="cook_time" required /> 
          </div>
          <div className="form-question">
            <label htmlFor="servings">Servings: </label>
            <span>ex: "4"(don't include "people") OR "makes 20 cookies"</span>
            <input id="servings" name="servings" required />
          </div>
        </div>

        <div id="ingredients" className="form-question ingredients">
          <Ingredients />
        </div>

        <div className="form-question directions"> 
          <Directions />
        </div>
             
        <div className="form-question notes">
          <Notes />
        </div>

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
              <input id="family_recipe_yes" name="family_recipe" value="yes" type="radio" required />
              <label htmlFor="family_recipe_yes">yes </label>
              <input id="family_recipe_no" name="family_recipe" value="no" type="radio" required />
              <label htmlFor="family_recipe_no">no </label>
            </div>
          </fieldset>
        </div>
        <div className="form-question">
          <button type="submit">
            add recipe
          </button>
        </div>
      </form>
    </section>
  );
}