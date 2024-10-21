"use client"

import { useState, useEffect } from 'react'

import FieldType from '../../constants/FieldType.jsx'
import SourceField from './SourceField.jsx'
import {addNewField, deleteThisField} from './form-functions.js'

export default function Sources() {

  /* setup SOURCES */
  const [sourceIDCounter, setSourceIDCounter] = useState(0);
  const initialSourceField = { fieldKey: sourceIDCounter };
  const [sourceArray, setSourceArray] = useState([{'key': sourceIDCounter, 'sourceField': initialSourceField}]);


  return (
    <div>
      Sources
      <button className="new-field-button" onClick={(e) => {addNewField(e, FieldType.Source, sourceIDCounter, setSourceIDCounter, sourceArray, setSourceArray)}} title="add new source">
        +
      </button>
      {sourceArray.map((source) => ( 
        <div key={source.key}>
          <SourceField fieldKey={source.key} />
          <button className="delete-field-button" onClick={(e) => {deleteThisField(e, source.key, sourceArray, setSourceArray)}} title="delete this source">
              -
          </button>
        </div>

      ))}
    </div>
  );
}

