import FieldType from '../../constants/FieldType.jsx'
import IngredientField from './NewIngredientField.jsx'
import DirectionField from './NewDirectionField.jsx'
import SourceField from './SourceField.jsx'

export function addNewField(e, fieldType, idCounter, counterSettingFunction, fieldArray, arraySettingFunction) {
  e.preventDefault();
  let objectToBeAdded, fieldName;

  if (fieldType === FieldType.Ingredient) {
    objectToBeAdded = new IngredientField(idCounter + 1)
    fieldName = 'ingredientField'; 
  } else if (fieldType === FieldType.Direction) {
    objectToBeAdded = new DirectionField(idCounter + 1, true)
    fieldName = 'directionField';
  } else if (fieldType === FieldType.Note) {
    objectToBeAdded = new DirectionField(idCounter + 1, false);
    fieldName = 'noteField';
  } else if (fieldType === FieldType.Source) {
    objectToBeAdded = new SourceField(idCounter + 1);    fieldName = 'sourceField';
  } else {
    console.log("NOTHING HAPPENED HAHAHA stoopid");
    return;
  }

    let newID = idCounter;
    newID++;
    counterSettingFunction(newID);
    let newArray = fieldArray.slice(0); 
    let nextField = objectToBeAdded;
    newArray.push({'key': newID, [fieldName]: nextField});
    arraySettingFunction(newArray); 
  }

export function deleteThisField(e, id, fieldArray, arraySettingFunction) {
    e.preventDefault();
    if (fieldArray.length > 1) {
      arraySettingFunction((prevArray) => {
      let updatedArray = prevArray.slice(0);
      updatedArray.splice(updatedArray.findIndex((element) => element.key == id), 1);
      return updatedArray;
    });
  }
}

export function formatIngredientsAsJSON(names, metricMeasurements, metricUnits, imperialMeasurements, imperialUnits) {
  let ingredients = [];
  let name;
  let metricMeasurement;
  let imperialMeasurement;
  for (let i = 0; i < names.length; i++ ) {
    name = names[i];
    metricMeasurement = metricMeasurements[i] + " " + metricUnits[i];
    if (metricMeasurements[i] > 1) {
      metricMeasurement = metricMeasurement + "s";
    }
    if (imperialMeasurements[i] === "") {
      imperialMeasurement = "";
    } else {
      imperialMeasurement = imperialMeasurements[i] + " " + imperialUnits[i];
    }
    ingredients.push({'ingredient_name_en': [name],'metric_measurement': [metricMeasurement], 'imperial_measurement': [imperialMeasurement]});
  }

  return JSON.stringify(ingredients); 
}
