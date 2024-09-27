'use client'

import { useState } from 'react'
import '../styles/admin.css'
import DurationInputField from '../components/form-components/DurationInputField.jsx'
import IngredientField from '../components/form-components/NewIngredientField.jsx'
import DirectionField from '../components/form-components/NewDirectionField.jsx'
import SourceField from '../components/form-components/SourceField.jsx'
import FieldType from '../constants/FieldType.jsx'

export default function AddRecipePage() {
  
  /* setup INGREDIENTS */
  const [ingredientIDCounter, setIngredientIDCounter] = useState(0);
  const initialIngredientField = new IngredientField(ingredientIDCounter);
  const [ingredientArray, setIngredientArray] = useState([{'key': ingredientIDCounter, 'ingredientField': initialIngredientField}]);

  /* setup DIRECTIONS */
  const [directionIDCounter, setDirectionIDCounter] = useState(0);
  const initialDirectionField = new DirectionField(directionIDCounter, true);
  const [directionArray, setDirectionArray] = useState([{'key': directionIDCounter, 'directionField': initialDirectionField}]);

  /* setup NOTES */
  const [noteIDCounter, setNoteIDCounter] = useState(0);
  const initialNoteField = new DirectionField(noteIDCounter, false);
  const [noteArray, setNoteArray] = useState([{'key': noteIDCounter, 'noteField': initialNoteField}]);

  /* setup SOURCES */
  const [sourceIDCounter, setSourceIDCounter] = useState(0);
  const initialSourceField = new SourceField(sourceIDCounter);
  const [sourceArray, setSourceArray] = useState([{'key': sourceIDCounter, 'sourceField': initialSourceField}]);


  function addNewField(e, fieldType) {
    e.preventDefault();
    let idCounter, counterSettingFunction, objectToBeAdded, fieldArray, arraySettingFunction, fieldName;

    if (fieldType === FieldType.Ingredient) {
      idCounter = ingredientIDCounter, counterSettingFunction = setIngredientIDCounter,
        objectToBeAdded = new IngredientField(ingredientIDCounter + 1), fieldArray = ingredientArray, 
        arraySettingFunction = setIngredientArray, fieldName = 'ingredientField'; 
    } else if (fieldType === FieldType.Direction) {
      idCounter = directionIDCounter, counterSettingFunction = setDirectionIDCounter, 
        objectToBeAdded = new DirectionField(directionIDCounter + 1, true), fieldArray = directionArray,
        arraySettingFunction = setDirectionArray, fieldName = 'directionField';
    } else if (fieldType === FieldType.Note) {
      idCounter = noteIDCounter, counterSettingFunction = setNoteIDCounter, 
        objectToBeAdded = new DirectionField(noteIDCounter + 1, false), fieldArray = noteArray,
        arraySettingFunction = setNoteArray, fieldName = 'noteField';
    } else if (fieldType === FieldType.Source) {
      idCounter = sourceIDCounter, counterSettingFunction = setSourceIDCounter, 
        objectToBeAdded = new SourceField(sourceIDCounter + 1), fieldArray = sourceArray,
        arraySettingFunction = setSourceArray, fieldName = 'sourceField';
    } else {
      console.log("NOTHING HAPPENED HAHAHA stoopid");
      return;
    }

    let newID = idCounter;
    newID++;
    counterSettingFunction(newID);
    let newArray = fieldArray.slice(0); 
    let nextField = objectToBeAdded;
    newArray.push({'key': newID, [fieldName]: nextField});
    arraySettingFunction(newArray); 
  }

  function deleteThisField(e, id, fieldArray, arraySettingFunction) {
    e.preventDefault();
    if (fieldArray.length > 1) {
      arraySettingFunction((prevArray) => {
        let updatedArray = prevArray.slice(0);
        updatedArray.splice(updatedArray.findIndex((element) => element.key == id), 1);
        return updatedArray;
      });
    }
  }

  function addRecipeToDB(formData) {
    const recipeAuthor = formData.get("recipe-author");
    const prepTimeHrs = formData.get("prep_time_hrs");
    const prepTimeMins = formData.get("prep_time_mins");
    const picAltText = formData.get("pic_alt");
    console.log(recipeAuthor);
    console.log(picAltText);
    console.log(prepTimeHrs +"hrs, " + prepTimeMins + "mins");
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
            <input name="name_en" id="name_en" required />
          </div>
          <div className="form-question">
            <label htmlFor="name_kr">Korean Name: </label>
            <input name="name_kr" id="name_kr" required />
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
            <textarea id="pic_alt" name="pic_alt" required />
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
            <input id="servings" name="servings" required />
          </div>
        </div>

        {/* INGREDIENTS */}       

        <div id="ingredients" className="form-question ingredients">
          <div>
            Ingredients
            <button className="new-field-button" onClick={(e) => {addNewField(e, FieldType.Ingredient)}} title="add new ingredient">+</button>
          </div>
              {ingredientArray.map((ingredient) => (
                <div className="ingredient-group" key={ingredient.key}>
                  {ingredient.ingredientField}
                  <button className="delete-field-button" onClick={(e) => {deleteThisField(e, ingredient.key, ingredientArray, setIngredientArray)}} title="delete this ingredient">-</button>
                </div>
              ))}
        </div>

        {/* DIRECTIONS */}

        <div className="form-question directions"> 
          Directions
          <button className="new-field-button" onClick={(e) => {addNewField(e, FieldType.Direction)}} title="add new direction">
            +
          </button>
          {directionArray.map((direction, index) => (
            <div key={direction.key}>
              <span className="direction-number">
                {index + 1}
              </span>
              <div className="direction">
                {direction.directionField}
                <button className="delete-field-button" onClick={(e) => {deleteThisField(e, direction.key, directionArray, setDirectionArray)}} title="delete this direction">
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
             
        {/* NOTES */}

        <div className="form-question notes">
          Notes
          <button className="new-field-button" onClick={(e) => {addNewField(e, FieldType.Note)}} title="add new note">
            +
          </button>
          {noteArray.map((note, index) => (
            <div key={note.key}>
              <span className="note-number">
                {index + 1}
              </span>
              <div className="note">
                {note.noteField}
                <button className="delete-field-button" onClick={(e) => {deleteThisField(e, note.key, noteArray, setNoteArray)}} title="delete this note">
                  -
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SOURCES */}

        <div className="form-question sources">
          <div>
            Sources
            <button className="new-field-button" onClick={(e) => {addNewField(e, FieldType.Source)}} title="add new source">
              +
            </button>
            {sourceArray.map((source) => ( 
              <div key={source.key}>
                {source.sourceField}
                <button className="delete-field-button" onClick={(e) => {deleteThisField(e, source.key, sourceArray, setSourceArray)}} title="delete this source">
                    -
                </button>
              </div>

            ))}
          </div>
        </div>

        <div className="form-question">
          <fieldset>
            <legend>Is this a Family Recipe?</legend>
            <div>
              <input required id="family_recipe_yes" name="family_recipe" type="radio" />
              <label htmlFor="family_recipe_yes">yes </label>
              <input required id="family_recipe_no" name="family_recipe" type="radio" />
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
