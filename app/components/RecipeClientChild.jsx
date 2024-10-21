"use client"
import { useState, useEffect } from 'react'

import DecorativeArches from './DecorativeArches.jsx'
import IngredientList from './IngredientList.jsx'
import CustomList from './CustomList.jsx'
import SourceList from './SourceList.jsx'
import Toggle from './Toggle.jsx'
import { updateRecipeInDB } from './form-components/form-server-functions.js'

export default function RecipeClientChild({recipeDetails: initialRecipeDetails}) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [recipeDetails, setRecipeDetails] = useState(initialRecipeDetails);
    const [updatedRecipe, setUpdatedRecipe] = useState(null);

    useEffect(() => {
        if (updatedRecipe) {
            setRecipeDetails(updatedRecipe);
            setUpdatedRecipe(null);
        }
    }, [updatedRecipe]);

    function handleEdit() {
        setIsEditing(isEditing => !isEditing);
        console.log("edit clicked");
    }

    async function handleSave(formData) {
        setIsSaving(true);
        try {
            const result = await updateRecipeInDB(formData, recipeDetails);
            setUpdatedRecipe(result);
            console.log("Recipe updated:", result);
        }
        catch (err){
            console.error("Error saving recipe:", err);
        }
        setIsSaving(false);
        setIsEditing(false);
        console.log("save clicked");

    }
    return (
        <form action={handleSave} name="edit recipe">
            <section className="recipe-detailed">
                <div className="recipe-title-pic">
                    <div className="recipe-title">
                        {isEditing ? (
                            <>
                            <input
                                name="name_en"
                                defaultValue={recipeDetails.name_en}
                                placeholder="English Name"
                            />
                            <input
                                name="name_kr"
                                defaultValue={recipeDetails.name_kr}
                                placeholder="Korean Name"
                            />
                            </>
                        ) : (
                            <>
                            <h2>{recipeDetails.name_en}</h2>
                            <h3>{recipeDetails.name_kr}</h3>
                            </>
                        )}
                        </div>
                        <div className="recipe-pic">
                        <img src={`/recipe_pics/${recipeDetails.pic}`} alt={recipeDetails.pic_alt}/>
                        </div>
                    {isEditing ? (
                        <>
                        <button type="submit" disabled={isSaving}>Save Changes</button>
                        <button onClick={handleEdit} disabled={isSaving}>Discard Changes</button>
                        </>
                    ) : (
                        <button onClick={handleEdit}>Edit Recipe</button>
                    )}
                    </div>
                    <div className="card-section recipe-details">
                        <DecorativeArches additionalClasses={'top'}/>
                        <h3>quick info</h3>
                        <div className="details-container">
                        {isEditing ? (
                            <>
                            <label htmlFor="prep_time">Prep Time: </label>
                            <input
                                name="prep_time"
                                defaultValue={recipeDetails.prep_time}
                                placeholder="Prep Time"
                            />
                            <label htmlFor="cook_time">Cook Time: </label>
                            <input
                                name="cook_time"
                                defaultValue={recipeDetails.cook_time}
                                placeholder="Cook Time"
                            />
                            <label htmlFor="servings">Servings: </label>
                            <input
                                name="servings"
                                defaultValue={recipeDetails.servings}
                                placeholder="Servings"
                            />
                            </>
                        ) : (
                            <>
                            <span>Prep Time: {recipeDetails.prep_time}</span>
                            <span>Cook Time: {recipeDetails.cook_time}</span>
                            <span>Total Time: {recipeDetails.prep_time + recipeDetails.cook_time}</span>
                            <span>Servings: {recipeDetails.servings}</span>
                            </>
                        )}
                        </div>
                        <div className="details-clickables">
                            <button>print</button>
                            <button>Pinterest</button>
                            <Toggle />
                    </div>
                    <DecorativeArches additionalClasses={'bottom'}/>
                </div>
                <div className="card-section ingredients-directions">
                    <h3>Ingredients:</h3>
                    <IngredientList ingredients={recipeDetails.ingredients} isEditing={isEditing}/>
                    <h3>Directions</h3>
                    <CustomList listItems={recipeDetails.directions} isEditing={isEditing} defaultTextAreaValue={recipeDetails.directions} isDirection={true} />
                </div>
                <div className={`card-section notes ${recipeDetails.notes[0] !== "" ? "show" : "hide"}`}>
                    <h3>Notes</h3>
                    <CustomList listItems={recipeDetails.notes} isEditing={isEditing} defaultTextAreaValue={recipeDetails.notes} isDirection={false} />
                </div>
                <div className={`card-section sources ${recipeDetails.sources[0].source_link !== "" ? "show" : "hide"}`}>
                    <h3>Sources / Inspiration</h3>
                    <SourceList listItems={recipeDetails.sources} isEditing={isEditing} defaultTextAreaValue={recipeDetails.sources} isDirection={false} />
                </div>
            </section>
        </form>
    )
}
