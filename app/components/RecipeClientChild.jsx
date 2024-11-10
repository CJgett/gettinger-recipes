"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import DecorativeArches from './decorations/DecorativeArches.jsx'
import IngredientList from './IngredientList.jsx'
import CustomList from './CustomList.jsx'
import SourceList from './SourceList.jsx'
import Sources from './form-components/Sources.jsx'
import { updateRecipeInDB } from './form-components/form-server-functions.js'
import { verifyToken } from './component-server-functions.js'

function parseTimeString(timeStr, forTotal = false) {
    const hrs = timeStr.match(/(\d+)\s*hrs?/);
    const mins = timeStr.match(/(\d+)\s*mins?/);
    if (hrs === null) {
        return 0;
        }
    if (forTotal) {
        return (hrs ? parseInt(hrs[1]) * 60 : 0) + (mins ? parseInt(mins[1]) : 0);
    } else {
        return (hrs[1] > 0 ? hrs[0] : '') + (mins[1] > 0 ? mins[0] : '');
    }
}

export default function RecipeClientChild({recipeDetails: initialRecipeDetails}) {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [recipeDetails, setRecipeDetails] = useState(initialRecipeDetails);
    const [isAdmin, setIsAdmin] = useState(false);
    const iconDimensions = 30;
    const [unitSystem, setUnitSystem] = useState('metric');

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if(!token){
            setIsAdmin(false);
            return;
        } else {
            console.log("token found");
        }
        try {
           verifyToken(token) 
        } catch (error) {
            console.log("error")
            console.error(error);
            localStorage.removeItem('adminToken');
            setIsAdmin(false);
            return;
        }
        setIsAdmin(true);
    }, []);

    function handleEdit(e) {
        e.preventDefault();
        setIsEditing(isEditing => !isEditing);
        console.log("edit clicked");
    }

    async function handleSave(formData) {
        setIsSaving(true);
        try {
            const result = await updateRecipeInDB(formData, recipeDetails);
            setRecipeDetails(result);
            console.log("Recipe updated:", result);
        }
        catch (err){
            console.error("Error saving recipe:", err);
        }
        setIsSaving(false);
        setIsEditing(false);
        console.log("save clicked");

    }

    function handlePrint(e) {
        e.preventDefault();
        window.print();
    }

    return (
        <form action={handleSave} name="edit recipe">
            <section className={`recipe-detailed ${isEditing ? 'editing' : ''}`}>
                <div className="recipe-title-edit">
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
                        {isAdmin && (
                    <div className="edit-buttons">
                        {isEditing ? (
                            <>
                            <button onClick={handleEdit} disabled={isSaving} aria-label="Discard Changes">
                                <Image
                                    src="/icons/delete-svgrepo-com.svg"
                                    alt="an outline of a trash can"
                                    width={iconDimensions}
                                    height={iconDimensions}
                                />
                            </button>
                            <button type="submit" disabled={isSaving} aria-label="Save Changes">
                                <Image
                                    src="/icons/save-svgrepo-com.svg"
                                    alt="an outline of a floppy disk"
                                    width={iconDimensions}
                                    height={iconDimensions}
                                />
                            </button>
                            </>
                        ) : (
                            <button onClick={handleEdit} aria-label="Edit Recipe">
                                <Image
                                    src="/icons/editoutline-svgrepo-com.svg"
                                    alt="an outline of a pencil"
                                    width={iconDimensions}
                                    height={iconDimensions}
                                />
                            </button>
                        )}
                    </div>
)}
                    </div>
                    <div className="recipe-pic">
                        <img src={`/recipe_pics/${recipeDetails.pic}`} alt={recipeDetails.pic_alt}/>
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
                            <span>Prep Time: {parseTimeString(recipeDetails.prep_time)}</span>
                            <span>Cook Time: {parseTimeString(recipeDetails.cook_time)}</span>
                            <span>Total Time: {(() => {
                                const prepMins = parseTimeString(recipeDetails.prep_time, true);
                                const cookMins = parseTimeString(recipeDetails.cook_time, true);
                                const totalMins = prepMins + cookMins;
                                const hours = Math.floor(totalMins / 60);
                                const minutes = totalMins % 60;
                                return `${hours ? `${hours}hrs ` : ''}${minutes}mins`;
                            })()}</span>
                            <span>Servings: {recipeDetails.servings}</span>
                            </>
                        )}
                        </div>
                        <div className="print-button">
                            <button onClick={handlePrint} type="button">
                                Print
                                <Image
                                    src="/icons/print-svgrepo-com.svg"
                                    alt="an outline of a printer"
                                    width={iconDimensions}
                                    height={iconDimensions}
                                />
                            </button>
                    </div>
                    <DecorativeArches additionalClasses={'bottom'}/>
                </div>
                <div className="card-section ingredients-directions">
                    <div className="ingredients-unit-toggle-container">
                        <h3>Ingredients:</h3>
                        <div className="unit-toggle">
                            <button 
                                type="button"
                                className={unitSystem === 'metric' ? 'active' : ''}
                                onClick={() => setUnitSystem('metric')}
                            >
                                Metric
                            </button>
                            <button 
                                type="button"
                                className={unitSystem === 'imperial' ? 'active' : ''}
                                onClick={() => setUnitSystem('imperial')}
                            >
                                Imperial
                            </button>
                        </div>
                    </div>
                    <IngredientList 
                        ingredients={recipeDetails.ingredients} 
                        isEditing={isEditing}
                        unitSystem={unitSystem}
                    />
                    <h3>Directions</h3>
                    <CustomList listItems={recipeDetails.directions} isEditing={isEditing} defaultTextAreaValue={recipeDetails.directions} isDirection={true} />
                    <div className="remixer-button-container">
                        <p>Need to tweak this recipe? Try remixing it!</p>
                        <Link href={`/remixer?recipeId=${recipeDetails.id}`}>
                            <button type="button">To the Remixer!</button>
                        </Link>
                    </div>
                </div>
                <div className={`card-section notes ${recipeDetails.notes[0] !== "" && !isEditing ? "show" : "hide"}`}>
                    <h3>Notes</h3>
                    <CustomList listItems={recipeDetails.notes} isEditing={isEditing} defaultTextAreaValue={recipeDetails.notes} isDirection={false} />
                </div>
                <div className={`card-section sources ${(recipeDetails.sources.length === 0 || recipeDetails.sources[0]?.source_link === "") && !isEditing ? "hide" : "show"}`}>
                    {isEditing ? 
                        (<Sources sources={recipeDetails.sources}/>)
                        : 
                        (<>
                            <h3>Sources / Inspiration</h3>
                            <SourceList listItems={recipeDetails.sources} defaultTextAreaValue={recipeDetails.sources} isDirection={false} /> 
                        </>)}
                </div>
            </section>
        </form>
    )
}
