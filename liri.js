require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var logFile = 'log.txt';
var command = '$ node liri.js'

// log command issued
if (process.argv[2]) {
  command += ' ' + process.argv[2];
}

if (process.argv[3]) {
  command += " '" + process.argv[3] + "'";
}

fs.appendFile(logFile, '\n' + command + '\n', function(error) {
  if (error) {
    console.log(error);
  }
});

// determine what user wants
switch(process.argv[2]) {
  case 'my-tweets':
    // returns info about last 20 tweets (@brian_cwru)
    listTweets();
    break;

  case 'spotify-this-song':
    // returns info about song requested from spotify
    spotifySong(process.argv[3]);
    break;

  case 'movie-this':
    // returns info about movie requested from omdb api
    searchOMDB(process.argv[3]);
    break;

  case 'do-what-it-says':

    // takes the text inside of random.txt and then uses it to call a command
    fs.readFile('random.txt', 'utf8', function(error, data) {

      if (!error) {
        var dataArr = data.split(',');

        fs.appendFile(logFile, '\nrandom.txt contents: ' + data, function(error) {
          if (error) {
            console.log(error);
          }
        });

        switch(dataArr[0]) {
          case 'my-tweets':
            listTweets();
            break;

          case 'spotify-this-song':
            spotifySong(dataArr[1]);
            break;

          case 'movie-this':
            searchOMDB(dataArr[1]);
            break;
        }
      }
      else {
        logEvent(error);
      }

    });

    break;
}

function listTweets() {
  var Twitter = require('twitter');

  var client = new Twitter(keys.twitter);

  var params = {
    user_id: '942099628530520064',
    trim_user: true,
    count: 20
  };


  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error && response.statusCode === 200) {
      logEvent('\nDisplaying your (@brian_cwru) last 20 tweets:\n');

      for (var i = 0; i < tweets.length; i++) {
        logEvent('Created Date: ' + tweets[i].created_at);
        logEvent('Text: ' + tweets[i].text + '\n');
      }
    }
    else {
      logEvent('error: ' + error); // Print the error if one occurred
      logEvent('statusCode: ' + response.statusCode);
      logEvent('statusMessage: ' + response.statusMessage);
    }
  });
}

function spotifySong(song) {
  // returning top 10 results from spotify track search
  // defaults song to 'the sign' by ace of base

  if (!song){
    song = 'the sign';
  }

  var Spotify = require('node-spotify-api');

  var spotify = new Spotify(keys.spotify);

  var params = {
    type: 'track',
    query: song,
    limit: 10
  };

  spotify.search(params, function(error, data) {
    if (!error) {

      var tracks = data.tracks.items;

      logEvent('\nDisplaying top 10 results from Spotify:\n');

      for (var i = 0; i < tracks.length; i++) {

        var artists = tracks[i].artists;
        var artistsDisplay;

        for (var j = 0; j < artists.length; j++) {
          if (j === 0){
            artistsDisplay = artists[j].name;
          }
          else {
            artistsDisplay += ', ' + artists[j].name;
          }
        }

        logEvent('Artist(s): ' + artistsDisplay);
        logEvent('Album: ' + tracks[i].album.name);
        logEvent('Song: ' + tracks[i].name);

        if (tracks[i].preview_url) {
          logEvent('Preview link: ' + tracks[i].preview_url + '\n');
        }
        else {
          logEvent('Preview link: n/a\n');
        }


      }

    }
    else {
      logEvent(error);
    }
  });
}

function searchOMDB(movie) {

  // returning info about movie requested from omdb api
  // defaults to 'Mr. Nobody'

  if (!movie){
    movie = 'Mr. Nobody';
  }

  var request = require('request');

  var queryurl = 'http://www.omdbapi.com/';
  queryurl += '?' + 'apikey=' + 'trilogy';
  queryurl += '&' + 't=' + movie;

  request(queryurl, function (error, response, body) {
    if (!error && response.statusCode === 200) {

      movieResponse = JSON.parse(body);

      logEvent('\nDisplaying search results from OMDb:\n');
      logEvent('Title: ' + movieResponse.Title);
      logEvent('Year: ' + movieResponse.Year);
      logEvent('IMDb Rating: ' + movieResponse.imdbRating);

      // loop through ratings, see if we can find one from rotten tomatoes

      var ratings = movieResponse.Ratings;

      for (var i = 0; i < ratings.length; i++) {
        if (ratings[i].Source === 'Rotten Tomatoes') {
          logEvent('Rotten Tomatoes Rating: ' + ratings[i].Value);
        }
      }

      logEvent('Country: ' + movieResponse.Country);
      logEvent('Language: ' + movieResponse.Language);
      logEvent('Plot: ' + movieResponse.Plot);
      logEvent('Actors: ' + movieResponse.Actors);
    }
    else {
      logEvent('error: ' + error); // Print the error if one occurred
      logEvent('statusCode: ' + response.statusCode);
      logEvent('statusMessage: ' + response.statusMessage);
    }
  });
}

function logEvent(log) {

  // logs event to console as well as log.txt

  console.log(log);
  fs.appendFile(logFile, log + '\n', function(error) {
    if (error) {
      console.log(error);
    }
  });
}
