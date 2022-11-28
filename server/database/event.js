const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    members: [String],
    voteCount: Number,
    teamId: Number,
    teamName: String
});
const eventSchema = new Schema({
    _id: Number,
    teams: [
        [[String],Number,Number,String]
    ],
    name: String,
    open: Boolean
});


const Event = mongoose.model('Team', eventSchema);

module.exports = Event;