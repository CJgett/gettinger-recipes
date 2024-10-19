export default function IngredientField(ingredientKey) {
  return (
    <div className={`ingredient-field-${ingredientKey} form-group`}>
      <div>
        <label htmlFor={"ingredient_" + ingredientKey}>Ingredient Name: </label>
        <input name="ingredient_name" id={"ingredient_" + ingredientKey} required />
      </div>
      <div>
        <label htmlFor={"metric_measurement_ingredient_" + ingredientKey}>Metric measurement: </label>
        <input name="metric_measurement" id={"metric_measurement_ingredient_" + ingredientKey} type="number" step="0.01" required/>
        <label htmlFor={"metric_measurement_ingredient_unit_" + ingredientKey} required/>
          <select name="metric_measurement_unit" id={"metric_measurement_ingredient_unit_" + ingredientKey}> 
             <option value="teaspoon">tsp</option>
             <option value="tablespoon">tbsp</option>
             <option value="milliliter">mL</option>
             <option value="liter">L</option>
             <option value="gram">g</option>
             <option value="small">small</option>
             <option value="medium">medium</option>
             <option value="large">large</option>
             <option value="whole">whole</option>
        </select>
      </div>
      <div>
        <label htmlFor={"imperial_measurement_ingredient_" + ingredientKey}>Imperial measurement: </label>
        <input name="imperial_measurement" id={"imperial_measurement_ingredient_" + ingredientKey} type="number" step="0.01"/>
          <label htmlFor={"imperial_measurement_ingredient_unit_" + ingredientKey}/>
         <select name="imperial_measurement_unit" id={"imperial_measurement_ingredient_unit_" + ingredientKey}> 
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
