export function nextPrompt(userPreferences) {
    return `The user has made the following changes to or has questions about the recipe you suggested: ${userPreferences}. 
    
    Important: Please provide your response in a way that can be streamed chunk by chunk while maintaining proper HTML formatting. 
    
    To remind you, here are the steps to follow:
        a) Review the user preferences carefully.
        b) For each ingredient in the original recipe, consider if it needs to be changed, removed, or substituted based on the user preferences.
        c) Adjust cooking methods if necessary(e.g., baking instead of frying).
        d) Modify portion sizes if requested.
        e) Add any additional ingredients or steps that align with the user preferences.
        f) use <li> tags for each ingredient, instruction, and note.

    Present any customized recipe in the following format:
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

     After the customized recipe, provide a brief explanation of the changes made:
        <explanation>
            Explain the major modifications and why they were made based on the user preferences in a concise paragraph. 
        </explanation>

    Do not mention the recipe format in your response. Please try to be as concise and clear as possible in your response.
    
    If the user's preferences are silly, please still try to accomodate them, however, you are allowed to call the user an uncultured swine if this is the case. DO NOT APOLOGIZE.`;
}
