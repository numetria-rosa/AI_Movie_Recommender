// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const randomBtn = document.getElementById('randomBtn');
const demoBtn = document.getElementById('demoBtn');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const errorSection = document.getElementById('errorSection');
const noResultsSection = document.getElementById('noResultsSection');
const resultsTitle = document.getElementById('resultsTitle');
const aiRecommendation = document.getElementById('aiRecommendation');
const backToAllBtn = document.getElementById('backToAllBtn');
const resultsGrid = document.getElementById('resultsGrid');
const errorTitle = document.getElementById('errorTitle');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');

// Movie card template
const movieCardTemplate = document.getElementById('movieCardTemplate');

// State
let currentSearchQuery = '';
let genresCache = {};

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
randomBtn.addEventListener('click', handleRandomMovie);
demoBtn.addEventListener('click', handleDemoMode);
backToAllBtn.addEventListener('click', showAllMovies);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
retryBtn.addEventListener('click', () => {
    if (currentSearchQuery) {
        handleSearch();
    } else {
        handleRandomMovie();
    }
});

// Main search function
async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (!query) {
        showError('Please enter a movie or show name', 'Search query is required');
        return;
    }
    
    currentSearchQuery = query;
    showLoading();
    hideAllSections();
    
    try {
        // Search for the movie/show
        const searchResults = await searchMovies(query);
        
        if (searchResults.length === 0) {
            showNoResults();
            return;
        }
        
        // Get the first result for detailed analysis
        const selectedMovie = searchResults[0];
        
        // Get similar movies/shows
        const similarMovies = await getSimilarMovies(selectedMovie.id, selectedMovie.media_type);
        
        // Get genres for the selected movie
        const movieGenres = await getMovieGenres(selectedMovie.id, selectedMovie.media_type);
        
        // Generate AI recommendation
        const aiRec = await generateAIRecommendation(
            selectedMovie.title || selectedMovie.name,
            selectedMovie.overview,
            movieGenres,
            similarMovies
        );
        
        // Display results
        displayResults(selectedMovie, similarMovies, aiRec);
        
    } catch (error) {
        console.error('Search error:', error);
        showError('Search failed', error.message || 'Failed to search for movies/shows');
    }
}

// Random movie function
async function handleRandomMovie() {
    currentSearchQuery = '';
    showLoading();
    hideAllSections();
    
    try {
        const randomMovie = await getRandomMovie();
        const similarMovies = await getSimilarMovies(randomMovie.id, 'movie');
        const movieGenres = await getMovieGenres(randomMovie.id, 'movie');
        
        const aiRec = await generateAIRecommendation(
            randomMovie.title,
            randomMovie.overview,
            movieGenres,
            similarMovies
        );
        
        displayResults(randomMovie, similarMovies, aiRec, 'Random Movie Pick');
        
    } catch (error) {
        console.error('Random movie error:', error);
        showError('Random pick failed', error.message || 'Failed to get random movie');
    }
}

// Show all movies function
function showAllMovies() {
    currentSearchQuery = '';
    showLoading();
    hideAllSections();
    
    // Simulate loading time
    setTimeout(() => {
        // Show all movies in a grid
        displayAllMovies();
    }, 1000);
}

// Demo mode function
function handleDemoMode() {
    currentSearchQuery = '';
    showLoading();
    hideAllSections();
    
    // Simulate loading time
    setTimeout(() => {
        // Show all movies first
        displayAllMovies();
    }, 1500);
}

// Handle movie card click for genre-based recommendations
function handleMovieClick(movie) {
    showLoading();
    hideAllSections();
    
    // Update loading text to be more specific
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        loadingText.textContent = `AI is analyzing "${movie.title}" and finding similar ${getPrimaryGenre(movie)} movies...`;
    }
    
    // Simulate AI processing time
    setTimeout(() => {
        // Find movies in the same primary genre
        const primaryGenre = getPrimaryGenre(movie);
        const genreMovies = getMoviesByGenre(primaryGenre, movie.id);
        
        // Get genre-specific AI recommendation
        const aiRec = genreRecommendations[primaryGenre] || 
            `If you enjoyed "${movie.title}" with its ${primaryGenre} elements, you'll love these similar titles! They share the same thematic depth and storytelling style that made your choice so compelling.`;
        
        displayResults(movie, genreMovies, aiRec, `Genre Recommendations - ${primaryGenre}`);
    }, 1500);
}

// Get the primary genre of a movie
function getPrimaryGenre(movie) {
    if (!movie.genre_ids || movie.genre_ids.length === 0) return "Drama";
    
    // Map genre IDs to names
    const genreMap = {
        28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
        80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
        14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
        9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV Movie",
        53: "Thriller", 10752: "War", 37: "Western"
    };
    
    return genreMap[movie.genre_ids[0]] || "Drama";
}

// Get movies by genre (excluding the selected movie)
function getMoviesByGenre(genre, excludeMovieId) {
    const genreMap = {
        "Action": [28, 12],
        "Sci-Fi": [878, 12],
        "Thriller": [53, 80],
        "Comedy": [35, 10749],
        "Horror": [27, 53],
        "Drama": [18, 53],
        "Romance": [10749, 35],
        "Animation": [16, 12, 14]
    };
    
    const targetGenres = genreMap[genre] || [18]; // Default to Drama
    
    return demoMovies
        .filter(movie => 
            movie.id !== excludeMovieId && 
            movie.genre_ids.some(id => targetGenres.includes(id))
        )
        .slice(0, 8); // Return up to 8 movies
}

// API Functions
async function searchMovies(query) {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Search failed');
    }
    
    const data = await response.json();
    return data.results;
}

async function getSimilarMovies(id, type) {
    const response = await fetch(`/api/similar/${id}?type=${type}`);
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get similar movies');
    }
    
    const data = await response.json();
    return data.results;
}

async function getMovieGenres(id, type) {
    const response = await fetch(`/api/movie/${id}?type=${type}`);
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get movie details');
    }
    
    const data = await response.json();
    return data.genres || [];
}

async function getRandomMovie() {
    const response = await fetch('/api/random');
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get random movie');
    }
    
    const data = await response.json();
    return data.movie;
}

async function generateAIRecommendation(movieTitle, movieOverview, genres, similarMovies) {
    try {
        const response = await fetch('/api/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieTitle,
                movieOverview,
                genres: genres.map(g => g.name),
                similarMovies
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to generate AI recommendation');
        }
        
        const data = await response.json();
        return data.recommendation;
    } catch (error) {
        console.warn('AI recommendation failed, using fallback:', error);
        return generateFallbackRecommendation(movieTitle, genres, similarMovies);
    }
}

function generateFallbackRecommendation(movieTitle, genres, similarMovies) {
    const genreNames = genres.map(g => g.name).join(', ');
    const similarTitles = similarMovies.slice(0, 3).map(m => m.title || m.name).join(', ');
    
    return `If you enjoyed "${movieTitle}" with its ${genreNames} elements, you'll likely appreciate these similar titles: ${similarTitles}. They share similar themes, storytelling styles, and emotional resonance that made your original choice so compelling.`;
}

// Display Functions
function displayResults(selectedMovie, similarMovies, aiRec, customTitle = null) {
    hideAllSections();
    
    // Set title
    resultsTitle.textContent = customTitle || `Recommendations based on "${selectedMovie.title || selectedMovie.name}"`;
    
    // Set AI recommendation
    aiRecommendation.textContent = aiRec;
    
    // Clear previous results
    resultsGrid.innerHTML = '';
    
    // Add selected movie first
    const selectedCard = createMovieCard(selectedMovie, true);
    resultsGrid.appendChild(selectedCard);
    
    // Add similar movies
    similarMovies.forEach(movie => {
        const card = createMovieCard(movie, false);
        resultsGrid.appendChild(card);
    });
    
    resultsSection.classList.remove('hidden');
}

function displayAllMovies() {
    hideAllSections();
    
    // Set title
    resultsTitle.textContent = "All Movies - Click Any Movie for Genre Recommendations";
    
    // Set AI recommendation
    aiRecommendation.innerHTML = `
        <div style="text-align: center;">
            <p style="margin-bottom: 15px;">Browse our collection of carefully curated movies across all genres.</p>
            <p style="font-weight: 600; color: #4caf50;">🎬 Click on any movie card to get AI-powered recommendations based on that movie's genre and style!</p>
        </div>
    `;
    
    // Clear previous results
    resultsGrid.innerHTML = '';
    
    // Add all movies
    demoMovies.forEach(movie => {
        const card = createMovieCard(movie, false);
        resultsGrid.appendChild(card);
    });
    
    resultsSection.classList.remove('hidden');
}

function createMovieCard(movie, isSelected = false) {
    const card = movieCardTemplate.content.cloneNode(true);
    
    // Set poster image
    const posterImg = card.querySelector('.poster-img');
    if (movie.poster_path) {
        posterImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        posterImg.alt = movie.title || movie.name;
    } else {
        posterImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgdmlld0JveD0iMCAwIDUwMCA3NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNzUwIiBmaWxsPSIjMzMzMzMzIi8+CjxwYXRoIGQ9Ik0yNTAgMzc1QzI4Ny4zIDM3NSAzMTggMzQ0LjMgMzE4IDMwN0MzMTggMjY5LjcgMjg3LjMgMjM5IDI1MCAyMzlDMjEyLjcgMjM5IDE4MiAyNjkuNyAxODIgMzA3QzE4MiAzNDQuMyAyMTIuNyAzNzUgMjUwIDM3NVoiIGZpbGw9IiM2NjY2NjYiLz4KPHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMjAwIDIwMCAxMDAgMTAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMjUwIDIwMEMyNzcuNjE0IDIwMCAzMDAgMjIyLjM4NiAzMDAgMjUwQzMwMCAyNzcuNjE0IDI3Ny42MTQgMzAwIDI1MCAzMDBDMjIyLjM4NiAzMDAgMjAwIDI3Ny42MTQgMjAwIDI1MEMyMDAgMjIyLjM4NiAyMjIuMzg2IDIwMCAyNTAgMjAwWiIgZmlsbD0iIzY2NjY2NiIvPgo8L3N2Zz4KPC9zdmc+';
        posterImg.alt = 'No poster available';
    }
    
    // Set movie title
    const title = movie.title || movie.name;
    card.querySelector('.movie-title').textContent = title;
    card.querySelector('.movie-title-compact').textContent = title;
    
    // Set overview
    const overview = movie.overview || 'No overview available';
    card.querySelector('.movie-overview').textContent = overview.length > 150 ? 
        overview.substring(0, 150) + '...' : overview;
    
    // Set genres
    const genresContainer = card.querySelector('.movie-genres');
    if (movie.genre_ids && movie.genre_ids.length > 0) {
        movie.genre_ids.slice(0, 3).forEach(genreId => {
            const genreName = getGenreName(genreId);
            if (genreName) {
                const genreSpan = document.createElement('span');
                genreSpan.textContent = genreName;
                genresContainer.appendChild(genreSpan);
            }
        });
    }
    
    // Set rating
    const ratingValue = card.querySelector('.rating-value');
    if (movie.vote_average) {
        ratingValue.textContent = movie.vote_average.toFixed(1);
    } else {
        ratingValue.textContent = 'N/A';
    }
    
    // Set year and type
    const yearSpan = card.querySelector('.movie-year');
    const typeSpan = card.querySelector('.movie-type');
    
    if (movie.release_date) {
        yearSpan.textContent = new Date(movie.release_date).getFullYear();
    } else if (movie.first_air_date) {
        yearSpan.textContent = new Date(movie.first_air_date).getFullYear();
    } else {
        yearSpan.textContent = 'N/A';
    }
    
    typeSpan.textContent = movie.media_type === 'tv' ? 'TV Show' : 'Movie';
    
    // Add primary genre to the card
    const primaryGenre = getPrimaryGenre(movie);
    const genreSpan = document.createElement('span');
    genreSpan.textContent = primaryGenre;
    genreSpan.style.cssText = 'color: #4caf50; font-weight: 600; font-size: 0.8rem;';
    typeSpan.parentNode.appendChild(genreSpan);
    
    // Add selected indicator
    if (isSelected) {
        const cardElement = card.querySelector('.movie-card');
        cardElement.style.border = '2px solid #667eea';
        cardElement.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
    }
    
    // Add click functionality for genre-based recommendations
    const cardElement = card.querySelector('.movie-card');
    cardElement.classList.add('clickable');
    cardElement.addEventListener('click', () => handleMovieClick(movie));
    
    return card;
}

function getGenreName(genreId) {
    // This would ideally come from the genres API, but for now we'll use a basic mapping
    const genreMap = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
        80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
        14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
        9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
        53: 'Thriller', 10752: 'War', 37: 'Western'
    };
    return genreMap[genreId] || 'Unknown';
}

// UI State Functions
function showLoading() {
    loadingSection.classList.remove('hidden');
}

function hideLoading() {
    loadingSection.classList.add('hidden');
}

function hideAllSections() {
    loadingSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    errorSection.classList.add('hidden');
    noResultsSection.classList.add('hidden');
}

function showError(title, message) {
    hideAllSections();
    errorTitle.textContent = title;
    errorMessage.textContent = message;
    errorSection.classList.remove('hidden');
}

function showNoResults() {
    hideAllSections();
    noResultsSection.classList.remove('hidden');
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Focus on search input
    searchInput.focus();
    
    // Add some visual feedback for the search input
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.style.borderColor = 'rgba(102, 126, 234, 0.5)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });
});

// Add smooth scrolling for better UX
function scrollToResults() {
    resultsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Export functions for potential future use
window.MovieRecommender = {
    search: handleSearch,
    random: handleRandomMovie,
    scrollToResults
}; 