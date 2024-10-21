"use server"
import fs from 'fs'
import { dbFetch } from '../../../utils/postgres.js'
import { formatIngredientsAsJSON, formatSourcesAsJSON } from './form-functions.js'

export async function saveFile(file, recipeID) {
  if (file.name === 'undefined') {
    return '';
  }
  let indexOfLastPeriod = file.name.lastIndexOf('.');
  let fileName = recipeID + file.name.substring(indexOfLastPeriod);
  let fileToUpload = new File([file], fileName , {type: file.type});
  const arrayBuffer = await fileToUpload.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  console.log("file details in uploadFile function");
  console.log(fileToUpload);
  console.log(fileName);

  let filePath = 'public/recipe_pics' + '/' + fileName;

  fs.writeFile(filePath, buffer, (err) => {
    if (err) throw err;
    console.log('file saved!');
  });
  return fileName;
}

export async function updateRecipeInDB(formData, originalRecipe) {
  const updatedNameEN = formData.get("name_en");
  const updatedNameKR = formData.get("name_kr");  
  const updatedPrepTime = formData.get("prep_time");
  const updatedCookTime = formData.get("cook_time");
  const updatedServings = formData.get("servings");
  const updatedIngredients = formatIngredientsAsJSON(formData.getAll("ingredient_name_en"), formData.getAll("metric_measurement"), false, formData.getAll("imperial_measurement"), false);
  const updatedDirections = JSON.stringify(formData.getAll("direction_text"));
  const updatedNotes = JSON.stringify(formData.getAll("note_text"));
  const updatedSources = formatSourcesAsJSON(formData.getAll("source-link"), formData.getAll("source-title"));
  const result = await dbFetch(`UPDATE all_recipes SET name_en = $1, name_kr = $2, pic = $3, pic_alt = $4, prep_time = $5, cook_time = $6, servings = $7, ingredients = $8, directions = $9, notes = $10, sources = $11, tags = $12 WHERE id = $13 RETURNING *;`, 
    [updatedNameEN, updatedNameKR, originalRecipe.pic, originalRecipe.pic_alt, updatedPrepTime, updatedCookTime, updatedServings, updatedIngredients, updatedDirections, updatedNotes, updatedSources, originalRecipe.tags, originalRecipe.id]);
  return result[0];
}
