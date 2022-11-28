const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    _id: Number,
    eventid: Number,
    teamid: Number
});

const Vote = mongoose.model('Vote', studentSchema);

module.exports = Vote;