"use client"

import Link from 'next/link'
import '../styles/recipe-card.css'
import { useState } from 'react';

export default function RecipeCard({ recipe }) {
    const publicBlobUrl = process.env.NEXT_PUBLIC_BLOB_URL;
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="recipe-card">
            <Link href={`/recipes/${recipe.name_en.replace(/\s+/g, '_')}-${recipe.id}`}>
                <img 
                    className={!isLoaded ? "loading-recipe-pic" : ""}
                    src={`${publicBlobUrl}/${recipe.pic}`}
                    alt={recipe.pic_alt}
                    onLoad={() => setIsLoaded(true)}
                />
                <h3>{recipe.name_en}</h3>
            </Link>
        </div>
    )
}