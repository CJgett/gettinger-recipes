export default function SourceList(listItems) {
  console.log(listItems);
  return (
    <ul>
      {listItems.listItems.map((listItem, index) => (
        <li key={index}>
          <a target="blank" href={listItem.source_link}>
            {listItem.source_title}
          </a>
        </li>
      ))}
    </ul>
  );
}
