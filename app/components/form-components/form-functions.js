import FieldType from '../../constants/FieldType.jsx'
import IngredientField from './IngredientField.jsx'
import NumberedTextField from './NumberedTextField.jsx'
import SourceField from './SourceField.jsx'

export function addNewField(e, fieldType, idCounter, counterSettingFunction, fieldArray, arraySettingFunction) {
  e.preventDefault();
  let objectToBeAdded, fieldName;

  if (fieldType === FieldType.Ingredient) {
    objectToBeAdded = { fieldKey: idCounter + 1 }
    fieldName = 'ingredientField'; 
  } else if (fieldType === FieldType.Direction) {
    objectToBeAdded = { fieldKey: idCounter + 1, isDirection: true }
    console.log("this ones direction")
    fieldName = 'directionField';
  } else if (fieldType === FieldType.Note) {
    objectToBeAdded = { fieldKey: idCounter + 1, isDirection: false };
    fieldName = 'noteField';
  } else if (fieldType === FieldType.Source) {
    objectToBeAdded = { fieldKey: idCounter + 1 }
    fieldName = 'sourceField';
  } else {
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
  let metricUnit;
  for (let i = 0; i < names.length; i++ ) {
    name = names[i];
    metricMeasurement = metricMeasurements[i];
    imperialMeasurement = imperialMeasurements[i];
    if (metricUnits !== false) {
      metricMeasurement = metricMeasurement + " " + metricUnits[i];
      metricUnit = metricUnits[i];
      if (metricMeasurements[i] > 1 && (metricUnit !== "small" && metricUnit !== "medium" && metricUnit !== "large" && metricUnit !== "whole")) {
      metricMeasurement = metricMeasurement + "s";
    }
    if (imperialMeasurements[i] === "") {
      imperialMeasurement = "";
    } else {
      imperialMeasurement = imperialMeasurement + " " + imperialUnits[i];
      if (imperialMeasurements[i] > 1) {
        imperialMeasurement = imperialMeasurement + "s";
      }
    }
   }
    ingredients.push({'ingredient_name_en': name,'metric_measurement': metricMeasurement, 'imperial_measurement': imperialMeasurement});
  }

  return JSON.stringify(ingredients); 
}

export function formatSourcesAsJSON(sourceLinks, sourceTitles) {
  let sources = [];
  let sourceLink;
  let sourceTitle;
  for (let i = 0; i < sourceLinks.length; i++) {
    sourceLink = sourceLinks[i]; 
    sourceTitle = sourceTitles[i]; 
    sources.push({'source_link': sourceLink, 'source_title': sourceTitle});
  }
  return JSON.stringify(sources);
}
