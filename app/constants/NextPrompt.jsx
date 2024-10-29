export function nextPrompt (userPreferences) {
    return `The user has made the following changes to or has questions about the recipe you suggested: ${userPreferences}. Please update the recipe accordingly, making sure to add the appropriate html tags, as you did in your first message. 
    If the recipe does not need to be updated, please say so. Please do not mention the recipe format in your response.`;
}
