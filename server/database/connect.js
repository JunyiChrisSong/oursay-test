
// const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const uri2 = "mongodb://localhost:27017";
require("dotenv").config()
const uri = process.env.uri;
// const client = new MongoClient(uri);
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
var _db;

connection.once('open', () => {
    console.log("Mongodb connection established.");
});

let Event = require('./event');
const { events } = require('./event');

let Vote = require('./votes');
const { votes } = require('./votes');
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("employees");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
    handleEventPost: function(req,res) {
        const eventid = Number(req.body.eventid);
        console.log(eventid)
        const teams = req.body.teams;
        const name = req.body.name;
        // if (eventid == null) res.status(400).json("Please give an id");
        const newEvent = new Event({
            _id: eventid,
            teams: teams,
            name: name,
            open: true
        });
        newEvent.save()
        .then(() => res.json('user added!!!!!!'))
        .catch(err => res.status(400).json("Invalid event entry"))
    },
    handleEventCreate: async function(req,res) {
      var i = 0
      await Event.find().then(e => {
        e.forEach(event => {
          if (event._id > i)
            i = event._id
        })
      })
      i++;
      console.log(i)
      const data = req.body.data;
      console.log(data)
      var teams = [];
      data.forEach(t => {
        if (t.teamName != null)
          teams.push([[],0,Number(t.teamId),t.teamName]);
      })

      console.log(teams)
      console.log(i)
      const n = "Event " + i;

      const newEvent = new Event({
        _id: i,
        teams: teams,
        name: n,
        open: true
    });
    newEvent.save().then(() => res.json('Event Created.'))
    .catch(err => res.status(400).json("Invalid event entry"))

    },
    handleCloseEvent: function(req,res) {
      Event.findByIdAndUpdate(req.params.id)
      .then(event => {
        event.open = false;
        event.save()
        .then(() => Event.find().then(events => res.json(events)))
        .catch(err => res.status(400).json('Error: ' + err))
      })
    },
    handleEventGetAll: function(req,res) {
        Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error ' + err))
    },
    clearSchemas: function(req,res) {
        Event.deleteMany()
        .then(() => {res.json('it is done')})
        .catch(err => res.status(400))
        Vote.deleteMany()
        .catch(err => res.status(400))
    },
    handleEventUpdate: function(req,res) {
      console.log(req.body.teams)
      console.log(typeof req.body.teams)
        Event.findByIdAndUpdate(req.params.id)
        .then(event => {
          console.log(event)
            event.teams = req.body.teams;
            event.name = req.body.name;
            event.save()
            .then(() => Event.find().then(events => res.json(events)))
            .catch(err => res.status(400).json('Error: ' + err))
        }).catch(err => res.status(400).json('Error: ' + err))
    },
    handleEventDelete: async function(req,res) {
      var id = Number(req.params.id);
      var e = Event.findById(id);
      const ev = await Event.findOneAndDelete({_id: id});
      if (!ev) {
        return res.status(400).json({error: 'No such event'})
      }
      res.status(200).json(ev);
    },
    handleStudentVote: function(req,res) {
      // Vote.find().then(votes => res.json(votes));
      const teamid = req.body.teamid;
      const eventid = req.body.eventid;
      const studentid = req.body.studentid;
      Event.findById(eventid).then(event => {
        if (!event.open) {
          return res.status(400).json("That event is closed.");
        }
      })
      var newUpdate = function() {
        console.log("NEW EVENT: ")
        console.log(eventid)
        Event.findByIdAndUpdate(eventid).then(event => {
          var newinfo = event.teams;
          var j2 = JSON.parse(JSON.stringify(newinfo))
          console.log(j2)
          for (var i = 0; i < j2.length; i++) {
          console.log(j2[i][2][0])
            if (j2[i][2][0] == teamid) {
              console.log("Logging vote")
              j2[i][1][0]++;
            }
          }
          event.teams = j2;
          event.save().then(console.log("Succesfully updated new event")).catch(err => res.status(400).json('Error: AADJASIODNAISWDISADNJIKadn ' + err));
        })}
      Vote.findByIdAndUpdate(studentid)
      .then(vote => {
        console.log("Vote for this id is:")
        console.log(vote);
        if (vote != null) {
          //Update old event by decreasing vote
          Event.findByIdAndUpdate(vote.eventid).then(event => {
            var oldinfo = event.teams;
            var j2 = JSON.parse(JSON.stringify(oldinfo))
            for (var i = 0; i < j2.length; i++) {
              if (j2[i][2][0] == vote.teamid) {
                j2[i][1][0]--;
              }
            }
            console.log(j2)
            event.teams = j2;
            event.save().then(e => { 
              //change vote info
              vote.teamid = teamid;
              vote.eventid = eventid;
              vote._id = studentid;
              vote.save().then(newUpdate()).catch(err => console.log("cannot update student vote info"));;
            }).catch(err => console.log(err));
          })
          
        } else {
          vote = new Vote({
            eventid: eventid,
            teamid: teamid,
            _id: studentid
          });

          // console.log(vote);
          vote.save().then(newUpdate()).catch(err => console.log('error creating new vote: '));
        }
        //update new event
        res.status(200).json("ok")
        }).catch(err => res.status(400).json('error in vote ' + err));
      
    },
    deleteAllEvents: function(req,res) {
      Vote.deleteMany()
        .then(() => {res.json('it is done')})
        .catch(err => res.status(400))
    },
    openEvent: function(req, res) {
      const eventid = Number(req.body.eventid);
      Event.findByIdAndUpdate(eventid)
      .then(event => {
        event.open = true;
        event.save()
        .then(() => Event.find().then(events => res.json(events)))
        .catch(err => res.status(400).json('Error: ' + err))
      })
    },
    closeEvent: function(req, res) {
      const eventid = Number(req.body.eventid);
      Event.findByIdAndUpdate(eventid)
      .then(event => {
        event.open = false;
        event.save()
        .then(() => Event.find().then(events => res.json(events)))
        .catch(err => res.status(400).json('Error: ' + err))
      })
    },
};