import FieldType from '../../constants/FieldType.jsx'
import { upload } from '@vercel/blob/client';

export function addNewField(e, fieldType, idCounter, counterSettingFunction, fieldArray, arraySettingFunction) {
  e.preventDefault();
  let objectToBeAdded, fieldName;

  if (fieldType === FieldType.Ingredient) {
    objectToBeAdded = { fieldKey: idCounter + 1 }
    fieldName = 'ingredientField'; 
  } else if (fieldType === FieldType.Direction) {
    objectToBeAdded = { fieldKey: idCounter + 1, isDirection: true, directionText: '' };
    fieldName = 'directionField';
  } else if (fieldType === FieldType.Note) {
    objectToBeAdded = { fieldKey: idCounter + 1, isDirection: false, noteText: '' };
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

export async function saveFile(formData, recipeID) {
  console.log("Starting file save...");
  const file = formData.get("recipe_pic");
  if (!file) {
    throw new Error("No recipe picture file provided");
  }

  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw new Error("Unsupported file type. Please use JPEG, PNG, or WebP");
  }

  let indexOfLastPeriod = file.name.lastIndexOf('.');
  let fileName = recipeID + file.name.substring(indexOfLastPeriod);
  
  try {
    const result = await upload(fileName, file, {
      access: 'public',
      handleUploadUrl: '/api/admin/add-recipe',
      options: {
        headers: {
          'Content-Type': file.type,  // Ensure the correct content type is set
        },
      },
    });
    
    // Return the filename (including the vercel blob added random number!) 
    const actualFileName = result.url.split('/').pop();
    return actualFileName;
  } catch (error) {
    console.error("Upload error details:", error);
    throw new Error(`Error uploading file: ${error.message}`);
  }
}
