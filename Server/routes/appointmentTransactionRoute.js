const express = require('express');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongoose').Types.ObjectId;

const AppointmentModel = require('../models/appointmentModel.js');
const config = require('../config.js');

let router = express.Router();

router.get('/', (req, res) => {
    console.log(req.query, "Params");
    if (req.query.paient) {
        AppointmentModel
            .find({patientId: req.query.paient}, (err, data)=>{
                res.json({success: true, data})
            })
    } else if (req.query.doctor){
        AppointmentModel
            .find({doctorId: req.query.doctor, status:'none'}, (err, data)=>{
                res.json({success: true, data})
            })
       
    } else {
        res.json({});
    }

});

router.post('/update/:id', (req, res) => {
    AppointmentModel.update({_id:req.params.id}, {...req.body}, {}, (err, data)=>{
        if(err){
            console.log(err);
            throw err;
        }
        res.json({data});
    })
})

router.post('/add', (req, res) => {
    const { date, defaultTime, endTime, doctor, reason, paient } = req.body;
    AppointmentModel.countDocuments({ doctorId: doctor, date: date }, (errDoc, docdata) => {
        if (docdata < 10) {
            AppointmentModel.countDocuments({ $or: [{ 'start_time': defaultTime }, { 'end_time': endTime }, { 'doctorId': doctor }], 'date': date }, (errDocApp, DocAppData) => {
                if (errDocApp) {
                    console.log(errDocApp)
                    throw err;
                }
                if (DocAppData > 0) {
                    res.json({ success: true, message: 'Doctor Having Another Appoinment' });
                } else {
                    AppointmentModel.find({ $or: [{ 'start_time': defaultTime }, { 'end_time': endTime }, { 'patientId': paient }], 'date': date },
                        (err, docs) => {
                            if (err) {
                                console.log(err)
                                throw err;
                            }
                            if (docs.length === 0) {
                                const newArticle = new AppointmentModel({
                                    doctorId: doctor,
                                    date: date,
                                    reason: reason,
                                    start_time: defaultTime,
                                    end_time: endTime,
                                    patientId: paient,
                                    status:'none'
                                });

                                newArticle.save((errDAta) => {
                                    if (errDAta) {
                                        console.log(errDAta)
                                        throw errDAta;
                                    }
                                    else {
                                        res.json({ success: true, message: 'Appointment Added Successfully' });
                                    }
                                });
                            } else {
                                res.json({ success: true, message: 'already you have a appoinment in this time' })
                            }
                        });
                }
            });

        } else {
            res.json({ success: true, message: 'Doctor having too much appoinment kindly select another doctor' })
        }
    });
});


module.exports = router;
