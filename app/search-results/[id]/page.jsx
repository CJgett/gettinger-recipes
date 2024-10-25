import { searchDB } from '../../components/component-server-functions'
import RecipeCard from '../../components/RecipeCard'
import SearchBar from '../../components/elements/SearchBar'
import '../../styles/recipe.css'
import '../../styles/search.css'

export default async function SearchResults({ params }) {
    const searchTerm = decodeURIComponent(params.id);
    const results = await searchDB(searchTerm);
    
    return (
        <section className="search-results">
            <div className="search-results-header">
                <div className="search-results-header-text">
                    <h2>Search Results</h2>
                    <p>{results.length} result{results.length === 1 ? '' : 's'} found for "{searchTerm}"</p>
                </div>
                <SearchBar />
            </div>
            {results.length > 0 ? (
                <div className="recipe-box">
                    {results.map((result) => (
                    <RecipeCard key={result.id} recipe={result} />
                    ))}
                </div>
            ) : <p className="no-results">Please try a different search term.</p>}
        </section>
    ) 

}
