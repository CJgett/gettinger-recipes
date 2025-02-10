"use client"

import { useState, useEffect } from 'react'

import FieldType from '../../constants/FieldType.jsx'
import NumberedTextField from './NumberedTextField.jsx'
import {addNewField, deleteThisField} from './form-functions.js'

export default function Notes({notes}) {

  /* setup NOTES */
  const [noteIDCounter, setNoteIDCounter] = useState(0);
  const initialNoteField = { fieldKey: noteIDCounter, isDirection: false };
  const [noteArray, setNoteArray] = useState([{'key': noteIDCounter, 'noteField': initialNoteField}]);

  useEffect(() => {
    if (notes) {
      let initialNoteArray = [];
      let currentNoteIndex = 0;
      notes.forEach((note) => {
        let noteField = 
          { fieldKey: currentNoteIndex, isDirection: false, noteText: note };
        initialNoteArray[currentNoteIndex] = 
          {'key': currentNoteIndex, 'noteField': noteField};
        currentNoteIndex++;
      });
      setNoteIDCounter(initialNoteArray.length);
      setNoteArray(initialNoteArray);
    }
  }, []);

  return (
    <div>
      Notes
        <button className="new-field-button" onClick={(e) => {addNewField(e, FieldType.Note, noteIDCounter, setNoteIDCounter, noteArray, setNoteArray)}} title="add new note">
          +
        </button>
        {noteArray.map((note, index) => (
          <div key={note.key}>
            <span className="note-number">
              {index + 1}
            </span>
            <div className="note">
              <NumberedTextField fieldKey={note.key} isDirection={false} defaultTextAreaValue={note.noteField.noteText} />
              <button className="delete-field-button" onClick={(e) => {deleteThisField(e, note.key, noteArray, setNoteArray)}} title="delete this note">
                -
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
