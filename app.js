const express = require("express"),
	  app     = express(),
	  keys    = require("./config/keys.js"),
	  ejs     = require("ejs");

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res, next) => {
	res.render("index", {page_name: "index"});
	});
	
app.get("/about", (req, res, next) => {
	res.render("about", {page_name: "about"});
});

app.get("/our-creed", (req, res, next) => {
	res.render("our-creed", {page_name: "our-creed"});
});

app.get("/our-services", (req, res, next) => {
	res.render("our-services", {page_name: "our-services"});
});

app.get("/visit", (req, res, next) => {
	res.render("visit", {page_name: "visit"});
});

app.get("/prayer-request", (req, res, next) => {
	res.render("prayer-request", {page_name: "prayer-request"});
});

app.get("/gallery", (req, res, next) => {
	res.render("gallery", {page_name: "gallery"});
});

app.get("/pastor-login", (req, res, next) => {
	res.render("pastor-login", {page_name: "pastor-login"});
});

app.listen(keys.PORT, () => {
	console.log(`Server running on port ${keys.PORT}!`);
});



