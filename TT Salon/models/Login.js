var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var login = new Schema({
    username: String,
    password: String,
    //employees: [{type: Schema.Types.ObjectId, ref: 'Employee'}] // 0..* link to Employee
});
login.methods.toString = function() {
    return this.username + ", password: " + this.password;
};

module.exports = mongoose.model('Login', login);