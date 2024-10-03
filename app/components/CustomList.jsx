export default function CustomList(listItems) {
 
  return (
    <ol className="custom-list">
      {listItems.listItems.map ((item, index) => (
        <li key={index}>
          {item}
        </li>
      ))}
    </ol>
  );
}
