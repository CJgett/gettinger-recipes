export default function SourceList({listItems}) {
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
