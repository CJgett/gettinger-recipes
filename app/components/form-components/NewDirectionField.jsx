export default function NewDirectionField(directionKey) {
  return (
    <div className={`direction-field-${directionKey} form-group`}>
      <label htmlFor={`direction-${directionKey}`} type="textarea">Direction Text: </label>
      <textarea id={`direction-${directionKey}`} required />
    </div>
  );
}
