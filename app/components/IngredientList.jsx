export default function IngredientList(ingredients) {
 
  return (
    <ul className="ingredient-list">
      {ingredients.ingredients.map((ingredient, index) => (
        <li key={index}>
          <input type="checkbox" id={ingredient.ingredient_name_en} />
          <label htmlFor={ingredient.ingredient_name_en}>{ingredient.metric_measurement} {ingredient.ingredient_name_en}</label>
        </li>
      ))}
    </ul>
  );
}
