import '../styles/admin.css'


export default async function AddRecipePage() {
  return (
    <section className="add-recipe-page">
      <h2>Add New Recipe</h2>
      <form action="" method="get" name="add new recipe">
        <div className="form-group">
          <label for="name_en">English Name: </label>
          <input id="name_en" required />
        </div>
        <div className="form-group">
          <label for="name_kr">Korean Name: </label>
          <input id="name_kr" required />
        </div>
        <div className="form-group">
          <label for="pic">Picture of finished dish: </label>
          <input type="button" id="pic" value="upload">
          </input>
        </div>
        <div className="form-group">
          <label for="pic_alt">Alternative text for recipe picture: </label>
          <input id="pic_alt" required />
        </div>
        <div className="form-group">
    //TODO add in hr and mins dropdown for prep and cook time!
          <label for="prep_time">Prep time: </label>
          <input id="prep_time" required />
        </div>
        <div className="form-group">
          <label for="cook_time">Cook time: </label>
          <input id="cook_time" required />
        </div>
        <div className="form-group">
          <label for="servings">Servings: </label>
          <span>ex: "4"(don't include "people") OR "makes 20 cookies"</span>
          <input id="servings" required />
        </div>
        <div className="form-group">
          <label for="ingredients_en">Ingredients: </label>
          <input id="ingredients_en" required />
        </div>
        <div className="form-group">
          <label for="directions_en">Directions: </label>
          <input id="directions_en" required />
        </div>
        <div className="form-group">
          <label for="notes_en">Notes: </label>
          <input id="notes_en" required />
        </div>
        <div className="form-group">
          <label for="sources">Sources: </label>
          <input id="sources" required />
        </div>
        <div className="form-group">
          <fieldset>
            <legend>Is this a Family Recipe?</legend>
            <div>
              <input id="family_recipe_yes" name="family_recipe" type="radio" />
              <label for="family_recipe_yes">yes </label>
              <input id="family_recipe_no" name="family_recipe" type="radio" />
              <label for="family_recipe_no">no </label>
            </div>
          </fieldset>
        </div>
        <div className="form-group">
          <button type="submit" >
            add recipe
          </button>
        </div>
      </form>
    </section>
  );
 }
