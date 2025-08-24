// Configuration file for AI Movie Recommender
// Copy this file to config.js and update with your API keys

module.exports = {
    // TMDB API Configuration - Get your API key from https://www.themoviedb.org/settings/api
    TMDB_ACCESS_TOKEN: 'your_tmdb_api_key_here',
    
    // OpenAI API Configuration - Get your API key from https://platform.openai.com/api-keys
    OPENAI_API_KEY: 'your_openai_api_key_here',
    
    // Server Configuration
    PORT: process.env.PORT || 3000
}; 