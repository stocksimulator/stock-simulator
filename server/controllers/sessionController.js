const Session = require('../models/sessionModel');

const sessionController = {};

//isLoggedIn - find the appropriate session for this request in the database, then
//verify whether or not the session is still valid.

sessionController.isLoggedIn = (req, res, next) => {

  if (!req.cookies.ssid) {
    res.sendStatus(401);
  }

  // check the Mongo database to see if there is a stored session
  Session.findOne({}, (err, data) => {

    if (!data === null) {
      if (data._doc.cookieId === req.cookies.ssid) {
        return next()
      }
      else {
        res.sendStatus(401);
      }
    }
  })
}

//startSession - create and save a new Session into the database.
sessionController.startSession = (req, res, next) => {

  Session.create({ "cookieId": res.locals.userId }, (err, session) => {
    return next()
  })
};

module.exports = sessionController;
