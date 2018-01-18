# LIRI Bot

Created for a coding bootcamp assignment, LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a *Language* Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

### Before You Begin

Please run `npm install` as the app makes use of [twitter](https://www.npmjs.com/package/twitter), [node-spotify-api](https://www.npmjs.com/package/node-spotify-api), [request](https://www.npmjs.com/package/request), and [dotenv](https://www.npmjs.com/package/dotenv) npm packages.

This program does expect a `.env` file the same directory with the following contents:
```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
```

### Commands

- `node liri.js my-tweets`
  
  This will show my (@brian_cwru) last 20 tweets and when they were created in your terminal/bash window.

- `node liri.js spotify-this-song '<song name here>'`

  This will return the top 10 results from a spotify track search and show the following information about each song in your terminal/bash window
  
  - Artist(s)
  - Album
  - Song
  - Spotify preview link

- `node liri.js movie-this '<movie name here>'`

  If a movie is found, this will output the following information from OMDb to your terminal/bash window:

  - Title
  - Year
  - IMDB Rating
  - Rotten Tomatoes Rating
  - Country where the movie was produced.
  - Language
  - Plot
  - Actors

- `node liri.js do-what-it-says`

  LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands