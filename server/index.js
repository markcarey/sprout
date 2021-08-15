global.__base = __dirname + '/';
var functions = require('firebase-functions');
var firebase = require('firebase-admin');
firebase.initializeApp();

var sprout = require(__base + 'sprout');

exports.sproutAPI = functions.https.onRequest((req, res) => {
  return sprout.api(req, res);
}); // sproutAPI
