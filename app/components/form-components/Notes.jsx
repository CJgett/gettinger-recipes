"use client"

import { useState, useEffect } from 'react'

import FieldType from '../../constants/FieldType.jsx'
import NumberedTextField from './NumberedTextField.jsx'
import {addNewField, deleteThisField} from './form-functions.js'

export default function Notes() {

  /* setup NOTES */
  const [noteIDCounter, setNoteIDCounter] = useState(0);
  const initialNoteField = new NumberedTextField(noteIDCounter, false);
  const [noteArray, setNoteArray] = useState([{'key': noteIDCounter, 'noteField': initialNoteField}]);

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
              {note.noteField}
              <button className="delete-field-button" onClick={(e) => {deleteThisField(e, note.key, noteArray, setNoteArray)}} title="delete this note">
                -
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
