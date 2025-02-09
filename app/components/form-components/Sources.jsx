"use client"

import { useState } from 'react'

import FieldType from '../../constants/FieldType.jsx'
import SourceField from './SourceField.jsx'
import {addNewField, deleteThisField} from './form-functions.js'

export default function Sources({sources}) {

  /* setup SOURCES */
  const [sourceIDCounter, setSourceIDCounter] = useState(0);
  const initialSourceField = { fieldKey: sourceIDCounter };
  const [sourceArray, setSourceArray] = useState(sources !== undefined ? sources : [{'key': sourceIDCounter, 'sourceField': initialSourceField}]);

  return (
    <div>
      <div className="card-section-header">
        <h3>Sources</h3>
        <button className="new-field-button" onClick={(e) => {addNewField(e, FieldType.Source, sourceIDCounter, setSourceIDCounter, sourceArray, setSourceArray)}} title="add new source">
          +
        </button>
      </div>
      {sourceArray.map((source) => ( 
        <div className="source-container" key={source.key}>
          <SourceField fieldKey={source.key} defaultSource={source} />
          <button className="delete-field-button" onClick={(e) => {deleteThisField(e, source.key, sourceArray, setSourceArray)}} title="delete this source">
              -
          </button>
        </div>

      ))}
    </div>
  );
}

