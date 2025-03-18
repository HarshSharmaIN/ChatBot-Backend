const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: String,
    specialization: String,
    experience: Number,
    contact: String
});

module.exports = mongoose.model('Doctor', DoctorSchema);