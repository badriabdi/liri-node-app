





    require("dotenv").config();
    var keys = require("./keys");
    var fs = require("fs");
    var axios = require("axios");
    var Spotify = require("node-spotify-api");
    var moment = require("moment");

    var userInput = process.argv;
    var userCatergory = userInput[2];
    var userSearch = userInput.slice(3).join(" ");

    var searchedTerm;

    // USE THIS WITH INSPECT
    debugger
    var spotify = new Spotify(keys.spotify);


    function spotifyThis() {
      spotify
        .search({ type: "track", query: userSearch, limit: 1 })
        .then(function (response) {
          searchedTerm =
            "Results found for (" + userSearch + ") within Spotify\n\n";
          var songArtist =
            "Artist(s): " + response.tracks.items[0].album.artists[0].name;
          var songName = "\nSong: " + '"' + response.tracks.items[0].name + '"';
          var songAlbum = "\nAlbum: " + response.tracks.items[0].album.name;
          var songPreview =
            "\nPreview: " + response.tracks.items[0].external_urls.spotify + "\n";

          console.log("\nCategory: " + userCatergory);
          console.log("Finding song information for (" + userSearch + ") ...\n");
          console.log(songArtist, songName, songAlbum, songPreview);
        })
        .catch(function (error) {
          console.log("Error Occured: " + error);
        });
    }

    function movieThis() {
      var URL = "https://www.omdbapi.com/?t=" + userSearch + "&tomatoes=true&plot=short&apikey=trilogy"
      axios
        .get(URL)
        .then(function (response) {
          

    console.log(+ "Movie Title:" + response.data.Title);
    console.log("Movie Release Date:" + response.data.Released);
    console.log("IMDB Rating:" + response.data.imdbRating);
    console.log("Rotten Tomatoes:" + response.data.tomatoRating);
    console.log("Country movie was produced in:" + response.data.Country);
    console.log("Language:" + response.data.Language);
    console.log("Movie Actors:" + response.data.Actors + '');
    console.log("Movie Plot:" + response.data.Plot + '');

        })
        .catch(function (error) {
          console.log("error Occured: " + error + "\n");
        });
    }

    function concertThis() {

     var qeueryString = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp";

      axios
        .get(qeueryString)
        .then(function(response) {
          //console.log(response);
          
          for(var i =0; i < response.data.length; ++i){



            console.log("Venue: " + response.data[i].venue.name);
            console.log( "Location: " + response.data[i].venue.city);
            
            
            var dateArr = response.data[i].datetime.split("T");
            var date = dateArr[0].split('-');
            console.log("Date of the event:" + date[1] + '-' + date[2] + '-' + date[0]);
  
          }
         
         
            

        })
        .catch(function(error) {
          console.log("error Occured: " + error + "\n");
        });
    }


    function executeThis() {
      fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
          return console.log("Error Occured: " + error + "\n");
        }

        var txtArray = data.split(",");
        userCatergory = txtArray[0];
        userSearch = txtArray[1];

        if (userCatergory === "spotify-this-song") {
          spotifyThis();
        } else if (userCatergory === "movie-this") {
          movieThis();
        } else if (userCatergory === "concert-this") {
          concertThis();
        }
      });
    }

    switch (userCatergory) {

      //
      case "spotify-this-song":

        if (userSearch === "") {
          userSearch = "Beyonce";
        }
        spotifyThis();
        break;
        //
      case "concert-this":

        if (userSearch === "") {
          userSearch = "OMG";
        }
        concertThis();
        break;

      case "movie-this":

        if (userSearch === "") {
          userSearch = "Titanic";
        }
        movieThis();
        break;

      case "do-what-it-says":
        executeThis();
        break;

      default:
        console.log(
          "\nLIRI: \nI'm not sure I quite understand what you are asking for. Please try again.\n"
        );
    }