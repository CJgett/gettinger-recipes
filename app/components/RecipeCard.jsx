import Link from 'next/link'
import '../styles/recipe-card.css'

export default function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <Link href={`/recipes/${recipe.name_en.replace(/\s+/g, '_')}-${recipe.id}`}>
                <img src={`/recipe_pics/${recipe.pic}`} alt={recipe.pic_alt} />
                <h3>{recipe.name_en}</h3>
            </Link>
        </div>
    )
}