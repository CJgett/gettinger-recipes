import Link from 'next/link'

import '../styles/recipe.css'
import { dbFetch } from '../../utils/postgres.js' 

export default async function RecipePage() {

const allRecipes = await dbFetch("SELECT * FROM test_table");
// TODO dynamically determine categries based on existing recipe tag from allRecipes?
const tabCategories = ["breakfast", "main", "side", "dessert", "family recipes!"]

  return (
      <section className="recipes">
        <div className="recipes-container">
        <h2>Recipes</h2>
        <p>Go ahead and peruse to your heart's content the recipes featured in A Pinch of Hanmi, as well as a few suuuuper secret family recipes (shhh! don't tell anyone!!)</p>
        <div className="recipe-box-tabs">
          <button role="tab" className="recipe-box-tab">        
          all recipes
          </button>
          {tabCategories.map((tab, index) => (
          <button role="tab" className="recipe-box-tab" key={index}>        
            {tab}
          </button>
          ))}
        </div>
        <div className="recipe-box">
          {allRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card"> 
              <Link href={`/recipes/${recipe.id}`}>
                <img src={recipe.pic} />
                <h3>{recipe.name_en}</h3>
                <p>main</p>
              </Link>
            </div>
          ))}  
        </div>
        </div>
      </section>
  );
}
