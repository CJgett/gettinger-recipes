"use client"

import { useEffect, useState } from 'react'

import FieldType from '../../constants/FieldType.jsx'
import NumberedTextField from './NumberedTextField.jsx'
import {addNewField, deleteThisField} from './form-functions.js'

export default function Directions({directions}) {

  /* setup DIRECTIONS */
  const [directionIDCounter, setDirectionIDCounter] = useState(0);
  const initialDirectionField = { fieldKey: directionIDCounter, isDirection: true, directionText: '' };
  const [directionArray, setDirectionArray] = useState([{'key': directionIDCounter, 'directionField': initialDirectionField}]);

  // If the recipe already has directions, feed these in
  // for example, if the recipe is being edited
  useEffect(() => {
    if(directions) {  
      let initialDirectionArray = [];
      let currentDirectionIndex = 0;
      directions.forEach((direction) => {
        let directionField = 
          { fieldKey: currentDirectionIndex, isDirection: true, directionText: direction };
        initialDirectionArray[currentDirectionIndex] = 
          {'key': currentDirectionIndex, 'directionField': directionField};
        currentDirectionIndex++;
      });
      setDirectionIDCounter(initialDirectionArray.length);
      setDirectionArray(initialDirectionArray);
    } 
  }, []); 
    
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
            <NumberedTextField fieldKey={direction.key} isDirection={true} defaultTextAreaValue={direction.directionField.directionText} />
            <button className="delete-field-button" onClick={(e) => {deleteThisField(e, direction.key, directionArray, setDirectionArray)}} title="delete this direction">
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
