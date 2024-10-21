"use client"

import { useState } from 'react'

import FieldType from '../../constants/FieldType.jsx'
import NumberedTextField from './NumberedTextField.jsx'
import {addNewField, deleteThisField} from './form-functions.js'

export default function Directions() {

  /* setup DIRECTIONS */
  const [directionIDCounter, setDirectionIDCounter] = useState(0);
  const initialDirectionField = { fieldKey: directionIDCounter, isDirection: true };
  const [directionArray, setDirectionArray] = useState([{'key': directionIDCounter, 'directionField': initialDirectionField}]);

  return (
    <div>
      Directions
      <button className="new-field-button" onClick={(e) => {addNewField(e, FieldType.Direction, directionIDCounter, setDirectionIDCounter, directionArray, setDirectionArray)}} title="add new direction">
        +
      </button>
      {directionArray.map((direction, index) => (
        <div key={direction.key}>
          <span className="direction-number">
            {index + 1}
          </span>
          <div className="direction">
            <NumberedTextField fieldKey={direction.key} isDirection={true} />
            <button className="delete-field-button" onClick={(e) => {deleteThisField(e, direction.key, directionArray, setDirectionArray)}} title="delete this direction">
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
