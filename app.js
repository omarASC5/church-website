const express = require("express"),
	  app     = express(),
	  ejs     = require("ejs");

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res, next) => {
	res.render("index");
  });

app.listen(keys.PORT, () => {
	console.log(`Server running on port ${keys.PORT}!`);
});



