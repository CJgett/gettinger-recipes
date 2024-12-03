export default function IngredientList({ingredients, isEditing, unitSystem, ingredientMultiplier}) {

  function getMultipliedMeasurement(measurement) {
    let justANumber =  measurement.replace(/[^0-9\. -]+/g,"");
    if (justANumber === "") {
      return measurement;
    }
    let unit = measurement.replace(/[0-9\.  -]/g,"");
    let multipliedMeasurement; 

    // case: ingredient measurement includes a range
    if (justANumber.includes("-")) {
      multipliedMeasurement = ingredientMultiplier * justANumber.substring(0, justANumber.indexOf("-")) 
                            + " - " 
                            + ingredientMultiplier * justANumber.substring(justANumber.indexOf("-") + 1);
    } else {
      multipliedMeasurement = ingredientMultiplier * justANumber;
    }

    if(multipliedMeasurement > 1 && unit.substring(unit.length - 1) !== 's') {
      // case: measurement > 1, but unit doesn't need pluralizing 
      if (unit !== "small" && unit !== "medium" && unit !== "large" && unit !== "whole" && unit !== "") {
        // english smh
        if (unit === "pinch") {
          unit = unit + "e";
        }
        unit = unit + 's';
      }
    } else if (multipliedMeasurement <= 1 && unit.substring(unit.length - 1) === 's') {
      unit = unit.substring(0, unit.length - 1);
      if (unit === "pinche") {
        unit = unit.substring(0, unit.length - 1);
      }
    }
    return multipliedMeasurement + " " + unit;
  }

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
              ? getMultipliedMeasurement(ingredient.metric_measurement) 
              : (ingredient.imperial_measurement === '' ? getMultipliedMeasurement(ingredient.metric_measurement) : getMultipliedMeasurement(ingredient.imperial_measurement))} {ingredient.ingredient_name_en}
          </label>
        </li>
      ))}
    </ul>
  );
}
