var Input = require("./liri");
var inquirer = require("inquirer");
var input = new Input();

//import files


//function starts app
var run = function () {
    // inquirer to grab user input
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to search a movie, song, or a band/artist? or click on 'do-what-it-says' to get a random search from a .txt file' ",
            choices: ["movie", "song", "band/artist", "do-what-it-says"],
            name: "question"
        },
    ]).then(function (answer) {
        if (answer.question === "movie") {
            movie();
        }

        if (answer.question === "song") {
            song();
        }

        if (answer.question === "band/artist") {
            band();
        }

        if (answer.question === "do-what-it-says") {
            doIt();
        }
    })
};

//function for band/artist
var band = function () {
    inquirer.prompt([
        {
            type: "input",
            name: "answer",
            message: "Please type in 'concert-this' ",
        }
    ]).then(function (answer) {
        if (answer.answer === "concert-this") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "answer",
                    message: "Please type in the band/artist you would like to search for.",
                }
            ]).then(function (answer) {
                var userSearch = answer.answer;
                input.concertThis(userSearch)
            })
        }
        else {
            console.log("I'm sorry you did not type 'concert-this' ")
        }
    })
};

//function for song
var song = function () {
    inquirer.prompt([
        {
            type: "input",
            name: "answer",
            message: "Please type in 'spotify-this-song' ",
        }
    ]).then(function (answer) {

        if (answer.answer === "spotify-this-song") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "answer",
                    message: "Please type in a song you would like to search.",
                }
            ]).then(function (answer) {

                var userSearch = answer.answer;
                if (userSearch) {
                    input.spotifySong(userSearch)
                }

                else if (!userSearch) {
                    userSearch = "We're Not Gonna Take It";
                    input.spotifySong(userSearch)
                }
            })
        }
        else {
            console.log("I'm sorry you did not type 'spotify-this-song'")
        }
    })
};

//function for  movie
var movie = function () {
    inquirer.prompt([
        {
            type: "input",
            name: "answer",
            message: "Please type in 'movie-this' "
        }
    ]).then(function (answer) {

        if (answer.answer === "movie-this") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "answer",
                    message: "Please type in the movie you would like to search"
                }
            ]).then(function (answer) {
                var userSearch = answer.answer;
                if (userSearch) {
                    input.movieThis(userSearch)
                }
                else if (!userSearch) {
                    userSearch = "Star Wars"
                    input.movieThis(userSearch)
                }
            })
        }
        else {
            console.log("I'm sorry you did not type movie-this")
        }
    })
};


//function for do what it says 
var doIt = function () {
    inquirer.prompt([
        {
            type: "input",
            name: "answer",
            message: "Please type in 'do-what-it-says' "
        }
    ]).then(function (answer) {
        if (answer.answer === "do-what-it-says") {
            var userSearch = answer.answer
            input.doThis(userSearch)
        }

        else {
            console.log("I'm sorry you did not type 'do-what-it-says' ")
        }
    })
};


//calls the beginning function
run();

