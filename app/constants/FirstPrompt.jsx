export function firstPrompt(recipe, userPreferences) {
    return `You will be customizing a given recipe based on user preferences.Follow these steps carefully:

1. First, you will be presented with an original recipe:
        Recipe = ${recipe}
    If you aren't provided with a recipe, please respond with "I'm sorry, but I don't see that you've provided a recipe."

2. Then, you will receive user preferences:
        User preferences = ${userPreferences}

3. Your task is to modify the original recipe according to the user preferences.Here's how to approach this:

   a) Review the user preferences carefully.
   b) For each ingredient in the original recipe, consider if it needs to be changed, removed, or substituted based on the user preferences.
   c) Adjust cooking methods if necessary(e.g., baking instead of frying).
   d) Modify portion sizes if requested.
   e) Add any additional ingredients or steps that align with the user preferences.
   f) use <li> tags for each ingredient, instruction, and note.

4. Present the customized recipe in the following format:
        <customized_recipe>
            <name><h3>Modified name of the dish</h3></name>
            <ingredients>
                <h4>Ingredients</h4>
                <ul>
                </ul>
            </ingredients>
            <instructions>
                <h4>Instructions</h4>
                <ol>
                    - Step-by-step instructions for preparing the dish using <li> tags
                </ol>
            </instructions>
            <notes>
                <h4>Notes</h4>
                <ul>
                    - Any additional notes or tips for the customized recipe using <li> tags
                </ul>
            </notes>
        </customized_recipe>

5. After the customized recipe, provide a brief explanation of the changes made:
        <explanation>
            Explain the major modifications and why they were made based on the user preferences in a concise paragraph. 
        </explanation>

Remember to maintain the essence of the original dish while accommodating the user's preferences as much as possible. If a preference cannot be accommodated without significantly altering the nature of the dish, mention this in the explanation.

Please use the customized recipe format in your response, but do not mention it otherwise.`
}

export default firstPrompt;