export default function IngredientList({ingredients, isEditing, unitSystem}) {
  if (isEditing) {
    return (
      <div className="ingredient-list">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-editing-container">
            <div>
              <label htmlFor={"ingredient_" + index}>Ingredient Name: </label>
              <input name="ingredient_name_en" id={"ingredient_" + index} defaultValue={ingredient.ingredient_name_en} required />
            </div>
            <div>
              <label htmlFor={"metric_measurement_" + index}>Metric: </label>
              <input name="metric_measurement" id={"metric_measurement_" + index} defaultValue={ingredient.metric_measurement} required />
            </div>
            <div>
              <label htmlFor={"imperial_measurement_" + index}>Imperial: </label>
              <input name="imperial_measurement" id={"imperial_measurement_" + index} defaultValue={ingredient.imperial_measurement} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <ul className="ingredient-list">
      {ingredients.map((ingredient, index) => (
        <li key={index}>
          <input type="checkbox" id={ingredient.ingredient_name_en} />
          <label htmlFor={ingredient.ingredient_name_en}>
            {unitSystem === 'metric' 
              ? ingredient.metric_measurement 
              : (ingredient.imperial_measurement === '' ? ingredient.metric_measurement : ingredient.imperial_measurement)} {ingredient.ingredient_name_en}
          </label>
        </li>
      ))}
    </ul>
  );
}
