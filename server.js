const express = require('express');
const cors = require('cors');
const axios = require('axios');
const OpenAI = require('openai');
const config = require('./config');

const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

// TMDB API configuration
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_ACCESS_TOKEN = config.TMDB_ACCESS_TOKEN;

// Search for movies/shows
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        query: query,
        include_adult: false,
        language: 'en-US',
        page: 1
      }
    });

    // Filter results to only include movies and TV shows
    const filteredResults = response.data.results.filter(item => 
      (item.media_type === 'movie' || item.media_type === 'tv') && 
      item.poster_path
    ).slice(0, 5); // Limit to 5 results

    if (filteredResults.length === 0) {
      return res.status(404).json({ error: 'No movies or shows found' });
    }

    res.json({ results: filteredResults });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search for movies/shows' });
  }
});

// Get movie/show details
app.get('/api/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.query; // 'movie' or 'tv'

    if (!type || !['movie', 'tv'].includes(type)) {
      return res.status(400).json({ error: 'Valid media type is required' });
    }

    const response = await axios.get(`${TMDB_BASE_URL}/${type}/${id}`, {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        language: 'en-US',
        append_to_response: 'credits,similar'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Movie details error:', error);
    res.status(500).json({ error: 'Failed to fetch movie/show details' });
  }
});

// Get similar movies/shows
app.get('/api/similar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.query; // 'movie' or 'tv'

    if (!type || !['movie', 'tv'].includes(type)) {
      return res.status(400).json({ error: 'Valid media type is required' });
    }

    const response = await axios.get(`${TMDB_BASE_URL}/${type}/${id}/similar`, {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        language: 'en-US',
        page: 1
      }
    });

    // Filter results to only include items with posters
    const filteredResults = response.data.results.filter(item => 
      item.poster_path
    ).slice(0, 10); // Limit to 10 results

    res.json({ results: filteredResults });
  } catch (error) {
    console.error('Similar movies error:', error);
    res.status(500).json({ error: 'Failed to fetch similar movies/shows' });
  }
});

// Get random movie recommendation
app.get('/api/random', async (req, res) => {
  try {
    // Get popular movies
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        language: 'en-US',
        page: 1
      }
    });

    // Pick a random movie from the first 20 results
    const randomIndex = Math.floor(Math.random() * Math.min(20, response.data.results.length));
    const randomMovie = response.data.results[randomIndex];

    res.json({ movie: randomMovie });
  } catch (error) {
    console.error('Random movie error:', error);
    res.status(500).json({ error: 'Failed to get random movie' });
  }
});

// Generate AI recommendation
app.post('/api/recommend', async (req, res) => {
  try {
    const { movieTitle, movieOverview, genres, similarMovies } = req.body;

    if (!config.OPENAI_API_KEY || config.OPENAI_API_KEY === 'your_openai_api_key_here') {
      return res.status(500).json({ error: 'OpenAI API key not configured. Please update config.js with your OpenAI API key.' });
    }

    const prompt = `Based on the movie "${movieTitle}" (${movieOverview}) with genres: ${genres.join(', ')}, here are some similar movies: ${similarMovies.map(m => m.title).join(', ')}. 

Please provide a brief, engaging recommendation reason (2-3 sentences) for why someone who liked "${movieTitle}" would enjoy these similar movies. Focus on the thematic elements, style, or emotional appeal that connects them.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable movie critic who provides concise, engaging movie recommendations. Keep responses brief and focused on what makes movies appealing to viewers."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.7
    });

    const recommendation = completion.choices[0].message.content;
    res.json({ recommendation });
  } catch (error) {
    console.error('AI recommendation error:', error);
    res.status(500).json({ error: 'Failed to generate AI recommendation' });
  }
});

// Get genres
app.get('/api/genres', async (req, res) => {
  try {
    const [movieGenres, tvGenres] = await Promise.all([
      axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
        headers: {
          'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        params: { language: 'en-US' }
      }),
      axios.get(`${TMDB_BASE_URL}/genre/tv/list`, {
        headers: {
          'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        params: { language: 'en-US' }
      })
    ]);

    const allGenres = [...movieGenres.data.genres, ...tvGenres.data.genres];
    const uniqueGenres = allGenres.filter((genre, index, self) => 
      index === self.findIndex(g => g.id === genre.id)
    );

    res.json({ genres: uniqueGenres });
  } catch (error) {
    console.error('Genres error:', error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`🚀 AI Movie Recommender server running on http://localhost:${PORT}`);
  console.log('📺 Using TMDB API for movie data');
  console.log('🤖 Using OpenAI for AI recommendations');
}); 