'use client'

import { useState } from 'react'
import '../styles/admin.css'
import DurationInputField from '../components/form-components/DurationInputField.jsx'
import IngredientField from '../components/form-components/NewIngredientField.jsx'
import DirectionField from '../components/form-components/NewDirectionField.jsx'


export default function AddRecipePage() {
  /* setup INGREDIENTS */
  const [ingredientIDCounter, setIngredientIDCounter] = useState(0);
  const initialIngredientField = new IngredientField(ingredientIDCounter);
  const [ingredientArray, setIngredientArray] = useState([{'key': ingredientIDCounter, 'ingredientField': initialIngredientField}]);

  /* setup DIRECTIONS */
  const [directionIDCounter, setDirectionIDCounter] = useState(0);
  const initialDirectionField = new DirectionField(directionIDCounter);
  const [directionArray, setDirectionArray] = useState([{'key': directionIDCounter, 'directionField': initialDirectionField}]);

function addNewDirection(e) {
    e.preventDefault();
    let newID = directionIDCounter;
    newID++;
    setDirectionIDCounter(newID);
    let newDirectionArray = directionArray.slice(0); 
    let nextDirectionField = new DirectionField(newID);
    newDirectionArray.push({'key': newID, 'directionField': nextDirectionField});
    setDirectionArray(newDirectionArray); 
  }

  function deleteThisField(e, id) {
    e.preventDefault();
    if (directionArray.length > 1) {
      setDirectionArray((prevArray) => {
        let updatedArray = prevArray.slice(0);
        updatedArray.splice(updatedArray.findIndex((element) => element.key == id), 1);
        return updatedArray;
      });
    }
  }
  /* setup NOTES */


  function addNewIngredient(e) {
    e.preventDefault();
    let newID = ingredientIDCounter;
    newID++;
    setIngredientIDCounter(newID);
    let newIngredientArray = ingredientArray.slice(0); 
    let nextIngredField = new IngredientField(newID);
    newIngredientArray.push({'key': newID, 'ingredientField': nextIngredField});
    setIngredientArray(newIngredientArray); 
  }

  function deleteThisIngredient(e, id) {
    e.preventDefault();
    if (ingredientArray.length > 1) {
      setIngredientArray((prevArray) => {
        let updatedArray = prevArray.slice(0);
        updatedArray.splice(updatedArray.findIndex((element) => element.key == id), 1);
        return updatedArray;
      });
    }
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

       /* INGREDIENTS */       

        <div id="ingredients" className="form-question">
          <div>
            <label htmlFor="ingredients">Ingredients </label>

            <button className="new-field-button" onClick={(e) => {addNewIngredient(e)}} title="add new ingredient">+</button>
          </div>
              {ingredientArray.map((ingredient) => (
                <div className="ingredient-group" key={ingredient.key}>
                  {ingredient.ingredientField}
                  <button className="delete-field-button" onClick={(e) => {deleteThisIngredient(e, ingredient.key)}} title="delete this ingredient">-</button>
                </div>
              ))}
        </div>

        /* DIRECTIONS */

        <div className="form-question directions"> 
          Directions
          <button className="new-field-button" onClick={(e) => {addNewDirection(e)}} title="add new direction">
            +
          </button>
          {directionArray.map((direction, index) => (
            <div key={direction.key}>
              <span className="direction-number">
                {index + 1}
              </span>
              <div className="direction">
                {direction.directionField}
                <button className="delete-field-button" onClick={(e) => {deleteThisField(e, direction.key)}} title="delete this direction">
                  -
                </button>
              </div>
            </div>
          ))}
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
