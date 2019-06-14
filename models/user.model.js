const mongoose = require('mongoose'),
findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

let userSchema = new Schema({
	googleId: String
});

userSchema.plugin(findOrCreate);
// Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;