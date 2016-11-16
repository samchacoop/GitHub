var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(__dirname)); 
app.use(express.static("http://www.w3schools.com/lib/w3.css")); 
app.use(express.static("http://www.w3schools.com/lib/w3.css")); 
app.use(express.static("http://www.w3schools.com/lib/w3-theme-black.css")); 
app.use(express.static("https://code.jquery.com/jquery-2.2.0.min.js")); 
app.use(express.static("https://github.com/douglascrockford/JSON-js/blob/master/json2.js")); 


app.use(urlencodedParser);

// Define some demo data
var concertList = [];
concertList.push({artist: "Whitney", venue: "Club Dada", date: "01/02/03", rating: "10"});
concertList.push({artist: "Angel Olsen", venue: "Three Links", date: "02/03/04", rating: "9"});

var userInfo = [];
var reviewsList = [];
reviewsList.push({review:"Text", reviewId:"0"})

//localStorage.setItem('myStorage', JSON.stringify(concertList));


// Render a list of concerts
app.get('/home', function(req,res){
	res.render("sample.ejs", {userInformation : userInfo});
});

app.get('/concerts', function(req, res){
  res.render("concertList.ejs", {concerts: concertList});
});

app.get('/profile', function(req, res){
  res.render("profile.ejs", {concerts: concertList,userInformation : userInfo});
});

// Render an individual concert
app.get('/concerts/:id', function(req, res){
  var index = parseInt(req.params.id) - 1;
  var concertData = concertList[index]; 
  res.render("concertView.ejs", {concerts: concertData});
});

// Search form (GET)
app.get('/reviews', function(req, res){
	res.render("reviews.ejs",{concerts : concertList, reviews : reviewsList, userInformation : userInfo})	
});

app.get('/followers', function(req, res){
	res.render("followers.ejs",{concerts : concertList, reviews : reviewsList, userInformation : userInfo})	
});

// Search form (POST)
app.post('/search', urlencodedParser, function(req, res){
  var searchText = req.body.searchText;
  res.send("<p>Your search for <b>" + searchText + "</b> returned no results</p>");
});

app.post('/addConcert', urlencodedParser, function(req, res){
	var new_artist = req.body.artist
	  	new_venue = req.body.venue	
	  	new_date = req.body.date
	  	new_rating = req.body.rating;

	  	concertList.push({artist: new_artist, venue: new_venue, date: new_date, rating: new_rating});
	  	console.log(concertList);
	  	res.render("concertList.ejs",{concerts : concertList});

 });

app.post('/removeConcert', urlencodedParser, function(req, res){
	var new_removeIndex = req.body.removeIndex;
	
	  	concertList.splice(new_removeIndex, 1);
	  	console.log(concertList);
	  	res.render("concertList.ejs",{concerts : concertList});

 });

app.post('/signUp',urlencodedParser, function(req,res){
	var USER_FIRST_NAME = req.body.first_name
	  	USER_LAST_NAME = req.body.last_name;
	  	userInfo.push({first_name: USER_FIRST_NAME, last_name: USER_LAST_NAME});
	res.render("profile.ejs",{concerts : concertList, userInformation : userInfo});
});

app.post('/addReview', urlencodedParser, function(req, res){
	var new_ReviewID = req.body.reviewId
		new_ReviewText = req.body.reviewtext;
		reviewsList.push({review: new_ReviewText, reviewId: new_ReviewID});
		console.log(reviewsList);
	res.render("reviews.ejs",{concerts : concertList, reviews : reviewsList, userInformation : userInfo});	
});

// Routes for everything else
app.get('*', function(req, res){
  res.send('Hello World');
});


// Fire it up!
app.listen(3000);
console.log('Listening on port 3000');