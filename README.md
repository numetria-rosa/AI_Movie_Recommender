# 🎬 AI Movie Recommender

A dark-themed, modern web application that provides AI-powered movie and TV show recommendations using the TMDB API and OpenAI GPT.

## ✨ Features

- **Smart Search**: Search for any movie or TV show by name
- **AI Recommendations**: Get personalized reasoning for why you'll love similar titles
- **Beautiful UI**: Dark theme with modern design and smooth animations
- **Random Pick**: Discover new movies with the random movie feature
- **Demo Mode**: Test the app without API keys using sample data
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Hover Effects**: Interactive movie cards with detailed information
- **Error Handling**: Graceful error handling with user-friendly messages

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API access token
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-movie-recommender
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up configuration**
   
   Edit `config.js` and add your API keys:
   ```javascript
   // TMDB API Configuration
   TMDB_ACCESS_TOKEN: 'your_tmdb_api_key_here',
   
   // OpenAI API Configuration
   OPENAI_API_KEY: 'your_openai_api_key_here',
   
   // Server Configuration
   PORT: 3000
   ```
   
   **Important**: You need to get your own API keys from TMDB and OpenAI.

4. **Start the application**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Test the API connection**
   
   Before using the app, make sure your API keys are working:
   - The app will show an error if the TMDB API key is invalid
   - Check the browser console for any API errors
   
6. **Test the app**
   
   - **Demo Mode**: Click "Demo Mode" to test the UI without API keys
   - **Full Mode**: Add your API keys to `config.js` for full functionality
   
7. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🔑 API Keys Setup

### TMDB API

1. Go to [TMDB](https://www.themoviedb.org/) and create an account
2. Navigate to Settings → API in your account
3. Request an API key (v3 auth)
4. Copy your API key and replace the placeholder in `config.js`
5. **Note**: The access token in the config file may be expired. You'll need to generate a fresh one from your TMDB account.

### OpenAI API

1. Go to [OpenAI](https://platform.openai.com/) and create an account
2. Navigate to API Keys section
3. Create a new API key
4. Add it to your `.env` file

## 🎯 How It Works

1. **Search**: Enter a movie or show you love
2. **Analysis**: The app fetches movie details and finds similar titles
3. **AI Insight**: OpenAI generates personalized recommendation reasoning
4. **Results**: View your selected movie and AI-curated recommendations

## 🛠️ Technical Stack

- **Backend**: Node.js + Express
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **APIs**: TMDB (movie data), OpenAI (AI recommendations)
- **Styling**: Modern CSS with gradients and animations
- **Responsiveness**: Mobile-first design approach

## 📁 Project Structure

```
ai-movie-recommender/
├── public/                 # Frontend files
│   ├── index.html         # Main HTML file
│   ├── styles.css         # Dark theme CSS
│   └── script.js          # Frontend JavaScript
├── server.js              # Express server
├── config.js              # Configuration file with API keys
├── package.json           # Dependencies
└── README.md              # This file
```

## 🔧 API Endpoints

- `GET /api/search?query=<movie_name>` - Search for movies/shows
- `GET /api/movie/:id?type=<movie|tv>` - Get movie/show details
- `GET /api/similar/:id?type=<movie|tv>` - Get similar movies/shows
- `GET /api/random` - Get a random popular movie
- `POST /api/recommend` - Generate AI recommendation
- `GET /api/genres` - Get available genres

## 🎨 Customization

### Colors
The app uses a dark theme with purple-blue gradients. You can customize colors in `public/styles.css`:

```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Background gradient */
background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
```

### Styling
- Modify `public/styles.css` for visual changes
- Update `public/script.js` for functionality changes
- Edit `server.js` for backend modifications

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Configuration
Make sure to update these in `config.js` for production:
- `TMDB_ACCESS_TOKEN`
- `OPENAI_API_KEY`
- `PORT` (optional, defaults to 3000)

## 🐛 Troubleshooting

### Common Issues

1. **"TMDB API key not configured"**
   - Check your `config.js` file has the correct TMDB access token
   - Verify the token is valid and has proper permissions

2. **"OpenAI API key not configured"**
   - Ensure your OpenAI API key is set in `config.js`
   - Check your OpenAI account has available credits

3. **"No movies found"**
   - Try different search terms
   - Check your internet connection
   - Verify TMDB API is accessible

4. **Port already in use**
   - Change the PORT in `.env` file
   - Or kill the process using the current port

### Debug Mode

Enable debug logging by adding to your `.env`:
```env
DEBUG=*
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie database API
- [OpenAI](https://openai.com/) for AI-powered recommendations
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Ensure all API keys are properly configured
4. Verify your Node.js version is compatible

---

**Happy movie hunting! 🎬✨** 