const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../model/user.model');

router.post('/', (req, resp) => {
    console.log('here');
    let {username, password} = req.body;
    console.log(username, password);

    User.findOne({
        username
    }, (err, baseUser) => {
        console.log(baseUser);
        if (!baseUser) {
            if (password.length > 5 && password.length < 15) {
                bcrypt.hash(password, 10, (errHash, hash) => {
                    if (err) {
                        return resp.status(401).send({error: err.toString()});
                    }
                    let user = new User({username, password: hash});
                    user.save(err => {
                        if (err){
                            resp.send({error: err.toString()})
                        }else {
                            resp.send({status: 'ok'})
                        }
                    });
                    return resp.send({success: true});
                });
            } else {
                return resp.status(401).send({success: false, msg: 'Password must be between 5 and 15 chars'});
            }
        } else {
            return resp.status(401).send({error: 'Password must be between 5 and 15 chars'});
        }
    });


});
module.exports = router;
