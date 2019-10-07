require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var moment = require('moment')

var axios = require("axios");
var fs = require("fs");
var content;


//constructor function
var Input = function () {

    var divider = "\n------------------------------------------------------------\n\n"

    //axios call to bands in town
    this.concertThis = function (band) {
        var URL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp&date=upcoming";
        axios.get(URL).then(function (response) {
            var results = response.data[0];
            var date = moment(results.datetime).format("MM/DD/YYYY")
            var showData = [
                "Name of Venue: " + results.venue.name,
                "Venue Location: " + results.venue.city + ", " + results.venue.country,
                "Date of Event: " + date
            ].join("\n\n");
            fs.appendFile("log.txt", showData + divider, function (err) {
                if (err) throw err;
            });
            console.log(showData);
        });

    };
    
    //searches omdb
    this.movieThis = function (movie) {
        var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;
        axios.get(URL).then(function (response) {
            var results = response.data;

            var showData = [
                "Title: " + results.Title,
                "Year: " + results.Year,
                "Rotten Tomatoes Rating: " + results.Ratings[1].Value,
                "IMDB Rating: " + results.Ratings[0].Value,
                "Country: " + results.Country,
                "Language: " + results.Country,
                "Actors: " + results.Actors,
                "Plot: " + results.Plot,
               

            ].join("\n\n");

            fs.appendFile("log.txt", showData + divider, function (err) {
                if (err) throw err;
            });
            console.log(showData);
        });
    }

    //spotify api call 
    this.spotifySong = function (song) {
        spotify
            .search({ type: 'track', query: song })
            .then(function (response) {
                var results = response.tracks.items[0];

                var showData = [
                    "Artist: " + results.artists[0].name,
                    "Song Title : " + results.name,
                    "Preview Link From Spotify: " + results.preview_url,
                    "Album : " + results.album.name
                ].join("\n\n")
                fs.appendFile("log.txt", showData + divider, function (err) {
                    if (err) throw err;
                });
                console.log(showData);

            })
            .catch(function (err) {
                console.log(err);
            });
    }


    //takes information from the 'log.txt' file and uses that to search for movie, song, or band information 
    this.doThis = function () {
        fs.readFile("./random.txt", 'utf8', function read(err, data) {
            if (err) {
                throw err;
            }
            content = data;
            checkStatus();
        })

    }
}

var checkStatus = function () {

    var input = new Input();

    if (content.includes("spotify-this-song")) {
        var command = content.split(",")[0];
        var specifics = content.split(",")[1];

        if (command === "spotify-this-song") {
            if (specifics) {
                input.spotifySong(specifics)
            }

            else if (!specifics) {
                specifics = "The Sign";
                input.spotifySong(specifics)
            }
        };
    }

    if (content.includes("concert-this")) {
        var command = content.split(",")[0];
        var specifics = content.split(",")[1];

        if (command === "concert-this") {
            input.concertThis(specifics)
        };
    }

    if (content.includes("movie-this")) {
        var command = content.split(",")[0];
        var specifics = content.split(",")[1];

        if (command === "movie-this") {
            if (specifics) {
                input.movieThis(specifics)
            }

            else if (!specifics) {
                specifics = "Mr. Nobody"
                input.movieThis(specifics)
            }
        };
    }
}

//export the constructor input
module.exports = Input;

