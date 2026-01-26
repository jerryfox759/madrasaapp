const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admissionNo: {
        type: String,
        required: true,
        unique: true
    },
    classOrBatch: {
        type: String,
        required: true
    },
    admissionDate: {
        type: Date,
        default: Date.now
    },
    contact: {
        type: String,
        required: true
    },
    hifzComplete: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        required: true
    },
    aadharNo: {
        type: String,
        required: true
    },
    previousSchool: {
        type: String,
        required: false
    },
    photo: {
        type: String, // Store filename/path
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
