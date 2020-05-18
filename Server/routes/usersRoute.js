const express = require('express');
const UsersModel = require('../models/usersModel.js');
const router = express.Router();

router.get('/doctors', (req,res) => {
    UsersModel.find({type:'d'}, (err, list)=>{
        if (err) throw err;
        if(list) {
            res.json({success: true , data: list});
        }
    })
})

router.get('/', (req,res) => {
    UsersModel.find({ type: { $ne: 'a' } }, (err, list)=>{
        if (err) throw err;
        if(list) {
            res.json({success: true , data: list});
        }
    })
})

router.post('/login', (req, res) => {
    const username = req.body.username || '';
    const password = req.body.password || '';

    let errors = {};

    if (username === '') {
        errors = {...errors, username: 'This field is required' };
    }
    if (password === '') {
        errors = {...errors, password: 'This field is required' };
    }

    if (Object.keys(errors).length > 0) {
        res.json({ errors });
    } else {
        UsersModel.findOne({username: username}, (err, user) => {
            if (err) throw err;
            if (Boolean(user)) {
                // Match Password
                    if (user.password === password) {
                        res.json({success: true, data: user })
                    } else {
                       res.json({ errors: { invalidCredentials: 'Invalid Number or Password' } });
                    }
            } else {
                res.json({ errors: { invalidCredentials: 'Invalid Number or Password' } });
            }
        });
    }
});

module.exports = router;
