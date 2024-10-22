"use client"
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Tags } from '../constants/Tags'
import { RecipeTabs } from '../components/RecipeTabs'

import '../styles/recipe.css'
import { getRecipes } from '../components/component-server-functions.js'

export default function AllRecipePage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("all recipes");
  const tabCategories = ["all recipes", ...Tags, "family recipes!"];

  useEffect(() => {
    async function fetchRecipes() {
      const recipes = await getRecipes();
      setAllRecipes(recipes);
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
        <p>Go ahead and peruse to your heart's content the recipes featured in A Pinch of Hanmi, as well as a few suuuuper secret family recipes (shhh! don't tell anyone!!)</p>
        <RecipeTabs 
          categories={tabCategories} 
          activeTab={activeTab} 
          onTabChange={handleTabChange}
        />
        <div className="recipe-box">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link href={`/recipes/${recipe.name_en.replace(/\s+/g, '_')}-${recipe.id}`}>
                <img src={`/recipe_pics/${recipe.pic}`} alt={recipe.pic_alt} />
                <h3>{recipe.name_en}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
