export default function DurationInputField(fieldID) {
  return (
    <div className="duration-input" id={fieldID}>
      <select id={fieldID + "hrs"} required>
        <option value="0">0</option> 
        <option value="1">1</option> 
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label htmlFor={fieldID + "hrs"}>hrs</label>
      <select id={fieldID + "mins"} required>
        <option value="0">0</option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>
      <label htmlFor={fieldID + "mins"}>mins</label>
    </div>
  );
}
