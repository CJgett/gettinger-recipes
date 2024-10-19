import NumberedTextField from "./form-components/NumberedTextField";

export default function CustomList({listItems, isEditing, isDirection}) {
  if (isEditing) {
    return (
      <div className="custom-list">
        {listItems.map ((item, index) => (
          <NumberedTextField key={index} fieldKey={index} isDirection={isDirection} defaultTextAreaValue={item} />
        ))}
      </div>
    );
  }
  return (
    <ol className="custom-list">
      {listItems.map ((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
}
