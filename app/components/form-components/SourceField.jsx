export default function SourceField({sourceKey, defaultSource=""}) {
  return (
    <div className="source">
      <label htmlFor={`source-link-${sourceKey}`}>Source Link: </label>
      <input type="url" id={`source-link-${sourceKey}`} name="source_link" defaultValue={defaultSource.source_link} />
      <label htmlFor={`source-title-${sourceKey}`}>Source Title: </label>
      <input id={`source-title-${sourceKey}`} name="source_title" defaultValue={defaultSource.source_title} />
    </div>
  );
}
