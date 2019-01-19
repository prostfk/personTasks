// import Database from "../util/database";
const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../model/user.model');

router.get('/', (req, res, next) => {
    res.render('auth', {action: '/auth', method: 'post'});
});

router.post('/', (req, resp) => {
    let {username, password} = req.body;
    User.findOne({
        username
    }, (err, baseUser) => {
       if (baseUser){
           bcrypt.compare(password, baseUser.password, (err, res)=>{
               if (res){
                   jwt.sign({id: baseUser.id, username: baseUser.username}, 'secret',(err,token)=>{
                       resp.send({
                           token
                       })
                   })
               }
           })
       }else{
           resp.json({error: 'no one'})
       }
    })
});

router.get('/logout', (req, resp) => {
    req.session.destroy(err => {
        console.log(err);
        resp.redirect('/');
    })
});


module.exports = router;
