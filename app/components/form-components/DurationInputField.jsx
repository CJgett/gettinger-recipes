export default function DurationInputField(props) {
  return (
    <div className="duration-input" id={props.fieldID}>
      <select id={props.fieldID + "_hrs"} name={`${props.fieldID}_hrs`} required>
        <option value="0">0</option> 
        <option value="1">1</option> 
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label htmlFor={props.fieldID + "_hrs"}>hrs</label>
      <select id={props.fieldID + "_mins"} name={props.fieldID + "_mins"} required>
        <option value="0">0</option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>
      <label htmlFor={props.fieldID + "_mins"}>mins</label>
    </div>
  );
}
