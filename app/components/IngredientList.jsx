
export default function IngredientList({ingredients, isEditing, unitSystem, ingredientMultiplier}) {

  function getMultipliedMeasurement(measurement) {
    let justANumber =  measurement.replace(/[^0-9\. -\. +]+/g,"");
    if (justANumber === "") {
      return measurement;
    }

    let unit;
    let multipliedMeasurement; 
    let splittingCharacter;
    let measurementToReturn

    function convertToFraction(decimal) {
      if (decimal === 0) return "0";

      const commonFractions = { 
        "1/8": (1/8),
        "1/6": (1/6),
        "1/4": (1/4),
        "1/3": (1/3),
        "3/8": (3/8),
        "1/2": (1/2),
        "5/8": (5/8),
        "2/3": (2/3),
        "3/4": (3/4),
        "7/8": (7/8),
      };

      let closestFractionKey = "1/8";
      let closestFraction = commonFractions[closestFractionKey];
      let closestFractionDifference = Math.abs(decimal - closestFraction);
      Object.keys(commonFractions).forEach(key => {
        let difference = Math.abs(decimal - commonFractions[key]);
        if (difference < closestFractionDifference) {
          closestFractionKey = key;
          closestFraction = commonFractions[closestFractionKey];
          closestFractionDifference = difference;
        }
      });
      return closestFractionKey;
      
    } 

    function measurementAsMixedFraction(measurement) {
      let wholeNumber = Math.trunc(measurement);
      let afterDecimal = (measurement % 1).toPrecision(3);

      return (wholeNumber === 0 ? "" : (wholeNumber + " ")) + (afterDecimal == 0.00 ? "" : convertToFraction(afterDecimal));
    }

    // case: ingredient measurement includes a range
    // OR
    // case: ingredient has more than one measurement (the same ingredient is used in multiple steps)
    if (justANumber.includes("-") || justANumber.includes("+")) {
      splittingCharacter = justANumber.includes("-") ? "-" : "+";
      unit = measurement.substring(measurement.indexOf(splittingCharacter) + 2).replace(/[0-9\.  -\. +]/g, "");
      const secondaryUnit = measurement.substring(0, measurement.indexOf(splittingCharacter)).replace(/[0-9\.  -\. +]/g, "");
      let firstMultipliedMeasurement = ingredientMultiplier * justANumber.substring(0, justANumber.indexOf(splittingCharacter));
      let secondMultipliedMeasurement = ingredientMultiplier * justANumber.substring(justANumber.indexOf(splittingCharacter) + 1);
      
      // make fractions prettier for for our imperialist friends :)
      if (unitSystem === 'imperial') {  
        firstMultipliedMeasurement = measurementAsMixedFraction(firstMultipliedMeasurement);
        secondMultipliedMeasurement = measurementAsMixedFraction(secondMultipliedMeasurement);
      }

      measurementToReturn = firstMultipliedMeasurement + " " 
                            + (getUnitWithCorrectGrammaticalNumber(firstMultipliedMeasurement, unit)) 
                            + " "  + splittingCharacter + " "  
                            + secondMultipliedMeasurement + " " 
                            + (getUnitWithCorrectGrammaticalNumber(secondMultipliedMeasurement, (secondaryUnit ? secondaryUnit : unit)));
    } else {
      // separate the unit from the number part of the measurement
      unit = measurement.replace(/[0-9\.  -\. +]/g,"");
      multipliedMeasurement = ingredientMultiplier * justANumber;
      // again, mixed fractions for imperialists
      if (unitSystem === 'imperial') {
        multipliedMeasurement = measurementAsMixedFraction(multipliedMeasurement);
      }
      measurementToReturn = multipliedMeasurement + " " + getUnitWithCorrectGrammaticalNumber(multipliedMeasurement, unit);
    }
    
    return measurementToReturn; 
  }

  function getUnitWithCorrectGrammaticalNumber(multipliedMeasurement, unit) {
    let unitToReturn = unit;
    if(multipliedMeasurement > 1 && unit.substring(unit.length - 1) !== 's') {
      // case: measurement > 1, but unit doesn't need pluralizing 
      if (unit !== "small" && unit !== "medium" && unit !== "large" && unit !== "whole" && unit !== "") {
        // english smh
        if (unit === "pinch" || unit === "dash") {
          unitToReturn = unit + "e";
        }
        unitToReturn = unit + 's';
      }
    } else if (multipliedMeasurement <= 1 && unit.substring(unit.length - 1) === 's') {
      unitToReturn = unit.substring(0, unit.length - 1);
      if (unitToReturn === "pinche" || unitToReturn === "dashe") {
        unitToReturn = unit.substring(0, unit.length - 1);
      }
    }
    return unitToReturn;
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
