"use server"
import { dbFetch } from '../../../utils/postgres.js'
import { formatIngredientsAsJSON, formatSourcesAsJSON } from './form-functions.js'

export async function updateRecipeInDB(formData, originalRecipe) {
  const updatedNameEN = formData.get("name_en");
  const updatedNameKR = formData.get("name_kr");  
  const updatedPrepTime = formData.get("prep_time");
  const updatedCookTime = formData.get("cook_time");
  const updatedServings = formData.get("servings");
  const updatedIngredients = formatIngredientsAsJSON(formData.getAll("ingredient_name_en"), formData.getAll("metric_measurement"), false, formData.getAll("imperial_measurement"), false);
  const updatedDirections = JSON.stringify(formData.getAll("direction_text"));
  const updatedNotes = JSON.stringify(formData.getAll("note_text"));
  const updatedSources = formatSourcesAsJSON(formData.getAll("source_link"), formData.getAll("source_title"));
  const result = await dbFetch(`UPDATE all_recipes SET name_en = $1, name_kr = $2, prep_time = $3, cook_time = $4, servings = $5, ingredients = $6, directions = $7, notes = $8, sources = $9 WHERE id = $10 RETURNING *;`, 
    [updatedNameEN, updatedNameKR, updatedPrepTime, updatedCookTime, updatedServings, updatedIngredients, updatedDirections, updatedNotes, updatedSources, originalRecipe.id]);
  return result[0];
}
export async function updatePicFileName(recipeID, picFileName) {
  const result = await dbFetch(`UPDATE all_recipes SET pic = $1 WHERE id = $2 RETURNING *;`, [picFileName, recipeID]);
  return result[0];
}

export async function addRecipeToDB(formData) {
  const recipeAuthor = formData.get("recipe_author");
  const nameEN = formData.get("name_en");
  const nameKR = formData.get("name_kr");

  //TODO restrict size and type of file
  const picAltText = formData.get("pic_alt");

  const prepTime = formData.get("prep_time_hrs") + "hrs " + formData.get("prep_time_mins") + "mins";
  const cookTime = formData.get("cook_time_hrs") + "hrs " + formData.get("cook_time_mins") + "mins";
  const servings = formData.get("servings");

  const ingredients = formatIngredientsAsJSON(formData.getAll("ingredient_name"), formData.getAll("metric_measurement"), formData.getAll("metric_measurement_unit"), formData.getAll("imperial_measurement"), formData.getAll("imperial_measurement_unit"));
  const directions = JSON.stringify(formData.getAll("direction_text"));
  const notes = JSON.stringify(formData.getAll("note_text"));
  const sources = formatSourcesAsJSON(formData.getAll("source_link"), formData.getAll("source_title"));

  const isFamilyRecipe = (formData.get("family_recipe") === "yes");
  const tags = formData.getAll("tags");

  try {
    const postResult = await dbFetch(`INSERT INTO all_recipes (author, name_en, name_kr, pic, pic_alt, prep_time, cook_time, servings, ingredients, directions, notes, sources, tags, is_family_recipe) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`,
      [recipeAuthor, nameEN, nameKR, nameEN, picAltText, prepTime, cookTime, servings, ingredients, directions, notes, sources, tags, isFamilyRecipe]);
    return postResult[0];
  } catch (error) {
    console.error("Error adding recipe to DB: " + error);
    return false;
  }
}