const express = require("express"),
	  app     = express(),
	  keys    = require("./config/keys.js"),
	  ejs     = require("ejs"),
	  bodyParser = require("body-parser"),
	  mongoose       = require("mongoose"),
	  nodemailer = require("nodemailer"),
	methodOverride = require('method-override'),
	passport = require("passport"),
 User = require('./models/user.model'),
 https = require('https'),
 fs = require('fs')
 ;

 app.use(passport.initialize());
 app.use(passport.session()); 
 
 // Implement (de)serializeUser methods -- Do I need this?
 passport.serializeUser((user, done) => done(null, user));
 passport.deserializeUser((user, done) => done(null, user));
	var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
	passport.use(new GoogleStrategy({
			clientID: "88904186757-ghn498iddjotnk1jh5pkjtu9ftc41m0g.apps.googleusercontent.com",
			clientSecret: "1r6v4WtrewyPmoilIz8-QtYM",
			callbackURL: "http://localhost:5500/auth/google/callback",
			passReqToCallback: true
		},
		(request, accessToken, refreshToken, profile, done) => {
			User.findOrCreate({ googleId: profile.id }, function (err, user) {
				return done(err, user);
			});
		}
	));

	// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/pastor-login' }),
(req, res) => {
	res.redirect('/');
});


	
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('_method'))

// View Engine Setup
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
mongoose.set('useFindAndModify', false);

const event = require('./routes/event.route'); // Imports routes for the products

// Set up mongoose connection
let dev_db_url = "mongodb://ocobas:sanandolosheridos1@ds039175.mlab.com:39175/church-website"
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


function isAuthenticated(req, res, next) {

			// passport.authenticate('google', { failureRedirect: '/pastor-login', scope: 'profile' })
			console.log(req.user);
			next();
		


	
}
// passport.authenticate('google', { failureRedirect: '/login', scope: 'profile' })
// 'email https://www.googleapis.com/auth/drive'
app.use('/eventos',
isAuthenticated, (req,res,next)=> {
	console.log('YOOOO');
	next()
}, event);
app.get("/", (req, res, next) => {
	res.render("index", {page_name: "index"});
	});
	
app.get("/quienes-somos", (req, res, next) => {
	res.render("about", {page_name: "about"});
});

app.get("/nuestro-credo", (req, res, next) => {
	res.render("our-creed", {page_name: "our-creed"});
});

app.get("/servicios", (req, res, next) => {
	res.render("our-services", {page_name: "our-services"});
});

app.get("/visitanos", (req, res, next) => {
	res.render("visit", {page_name: "visit"});
});

app.get("/peticion-de-oracion", (req, res, next) => {
	res.render("prayer-request", {page_name: "prayer-request"});
});

app.post("/peticion-de-oracion", (req, res, next) => {
	const output = `
		<p>You have a new contact request</p>
		<h3>Contact Details</h3>
		<ul>
			<li>Name: ${req.body.name}</li>
			<li>Email: ${req.body.email}</li>
		</ul>
		<p>Prayer Request:</p>
		<p>${req.body.prayerRequest}</p>
	`;
	const outputPlainText = `
		Name: ${req.body.name},
		Email: ${req.body.email},
		Prayer Request:
		${req.body.prayerRequest}
	`

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
					 user: 'omarlcobas@gmail.com',
					 pass: 'Letsgoomar123'
			 }
	 });

  
	// setup email data with unicode symbols
	let mailOptions = {
	  from: req.body.email, // sender address
	  to: "ocobas19@avenues.org, omarlcobas@gmail.com", // list of receivers
	  subject: "Prayer Request - Sanando Los Heridos", // Subject line
	  text: outputPlainText, // plain text body
	  html: output // html body
	};

	transporter.sendMail(mailOptions, function (err, info) {
		if(err) {
			console.log(err)
			// Custom Error Page
			res.redirect('/peticion-de-oracion');
		}
		else {
			console.log(info);
			// Custom Thank you page
			res.redirect('/peticion-de-oracion');
		}
 	});
});

app.get("/pastor-login", (req, res, next) => {
	res.render("pastor-login", {page_name: "pastor-login"});
});

// index route
app.get("/eventos", isAuthenticated, (req, res, next) => {
	res.render("events", {page_name: "events"});
});

// show route




app.listen(process.env.PORT || keys.PORT, () => {
	console.log(`Server running on port ${keys.PORT}!`);
});


// we will pass our 'app' to 'https' server
https.createServer(app).listen(3000);


