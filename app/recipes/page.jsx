"use client"
import { useState, useEffect, useMemo } from 'react'
import { Tags } from '../constants/Tags'
import { RecipeTabs } from '../components/RecipeTabs'
import RecipeCard from '../components/RecipeCard'
import RecipeCardLoading from '../components/RecipeCardLoading.jsx'

import '../styles/recipe.css'
import { getRecipes } from '../components/component-server-functions.js'

export default function AllRecipePage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("all recipes");
  const tabCategories = ["all recipes", ...Tags, "family recipes!"];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      const recipes = await getRecipes();
      setAllRecipes(recipes);
      setLoading(false);
    }
    fetchRecipes();
  }, []);

  const filteredRecipes = useMemo(() => {
    if (activeTab === "all recipes") return allRecipes;
    return allRecipes.filter(recipe => {
      if (activeTab === "family recipes!") return recipe.is_family_recipe;
      return recipe.tags.includes(activeTab);
    });
  }, [allRecipes, activeTab]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  return (
    <section className="recipes">
      <div className="recipes-container">
        <h2>Recipes</h2>
        <p>Go ahead and peruse to your heart's content the recipes collected by our family, including a few suuuuper secret family recipes (shhh! don't tell anyone!!)</p>
        <RecipeTabs 
          categories={tabCategories} 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
        />
        <div className="recipe-box">
          {loading ? (
            // Show loading state
            [1,2,3,4].map((key) => <RecipeCardLoading key={key} />)
          ) : (
            // Show recipes when loaded
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
