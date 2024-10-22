import Recipe from '../../components/Recipe.jsx'
import '../../styles/recipe.css'
import { notFound } from 'next/navigation'

export default function RecipePage({ params }) {
  const { slug } = params;
  const id = slug.split('-').pop(); // Get the ID from the end of the slug

  if (!id) {
    notFound();
  }

  return (
    <div>
      <Recipe recipeID={id} />
    </div>
  );
}
