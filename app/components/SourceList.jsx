import SourceField from './form-components/SourceField.jsx';

export default function SourceList({listItems, isEditing}) {
  if (isEditing) {
    return (
      <div>
      {listItems.map((listItem, index) => (
        <SourceField key={index} fieldKey={index} defaultSource={listItem} />
      ))}
      </div>
    );
  }
  return (
    <ul>
      {listItems.map((listItem, index) => (
        <li key={index}>
          <a target="blank" href={listItem.source_link}>
            {listItem.source_title}
          </a>
        </li>
      ))}
    </ul>
  );
}
