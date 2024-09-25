export default function NewIngredientField(ingredientKey) {
  return (
    <div className={`ingredient-field-${ingredientKey} form-group`}>
      <div>
        <label htmlFor={"ingredient_" + ingredientKey}>Ingredient Name: </label>
        <input id={"ingredient_" + ingredientKey} />
      </div>
      <div>
        <label htmlFor={"metric_measurement_ingredient_" + ingredientKey}>Metric measurement: </label>
        <input id={"metric_measurement_ingredient_" + ingredientKey} type="number" required/>
        <label htmlFor={"metric_measurement_ingredient_unit_" + ingredientKey} required/>
          <select id={"metric_measurement_ingredient_unit_" + ingredientKey}> 
             <option value="teaspoon">tsp</option>
             <option value="tablespoon">tbsp</option>
             <option value="milliliter">mL</option>
             <option value="liter">L</option>
             <option value="gram">g</option>
        </select>
      </div>
      <div>
        <label htmlFor={"imperial_measurement_ingredient_" + ingredientKey}>Imperial measurement: </label>
        <input id={"imperial_measurement_ingredient_" + ingredientKey} type="number"/>
          <label htmlFor={"imperial_measurement_ingredient_unit_" + ingredientKey}/>
         <select id={"imperial_measurement_ingredient_unit_" + ingredientKey}> 
           <option value="ounce">oz</option>
           <option value="pound">lbs</option>
           <option value="fluid ounce">fl oz</option>
           <option value="cup">c</option>
           <option value="pint">pt</option>
           <option value="quart">qt</option>
           <option value="gallon">gal</option>
        </select>
      </div>
    </div>
  );
}
