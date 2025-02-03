import { dbFetch } from '../../utils/postgres.js'
import RecipeClientChild from './RecipeClientChild.jsx'

export default async function Recipe(recipeID) {
  let fetchedRecipe = await dbFetch('SELECT * FROM all_recipes WHERE id = $1', [recipeID.recipeID]);
  fetchedRecipe = fetchedRecipe[0];

  return (
    <RecipeClientChild recipeDetails={fetchedRecipe} />
  );
}
