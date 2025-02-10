import Notes from "./form-components/Notes";
import Directions from "./form-components/Directions";

export default function CustomList({listItems, isEditing, isDirection}) {
  if (isEditing) {
      if (isDirection) {
         return <Directions directions={listItems} />;
      }
      return <Notes notes={listItems} />;
  }
  return (
    <ol className="custom-list">
      {listItems.map ((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
}
