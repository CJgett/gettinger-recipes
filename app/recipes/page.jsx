"use client"
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Tags } from '../constants/Tags'
import { RecipeTabs } from '../components/RecipeTabs'
import RecipeCard from '../components/RecipeCard'
import RecipeCardLoading from '../components/RecipeCardLoading.jsx'

import '../styles/recipe.css'
import { getRecipesLazyLoad } from '../components/component-server-functions.js'

// recipes to be fetched at a time
const RECIPES_PER_PAGE = 4;

export default function AllRecipePage() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("all recipes");
  const [loading, setLoading] = useState(true);
  // 4 x page = the current number of recipes that have been fetched.
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const tabCategories = ["all recipes", ...Tags, "family recipes!"];
  const observerTarget = useRef(null);

  const loadMore = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    const nextPage = page + 1;
    try {
      const newRecipes = await getRecipesLazyLoad(nextPage, RECIPES_PER_PAGE);
      setAllRecipes(prev => [...prev, ...newRecipes.data]);
      setHasMore(newRecipes.hasMore);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more recipes:', error);
    }
    setLoading(false);
  }, [loading, page]);

  useEffect(() => {
    let isMounted = true;

    async function fetchInitialRecipes() {
      try {
        const recipes = await getRecipesLazyLoad(1, RECIPES_PER_PAGE);
        if (isMounted) {
          setAllRecipes(recipes.data);
          setHasMore(recipes.hasMore);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching initial recipes:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchInitialRecipes();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array

  useEffect(() => {
    // this is used to load more recipes when the user scrolls to the bottom of the page
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, loadMore]);

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
          {filteredRecipes.map((recipe) => (
            <RecipeCard 
              key={`${recipe.id}-${activeTab}`} 
              recipe={recipe} 
            />
          ))}
          {loading && [1, 2, 3, 4].map((index) => (
            <RecipeCardLoading key={`loading-${page}-${index}`} />
          ))}
          {hasMore && <div ref={observerTarget} style={{ height: '20px' }} />}
        </div>
      </div>
    </section>
  );
}
