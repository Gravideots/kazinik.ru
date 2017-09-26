const mongoose = require('mongoose');
const EventSchema = require('../schemas/event')
const dbConfig = require('../config/dbConfig');

const db = mongoose.createConnection(dbConfig.appDB.url);
let eventSchema = db.model('Event', EventSchema);

const createEvent = function (done) {

    let newEvent = new eventSchema()
    newEvent.Title = "!!!Event Title!!!"

    newEvent.save(function (err) {
        if (err)
            throw err
        return done(null, newEvent)
    })
}

const getEventByID = function (eventID, done) {
    eventSchema
        .findOne({ _id: eventID }, function (err, event) {
            if (err)
                throw err
            else {
                return done(null, event)
            }
        })
}

const updateEventByID = function (eventID, data, done) {
    eventSchema
        .findByIdAndUpdate({ _id: eventID }, {
            $set: { Title: "A.B. Abracus", EventDate: new Date() }
        }, function (err, event) {
            if (err)
                throw err
            else {
                return done(null, event)
            }
        })
}

const dropEventByID = function (eventID, done) {
    eventSchema
        .remove({ _id: eventID }, function (err) {
            if (err)
                throw err
            else
                return done(null, true)
        })
}

module.exports = { createEvent, getEventByID, updateEventByID, dropEventByID }
