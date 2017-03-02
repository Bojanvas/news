var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String
}, { collection: 'user' })
mongoose.connect('mongodb://bojan:bojan.1987@ds111940.mlab.com:11940/news')

var User = mongoose.model('user', userSchema);

module.exports = User;