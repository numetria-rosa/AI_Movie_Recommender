// Enhanced demo data for testing the UI without API keys
const demoMovies = [
    // Action & Adventure
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
        title: "Mad Max: Fury Road",
        overview: "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life.",
        poster_path: "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroR2dfP.jpg",
        media_type: "movie",
        genre_ids: [28, 12, 878],
        vote_average: 7.9,
        release_date: "2015-05-15"
    },
    {
        id: 4,
        title: "John Wick",
        overview: "Ex-hitman John Wick comes out of retirement to track down the gangsters that took everything from him.",
        poster_path: "https://image.tmdb.org/t/p/w500/5vHssUeVe25bMrof1HyaWkzP4k9.jpg",
        media_type: "movie",
        genre_ids: [28, 80, 53],
        vote_average: 7.4,
        release_date: "2014-10-24"
    },
    {
        id: 5,
        title: "Mission: Impossible - Fallout",
        overview: "Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission gone wrong.",
        poster_path: "https://image.tmdb.org/t/p/w500/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
        media_type: "movie",
        genre_ids: [28, 12, 53],
        vote_average: 7.5,
        release_date: "2018-07-27"
    },
    
    // Sci-Fi & Fantasy
    {
        id: 6,
        title: "Interstellar",
        overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        media_type: "movie",
        genre_ids: [12, 18, 878],
        vote_average: 8.6,
        release_date: "2014-11-07"
    },
    {
        id: 7,
        title: "The Matrix",
        overview: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
        poster_path: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        media_type: "movie",
        genre_ids: [28, 878, 53],
        vote_average: 8.7,
        release_date: "1999-03-31"
    },
    {
        id: 8,
        title: "Blade Runner 2049",
        overview: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, who's been missing for thirty years.",
        poster_path: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkewjvJ20pblXKpuam.jpg",
        media_type: "movie",
        genre_ids: [878, 18, 80],
        vote_average: 7.5,
        release_date: "2017-10-06"
    },
    {
        id: 9,
        title: "Arrival",
        overview: "A linguist is recruited by the military to assist in translating alien communications.",
        poster_path: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr5YmxKl2M9Wp9zog.jpg",
        media_type: "movie",
        genre_ids: [878, 18, 53],
        vote_average: 7.9,
        release_date: "2016-11-11"
    },
    {
        id: 10,
        title: "Dune",
        overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
        poster_path: "https://image.tmdb.org/t/p/w500/6Ab8VHqp7WCi5BtA0vRCz8upyHh.jpg",
        media_type: "movie",
        genre_ids: [878, 12, 18],
        vote_average: 7.8,
        release_date: "2021-10-22"
    },
    
    // Drama & Thriller
    {
        id: 11,
        title: "Pulp Fiction",
        overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        poster_path: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        media_type: "movie",
        genre_ids: [53, 80],
        vote_average: 8.9,
        release_date: "1994-10-14"
    },
    {
        id: 12,
        title: "Fight Club",
        overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
        poster_path: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        media_type: "movie",
        genre_ids: [18, 53],
        vote_average: 8.8,
        release_date: "1999-10-15"
    },
    {
        id: 13,
        title: "The Silence of the Lambs",
        overview: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
        poster_path: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
        media_type: "movie",
        genre_ids: [53, 80, 27],
        vote_average: 8.6,
        release_date: "1991-02-14"
    },
    {
        id: 14,
        title: "Gone Girl",
        overview: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
        poster_path: "https://image.tmdb.org/t/p/w500/gdiLTofgdRB0uEdbXQ0lbWyW2ER.jpg",
        media_type: "movie",
        genre_ids: [18, 53, 80],
        vote_average: 7.8,
        release_date: "2014-10-03"
    },
    {
        id: 15,
        title: "Parasite",
        overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
        poster_path: "https://image.tmdb.org/t/p/w500/7uTT1cOPD7Bk8OQ28i6mBsuuFzB.jpg",
        media_type: "movie",
        genre_ids: [18, 53, 35],
        vote_average: 8.6,
        release_date: "2019-10-25"
    },
    
    // Comedy & Romance
    {
        id: 16,
        title: "The Grand Budapest Hotel",
        overview: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
        poster_path: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrOc.jpg",
        media_type: "movie",
        genre_ids: [35, 18, 10749],
        vote_average: 8.1,
        release_date: "2014-03-07"
    },
    {
        id: 17,
        title: "La La Land",
        overview: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
        poster_path: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
        media_type: "movie",
        genre_ids: [35, 18, 10749, 10402],
        vote_average: 7.9,
        release_date: "2016-12-09"
    },
    {
        id: 18,
        title: "The Big Lebowski",
        overview: "Jeff 'The Dude' Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.",
        poster_path: "https://image.tmdb.org/t/p/w500/ruQMVzW9wM2bxDsuB2qrpyjqoO.jpg",
        media_type: "movie",
        genre_ids: [35, 80, 53],
        vote_average: 8.1,
        release_date: "1998-03-06"
    },
    {
        id: 19,
        title: "Deadpool",
        overview: "The origin story of former Special Forces operative turned mercenary Wade Wilson, who, after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool.",
        poster_path: "https://image.tmdb.org/t/p/w500/9E2y5Q9W3emFp5Qm2vojsNDIrq1.jpg",
        media_type: "movie",
        genre_ids: [28, 12, 35],
        vote_average: 7.6,
        release_date: "2016-02-12"
    },
    
    // Horror & Mystery
    {
        id: 20,
        title: "Get Out",
        overview: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
        poster_path: "https://image.tmdb.org/t/p/w500/1SwAVYpuLj8KsHxmyTF6Zgx1aE.jpg",
        media_type: "movie",
        genre_ids: [27, 53, 9648],
        vote_average: 7.7,
        release_date: "2017-02-24"
    },
    {
        id: 21,
        title: "Hereditary",
        overview: "A grieving family is haunted by tragic and disturbing occurrences.",
        poster_path: "https://image.tmdb.org/t/p/w500/p2fRZzxlaLNoDk9yX2ZqQjJq3X8.jpg",
        media_type: "movie",
        genre_ids: [27, 53, 9648],
        vote_average: 7.3,
        release_date: "2018-06-08"
    },
    {
        id: 22,
        title: "The Shining",
        overview: "A family heads to an isolated hotel for the winter where an evil and spiritual presence influences the father into violence, while his psychic son sees horrific forebodings from the past and of the future.",
        poster_path: "https://image.tmdb.org/t/p/w500/9fgh3Ns1nxRqFtoq7q3hft7Y9Z8.jpg",
        media_type: "movie",
        genre_ids: [27, 53],
        vote_average: 8.4,
        release_date: "1980-05-23"
    },
    {
        id: 23,
        title: "A Quiet Place",
        overview: "A family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
        poster_path: "https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklPvaZtOjqkE9.jpg",
        media_type: "movie",
        genre_ids: [27, 18, 53],
        vote_average: 7.5,
        release_date: "2018-04-06"
    },
    
    // Animation & Family
    {
        id: 24,
        title: "Spirited Away",
        overview: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
        poster_path: "https://image.tmdb.org/t/p/w500/39wmItIWwg5MkBHnCWb9Ug9kOYg.jpg",
        media_type: "movie",
        genre_ids: [16, 12, 14, 10751],
        vote_average: 8.6,
        release_date: "2001-07-20"
    },
    {
        id: 25,
        title: "Spider-Man: Into the Spider-Verse",
        overview: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
        poster_path: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
        media_type: "movie",
        genre_ids: [16, 28, 12, 878],
        vote_average: 8.4,
        release_date: "2018-12-14"
    },
    {
        id: 26,
        title: "Coco",
        overview: "Despite his family's baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz.",
        poster_path: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVpOiL9qoJ7gwz9mzC.jpg",
        media_type: "movie",
        genre_ids: [16, 12, 14, 10751],
        vote_average: 8.4,
        release_date: "2017-10-27"
    },
    
    // Documentary & War
    {
        id: 27,
        title: "The Act of Killing",
        overview: "Filmmakers examine the Indonesian killings of 1965-1966 through the eyes of the perpetrators.",
        poster_path: "https://image.tmdb.org/t/p/w500/8Gxv8gDfc7uTGUv5qcrA9zKt3Xw.jpg",
        media_type: "movie",
        genre_ids: [99, 10752],
        vote_average: 8.2,
        release_date: "2012-08-31"
    },
    {
        id: 28,
        title: "Saving Private Ryan",
        overview: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
        poster_path: "https://image.tmdb.org/t/p/w500/uqx37cS8cpHg6UYMjjYYVN62rvu.jpg",
        media_type: "movie",
        genre_ids: [18, 36, 10752],
        vote_average: 8.6,
        release_date: "1998-07-24"
    },
    {
        id: 29,
        title: "1917",
        overview: "At the height of the First World War, two young British soldiers must cross enemy territory and deliver a message that will stop a deadly attack on hundreds of soldiers.",
        poster_path: "https://image.tmdb.org/t/p/w500/AuGiPiGMYMkSIosDVQ0yWxGA0TN.jpg",
        media_type: "movie",
        genre_ids: [18, 36, 10752],
        vote_average: 7.9,
        release_date: "2019-12-25"
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

// Genre-based AI recommendations
const genreRecommendations = {
    "Action": "If you love high-octane action movies, you'll adore these adrenaline-pumping titles! They all deliver the same level of intense stunts, explosive sequences, and heart-pounding excitement that keeps you on the edge of your seat.",
    "Sci-Fi": "For fans of mind-bending science fiction, these films offer the same level of intellectual stimulation and futuristic wonder. They explore complex concepts while delivering stunning visuals and thought-provoking narratives.",
    "Thriller": "If psychological thrillers are your jam, these selections will keep you guessing until the very end. They masterfully build tension and suspense while delivering the same level of mental engagement you crave.",
    "Comedy": "For lovers of smart, witty humor, these films deliver the same level of clever comedy and laugh-out-loud moments. They blend humor with heart in ways that will keep you entertained throughout.",
    "Horror": "If you enjoy spine-chilling horror, these films will provide the same level of atmospheric dread and psychological terror. They masterfully build tension and deliver genuine scares.",
    "Drama": "For fans of compelling character-driven stories, these films offer the same depth of emotional storytelling and powerful performances that resonate with your love for meaningful cinema.",
    "Romance": "If romantic stories touch your heart, these films deliver the same level of emotional connection and beautiful love stories that will make you believe in the power of love.",
    "Animation": "For animation enthusiasts, these films showcase the same level of artistic creativity and storytelling magic. They prove that animation can tell stories as compelling as any live-action film."
};

// Default AI recommendation
const demoAIRecommendation = "Based on your love for 'Inception' with its mind-bending Sci-Fi and Thriller elements, you'll absolutely adore these similar titles! They all share Christopher Nolan's signature style of complex narratives, stunning visuals, and thought-provoking concepts that challenge your perception of reality. From the psychological depth of 'The Dark Knight' to the cosmic exploration in 'Interstellar', each film offers the same level of intellectual engagement and cinematic excellence that made 'Inception' so compelling.";

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { demoMovies, demoGenres, demoAIRecommendation, genreRecommendations };
} 