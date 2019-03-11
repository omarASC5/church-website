const Event = require('../models/event.model');
const bodyParser = require("body-parser");

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.render('form');
};
exports.event_index = function (req, res) {
    Event.find({}, function(err, events) {
        if (err) {
          console.log("ERROR");
        } else {
            // _id, name, description, image?!
            console.log(events)
          res.render("events", {page_name: "events", events: events});
        }
      });
    // res.render('/');
};



exports.event_form = function (req, res) {
    // res.send('Greetings from the Test controller!');
    res.render('form', {page_name: "events"});

};

// Create Route
exports.event_create = function (req, res) {
    let event = new Event(
        {
            name: req.body.name,
			description: req.body.description,
			image: req.body.image
        }
    );

    event.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/events");
    })
};

// Show Route
exports.event_details = function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) return next(err);
        res.render("show", {event: event});
    })
};

// Edit Route
exports.event_edit = function (req, res) {
    Event.findById(req.params.id, function(err, event) {
        if (err) {
          res.redirect("/events");
        } else {
          res.render("edit", {page_name: "events", event: event}); 
        }
      });
}

// Update Route
exports.event_update = function (req, res) {
    Event.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, event) {
        if (err) return next(err);
        res.redirect("/events");
    });
};

// Delete Route
exports.event_delete = function (req, res) {
    Event.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.redirect("/events");
    })
};