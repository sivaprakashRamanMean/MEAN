const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const AppointmentsSchema = mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true,
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    patientId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Appointments = mongoose.model('appointments', AppointmentsSchema);

module.exports = Appointments;
