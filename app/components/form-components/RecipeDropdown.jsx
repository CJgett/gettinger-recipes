'use client'
import { useState, useEffect, useRef } from 'react'
import { getRecipes } from '../component-server-functions'

export default function RecipeDropdown({ selectedRecipe }) {
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [initialRecipes, setInitialRecipes] = useState([])
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef(null)
  const dropdownInputRef = useRef(null)
  const firstDropdownElement = useRef(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      const recipes = await getRecipes();
      setFilteredRecipes(recipes);
      setInitialRecipes(recipes);
      if (selectedRecipe) {
        for (let i = 0; i < recipes.length; i++) {
          if (recipes[i].id == selectedRecipe) {
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

  const handleKeyDown = (event) => {
    console.log("key pressed" + event.key);
    console.log("focusedIndex" + focusedIndex);
    if(!isOpen) {
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, filteredRecipes.length - 1));
        let nextElement;
        if (event.target === dropdownInputRef.current) {
          // first item is focused and the user presses the down arrow key.
          nextElement = firstDropdownElement.current;
        } else if (event.target.nextElementSibling) {
          // normal case 
          nextElement = event.target.nextElementSibling;
        } 
        if (nextElement) {
          nextElement.focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        const prevElement = event.target.previousElementSibling ? event.target.previousElementSibling : dropdownInputRef.current;
        if (prevElement) {
          prevElement.focus();
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (focusedIndex >= 0) {
          setQuery(filteredRecipes[focusedIndex].name_en);
          setIsOpen(false);
          setFocusedIndex(-1);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'Tab':
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleItemClick = (index) => {
    setQuery(filteredRecipes[index].name_en);
    setIsOpen(false);
  };

  return (
    <div className="recipe-dropdown" ref={dropdownRef}>
      <div className="recipe-dropdown-input-container">
        <label htmlFor='recipe-dropdown-selected' className="recipe-dropdown-label visually-hidden">
          select a recipe to remix
        </label>
        <input
          type="text"
          id="recipe-dropdown-selected"
          className="recipe-dropdown-input"
          value={query}
          name="recipe"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Recipe to remix"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="recipe-listbox"
          ref={dropdownInputRef}
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
        <ul className="recipe-dropdown-list" role="listbox" aria-labelledby="recipe-dropdown">
          {filteredRecipes.length === 0 ? (
            <li className="recipe-dropdown-empty">No recipes found</li>
          ) : (
            filteredRecipes.map((recipe, index) => (
              <li
                key={recipe.id}
                role="option"
                aria-selected={focusedIndex === index}
                tabIndex={focusedIndex === index ? 0 : -1}
                className={(focusedIndex === index ? 'focused' : '') + ' recipe-dropdown-item'}
                onMouseDown={() => handleItemClick(index)}
                onKeyDown={handleKeyDown}
                ref={index === 0 ? firstDropdownElement : null}
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
