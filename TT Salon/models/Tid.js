var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var tid = new Schema({
    navn: String,
    tlfNr: String,
    uge:String,
    dag:String,
    tid:String,
    tidID:String

});
// tid.methods.toString = function() {
//     return this.navn + ", dato: " + this.dato;
// };

module.exports = mongoose.model('Tid', tid);
