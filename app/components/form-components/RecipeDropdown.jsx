'use client'
import { useState, useEffect, useRef } from 'react'
import { getRecipes } from '../component-server-functions'

export default function RecipeDropdown({ selectedRecipe }) {
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [initialRecipes, setInitialRecipes] = useState([])
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getRecipes();
      setFilteredRecipes(recipes);
      setInitialRecipes(recipes);
      console.log("selectedRecipe", selectedRecipe);
      if (selectedRecipe) {
        for (let i = 0; i < recipes.length; i++) {
          console.log("recipe ids", recipes[i].id);
          if (recipes[i].id == selectedRecipe) {
            console.log("selected recipe found");
            setQuery(recipes[i].name_en);
            break;
          }
        }
      }
    }
    fetchRecipes();
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const filtered = query === ''
      ? initialRecipes 
      : filteredRecipes.filter((recipe) => 
          recipe.name_en.toLowerCase().includes(query.toLowerCase())
        )
    setFilteredRecipes(filtered)
  }, [query])

  return (
    <div className="recipe-dropdown" ref={dropdownRef}>
      <div className="recipe-dropdown-input-container">
        <input
          type="text"
          id="recipe-dropdown-selected"
          className="recipe-dropdown-input"
          value={query}
          name="recipe"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Recipe to remix"
        />
        <button
          type="button"
          className="recipe-dropdown-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle dropdown"
        >
          ▼
        </button>
      </div>

      {isOpen && (
        <ul className="recipe-dropdown-list">
          {filteredRecipes.length === 0 ? (
            <li className="recipe-dropdown-empty">No recipes found</li>
          ) : (
            filteredRecipes.map((recipe) => (
              <li
                key={recipe.id}
                className="recipe-dropdown-item"
                onClick={() => {
                  setQuery(recipe.name_en)
                  setIsOpen(false)
                }}
              >
                {recipe.name_en}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
