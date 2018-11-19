"use strict";

var Tid = require('../models/Tid');


// Returns a promise that resolves when the tid is created.
exports.createTid = function (navn,tlfNr,uge,dag,tid,tidID) {
    var tid = new Tid({
        navn: navn,
        tlfNr: tlfNr,
        uge: uge,
        dag:dag,
        tid:tid,
        tidID: tidID
    });

    return tid.save();
};
// delete tid
exports.sletTid= function () {
    Tid.remove().exec()

}


// Returns a promise that resolves when a Tid is found with the specified id.
// exports.getCompany = function (uge) {
//     return Tid.findOne({uge: uge}).exec();
// };

// Returns a promise that resolves with an array of all tider.
exports.getTiderer = function () {
    return Tid.find().exec()
};


//***************Admin****************
var Login = require('../models/Login');

// Returns a promise that resolves when the login is created.
exports.createLogin = function (username, password) {
    var login = new Login({
        username: username,
        password: password
    });
    return login.save();
};

// Returns a promise that resolves when a login is found with the specified id.
exports.getLogin = function (loginId) {
    return Login.findOne({_id: loginId}).exec();
};

// Returns a promise that resolves with an array of all logins. Each login

exports.getLogins = function () {
    return Login.find().populate('employees').exec();
};
// delete login
exports.sletLogin= function () {
    Tid.remove().exec()

}



