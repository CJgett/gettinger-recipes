export default function SourceField({sourceKey, defaultSource=""}) {
  return (
    <div className="source">
      <div className="source-link-container">
        <label htmlFor={`source-link-${sourceKey}`}>Source Link: </label>
        <input type="url" id={`source-link-${sourceKey}`} name="source_link" defaultValue={defaultSource.source_link} />
      </div>
      <div className="source-title-container">
        <label htmlFor={`source-title-${sourceKey}`}>Source Title: </label>
        <input id={`source-title-${sourceKey}`} name="source_title" defaultValue={defaultSource.source_title} />
      </div>
    </div>
  );
}
