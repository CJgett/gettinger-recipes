export default function NumberedTextField({fieldKey, isDirection, defaultTextAreaValue=""}) {
  let fieldType;
  if (isDirection === true) {
    fieldType = "direction";
  } else {
    fieldType = "note";
  }

  return (
    <div className={`${fieldType}-field-${fieldKey} form-group`}>
      <label htmlFor={`${fieldType}-${fieldKey}`} type="textarea">{isDirection ? "Direction Text:" : "Note Text:"}</label>
      <textarea id={`${fieldType}-${fieldKey}`} name={`${fieldType}_text`} defaultValue={defaultTextAreaValue} required={isDirection ? true : false} />
    </div>
  );
}
