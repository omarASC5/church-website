const express = require("express"),
	  app     = express(),
	  keys    = require("./config/keys.js"),
	  ejs     = require("ejs"),
	  bodyParser = require("body-parser"),
	  mongoose       = require("mongoose"),
	  nodemailer = require("nodemailer"),
	methodOverride = require('method-override');


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
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/events', event);
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

app.post("/prayer-request", (req, res, next) => {
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
	// async..await is not allowed in global scope, must use a wrapper
async function main(){

	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	let account = await nodemailer.createTestAccount();
  
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
	  host: "smtp.ethereal.email",
	  port: 587,
	  secure: false, // true for 465, false for other ports
	  auth: {
		user: account.user, // generated ethereal user
		pass: account.pass // generated ethereal password
	  },
	  tls: {
		  rejectUnauthorized: false
	  }
	});
  
	// setup email data with unicode symbols
	let mailOptions = {
	  from: '"Fred Foo 👻" <foo@example.com>', // sender address
	  to: "ocobas19@avenues.org, omarlcobas@gmail.com", // list of receivers
	  subject: "Prayer Request - Sanando Los Heridos", // Subject line
	  text: outputPlainText, // plain text body
	  html: output // html body
	};
  
	// send mail with defined transport object
	let info = await transporter.sendMail(mailOptions)
  
	console.log("Message sent: %s", info.messageId);
	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);
});

app.get("/pastor-login", (req, res, next) => {
	res.render("pastor-login", {page_name: "pastor-login"});
});

// index route
app.get("/events", (req, res, next) => {
	res.render("events", {page_name: "events"});
});

// show route




app.listen(process.env.PORT || 3000, () => {
	console.log(`Server running on port ${keys.PORT}!`);
});



