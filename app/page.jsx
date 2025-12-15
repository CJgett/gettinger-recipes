"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

import './styles/home.css'

import RecipeCard from './components/RecipeCard';
import ImagePlusText from './components/elements/ImagePlusText';
import { getLatestRecipes } from './components/component-server-functions';
import Breeze from './components/decorations/Breeze';
import RecipeCardLoading from './components/RecipeCardLoading';

export default function HomePage() {
  const [latestRecipes, setLatestRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestRecipes(3).then(recipes => {
      setLatestRecipes(recipes);
      setLoading(false);
    });
  }, []);

  const publicBlobUrl = process.env.NEXT_PUBLIC_BLOB_URL;
 
  return (
    <div className="home-wrapper">
      <section className="home-content">
        <div className="narrow-section">
          <h2>Latest Recipes</h2>
          <div className="recipe-cards-wrapper">
            {loading ? [1,2,3].map((key) => <RecipeCardLoading key={key}/>) : latestRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className="view-all-recipes-button-wrapper">
            <Breeze />
            <Link href="/recipes">
              <button className="view-all-recipes-button">View All Recipes</button>
            </Link>
          </div>
         </div>
        </section>
      <section className="banner-img">
      </section>
    </div>
  );
}
