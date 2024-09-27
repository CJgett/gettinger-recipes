export default function NewDirectionField(directionKey, isDirection) {
  return (
    <div className={`direction-field-${directionKey} form-group`}>
      <label htmlFor={`direction-${directionKey}`} type="textarea">{isDirection ? "Direction Text:" : "Note Text:"}</label>
      <textarea id={`direction-${directionKey}`} />
    </div>
  );
}
