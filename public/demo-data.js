// Demo data for testing the UI without API keys
const demoMovies = [
    {
        id: 1,
        title: "Inception",
        overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        poster_path: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        media_type: "movie",
        genre_ids: [28, 878, 53],
        vote_average: 8.4,
        release_date: "2010-07-16"
    },
    {
        id: 2,
        title: "The Dark Knight",
        overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        poster_path: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        media_type: "movie",
        genre_ids: [18, 28, 80, 53],
        vote_average: 9.0,
        release_date: "2008-07-18"
    },
    {
        id: 3,
        title: "Interstellar",
        overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        media_type: "movie",
        genre_ids: [12, 18, 878],
        vote_average: 8.6,
        release_date: "2014-11-07"
    },
    {
        id: 4,
        title: "The Matrix",
        overview: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
        poster_path: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        media_type: "movie",
        genre_ids: [28, 878, 53],
        vote_average: 8.7,
        release_date: "1999-03-31"
    },
    {
        id: 5,
        title: "Pulp Fiction",
        overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        poster_path: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        media_type: "movie",
        genre_ids: [53, 80],
        vote_average: 8.9,
        release_date: "1994-10-14"
    }
];

const demoGenres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Sci-Fi" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" }
];

// Demo AI recommendation
const demoAIRecommendation = "Based on your love for 'Inception' with its mind-bending Sci-Fi and Thriller elements, you'll absolutely adore these similar titles! They all share Christopher Nolan's signature style of complex narratives, stunning visuals, and thought-provoking concepts that challenge your perception of reality. From the psychological depth of 'The Dark Knight' to the cosmic exploration in 'Interstellar', each film offers the same level of intellectual engagement and cinematic excellence that made 'Inception' so compelling.";

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { demoMovies, demoGenres, demoAIRecommendation };
} 