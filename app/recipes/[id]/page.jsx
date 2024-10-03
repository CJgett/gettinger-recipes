import Recipe from '../../components/Recipe.jsx' 
import '../../styles/recipe.css'
import { notFound } from 'next/navigation'

export default function RecipePage({params}) {
  return (
    <div>
      <Recipe recipeID={params.id} />
    </div>
  );
}
