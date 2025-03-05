export default function SourceList({listItems}) {
  if(listItems[0].source_link === '') {
    return null;
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
