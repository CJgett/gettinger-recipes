"use client"

import { useState, useEffect } from 'react'

import FieldType from '../../constants/FieldType.jsx'
import IngredientField from './NewIngredientField.jsx'
import {addNewField, deleteThisField} from './form-functions.js'

export default function Ingredients() {
  /* setup INGREDIENTS */
  const [ingredientIDCounter, setIngredientIDCounter] = useState(0);
  const initialIngredientField = new IngredientField(ingredientIDCounter);
  const [ingredientArray, setIngredientArray] = useState([{'key': ingredientIDCounter, 'ingredientField': initialIngredientField}]);


  return (
    <div>
      <div>
        Ingredients
        <button className="new-field-button" onClick={(e) => {addNewField(e, FieldType.Ingredient, ingredientIDCounter, setIngredientIDCounter, ingredientArray, setIngredientArray)}} title="add new ingredient">+</button>
      </div>
      {ingredientArray.map((ingredient) => (
          <div className="ingredient-group" key={ingredient.key}>
            {ingredient.ingredientField}
            <button className="delete-field-button" onClick={(e) => {deleteThisField(e, ingredient.key, ingredientArray, setIngredientArray)}} title="delete this ingredient">-</button>
          </div>
        ))}
    </div>
  );
}
