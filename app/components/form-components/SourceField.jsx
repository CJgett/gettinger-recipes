export default function SourceField(sourceKey) {
  return (
    <div className="source">
      <label htmlFor={`source-link-${sourceKey}`}>Source Link: </label>
      <input type="url" id={`source-link-${sourceKey}`} name="source-link" />
      <label htmlFor={`source-title-${sourceKey}`}>Source Title: </label>
      <input id={`source-title-${sourceKey}`} name="source-title" />
    </div>
  );
}
