'use client'

import { useState } from 'react'
import '../styles/admin.css'
import DurationInputField from '../components/form-components/DurationInputField.jsx'
import NewIngredientField from '../components/form-components/NewIngredientField.jsx'


export default function AddRecipePage() {

  const [ingredientArray, setIngredientArray] = useState([new NewIngredientField(0)]);

  function addNewIngredient(e) {
    let newIngredientArray = ingredientArray.slice(0); 
    newIngredientArray.push(new NewIngredientField(newIngredientArray.length));
    e.preventDefault();
    console.log("new ingredient added!");
    setIngredientArray(newIngredientArray); 
  }

  function deleteLastIngredient(e) {
    e.preventDefault();
    let updatedIngredientArray = ingredientArray.slice(0);
    console.log(updatedIngredientArray);
    updatedIngredientArray.pop()
    setIngredientArray(updatedIngredientArray);

  }

  return (
    <section className="add-recipe-page">
      <h2>Add New Recipe</h2>
      <form action="" method="get" name="add new recipe">
        <div className="form-group">
          <div className="form-question">
            <label htmlFor="name_en">English Name: </label>
            <input id="name_en" required />
          </div>
          <div className="form-question">
            <label htmlFor="name_kr">Korean Name: </label>
            <input id="name_kr" required />
          </div>
        </div>
        <div className="form-group pic">
          <div className="form-question">
            <label htmlFor="pic">Picture of finished dish: </label>
            <input type="file" id="pic">
            </input>
          </div>
          <div className="form-question">
            <label htmlFor="pic_alt" type="textarea">Alternative text for recipe picture: </label>
            <textarea id="pic_alt" required />
          </div>
        </div>
        <div className="form-group details">
          <div className="form-question">
            <label htmlFor="prep_time">Prep time: </label>
           <DurationInputField overallID="prep_time" /> 
          </div>
          <div className="form-question">
            <label htmlFor="cook_time">Cook time: </label>
           <DurationInputField overallID="cook_time" /> 
          </div>
          <div className="form-question">
            <label htmlFor="servings">Servings: </label>
            <span>ex: "4"(don't include "people") OR "makes 20 cookies"</span>
            <input id="servings" required />
          </div>
        </div>
        <div id="ingredients" className="form-question">
          <label htmlFor="ingredients">Ingredients </label>
              {ingredientArray.map((ingredient, index) => (
                <div key={index}>
                {ingredient}
                </div>
              ))}
          <button className="new-ingred-button" onClick={(e) => {addNewIngredient(e)}}>+</button>
          <button className="new-ingred-button" onClick={(e) => {deleteLastIngredient(e)}}>-</button>
        </div>
        <div className="form-question">
          <label htmlFor="directions_en">Directions: </label>
          <input id="directions_en" required />
        </div>
        <div className="form-question">
          <label htmlFor="notes_en">Notes: </label>
          <input id="notes_en" required />
        </div>
        <div className="form-question">
          <label htmlFor="sources">Sources: </label>
          <input id="sources" required />
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
