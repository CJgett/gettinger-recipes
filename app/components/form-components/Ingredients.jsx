"use client"

import { useState } from 'react'

import FieldType from '../../constants/FieldType.jsx'
import IngredientField from './IngredientField.jsx'
import {addNewField, deleteThisField} from './form-functions.js'

export default function Ingredients() {
  /* setup INGREDIENTS */
  const [ingredientIDCounter, setIngredientIDCounter] = useState(0);
  const initialIngredientField = { fieldKey: ingredientIDCounter };
  const [ingredientArray, setIngredientArray] = useState([{'key': ingredientIDCounter, 'ingredientField': initialIngredientField}]);

  return (
    <div>
      <div>
        Ingredients
        <button className="new-field-button" onClick={(e) => {addNewField(e, FieldType.Ingredient, ingredientIDCounter, setIngredientIDCounter, ingredientArray, setIngredientArray)}} title="add new ingredient">+</button>
      </div>
      {ingredientArray.map((ingredient) => (
          <div className="ingredient-group" key={ingredient.key}>
            <IngredientField fieldKey={ingredient.key} />
            <button className="delete-field-button" onClick={(e) => {deleteThisField(e, ingredient.key, ingredientArray, setIngredientArray)}} title="delete this ingredient">-</button>
          </div>
        ))}
    </div>
  );
}
