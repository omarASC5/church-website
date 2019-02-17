const express = require("express"),
	  app     = express(),
	  keys    = require("./config/keys.js"),
	  ejs     = require("ejs");

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res, next) => {
	res.render("index");
	});
	
app.get("/about", (req, res, next) => {
	res.render("about");
});

app.get("/our-creed", (req, res, next) => {
	res.render("our-creed");
});

app.get("/visit", (req, res, next) => {
	res.render("visit");
});

app.get("/prayer-request", (req, res, next) => {
	res.render("prayer-request");
});

app.get("/gallery", (req, res, next) => {
	res.render("gallery");
});

app.get("/pastor-login", (req, res, next) => {
	res.render("pastor-login");
});

app.listen(keys.PORT, () => {
	console.log(`Server running on port ${keys.PORT}!`);
});



