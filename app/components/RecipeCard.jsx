import Link from 'next/link'
import '../styles/recipe-card.css'

export default function RecipeCard({ recipe }) {
    const publicBlobUrl = process.env.NEXT_PUBLIC_BLOB_URL;

    return (
        <div className="recipe-card">
            <Link href={`/recipes/${recipe.name_en.replace(/\s+/g, '_')}-${recipe.id}`}>
                <img src={`${publicBlobUrl}/${recipe.pic}`} alt={recipe.pic_alt} />
                <h3>{recipe.name_en}</h3>
            </Link>
        </div>
    )
}