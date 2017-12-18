var keys = require("./keys.js");

switch(process.argv[2]) {
    case 'my-tweets':
        
    	var Twitter = require('twitter');

    	var client = new Twitter(keys.twitterKeys);

    	var params = {
    		user_id: '942099628530520064',
    		trim_user: true,
    		count: 20
    	};


    	client.get('statuses/user_timeline', params, function(error, tweets, response) {
    	  if (!error) {
    	  	console.log('\nDisplaying your (@brian_cwru) last 20 tweets:\n');

    	  	for (var i = 0; i < tweets.length; i++) {
    	    	console.log('Created Date: ' + tweets[i].created_at);
    	    	console.log('Text: ' + tweets[i].text + '\n');
    	  	}
    	  }
    	});

        break;

    case 'spotify-this-song':

        // defaults song to 'the sign' by ace of base
        var song = 'the sign';

        if (process.argv[3]){
            song = process.argv[3];
        }

        var Spotify = require('node-spotify-api');
 
        var spotify = new Spotify(keys.spotifyKeys);

        var params = {
            type: 'track',
            query: song,
            limit: 10
        };

        spotify.search(params, function(error, data) {
          if (!error) {

            var tracks = data.tracks.items;
            
            console.log('\nDisplaying top 10 results from Spotify:\n');

            for (var i = 0; i < tracks.length; i++) {
                //console.log(tracks[i]);

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

                console.log('Track #' + (i + 1) + ':');
                console.log('Artist(s): ' + artistsDisplay);
                console.log('Album: ' + tracks[i].album.name);
                console.log('Song: ' + tracks[i].name);

                if (tracks[i].preview_url) {
                    console.log('Preview link: ' + tracks[i].preview_url + '\n');    
                }
                else {
                    console.log('Preview link: n/a\n');
                }
                
                
            }

          }
        });

        break;

    case 'movie-this':

        // defaults movie to 'Mr. Nobody'
        var movie = 'Mr. Nobody';

        if (process.argv[3]){
            movie = process.argv[3];
        }

        var request = require('request');

        var queryurl = 'http://www.omdbapi.com/';
        queryurl += '?' + 'apikey=' + 'trilogy';
        queryurl += '&' + 't=' + movie;

        request(queryurl, function (error, response, body) {
          if (!error) {

            movieResponse = JSON.parse(body);

            console.log('\nDisplaying search results from OMDb:\n');
            console.log('Title: ' + movieResponse.Title);
            console.log('Year: ' + movieResponse.Year);
            console.log('IMDb Rating: ' + movieResponse.imdbRating);

            // loop through ratings, see if we can find one from rotten tomatoes

            var ratings = movieResponse.Ratings;

            for (var i = 0; i < ratings.length; i++) {
                if (ratings[i].Source === 'Rotten Tomatoes') {
                    console.log('Rotten Tomatoes Rating: ' + ratings[i].Value);
                }
            }

            console.log('Country: ' + movieResponse.Country);
            console.log('Language: ' + movieResponse.Language);
            console.log('Plot: ' + movieResponse.Plot);
            console.log('Actors: ' + movieResponse.Actors);
          }
        });

        break;

    case 'movie-this':

        // defaults movie to 'Mr. Nobody'
        var movie = 'Mr. Nobody';

        if (process.argv[3]){
            movie = process.argv[3];
        }

        var request = require('request');

        var queryurl = 'http://www.omdbapi.com/';
        queryurl += '?' + 'apikey=' + 'trilogy';
        queryurl += '&' + 't=' + movie;

        request(queryurl, function (error, response, body) {
          if (!error) {

            movieResponse = JSON.parse(body);

            console.log('\nDisplaying search results from OMDb:\n');
            console.log('Title: ' + movieResponse.Title);
            console.log('Year: ' + movieResponse.Year);
            console.log('IMDb Rating: ' + movieResponse.imdbRating);

            // loop through ratings, see if we can find one from rotten tomatoes

            var ratings = movieResponse.Ratings;

            for (var i = 0; i < ratings.length; i++) {
                if (ratings[i].Source === 'Rotten Tomatoes') {
                    console.log('Rotten Tomatoes Rating: ' + ratings[i].Value);
                }
            }

            console.log('Country: ' + movieResponse.Country);
            console.log('Language: ' + movieResponse.Language);
            console.log('Plot: ' + movieResponse.Plot);
            console.log('Actors: ' + movieResponse.Actors);
          }
        });

        break;
}



