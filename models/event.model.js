const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
	name: String,
	description: String,
	image: String
});


// Export the model
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;