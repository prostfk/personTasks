const express = require('express');
const router = express.Router();
const security = require('../util/security');
const Task = require('../model/task.model');

router.get('/myTasks', (req,resp)=>{
    let userInfo = security.getUserInfo(req);
    Task.find({
        username: userInfo.username
    }, (err, tasks)=>{
        resp.send(tasks);
    })
});

router.post('/addTask', (req,resp)=>{
    let userInfo = security.getUserInfo(req);
    let {date, task} = req.body;
    let taskObj = new Task({date: date, content: task, username: userInfo.username});
    taskObj.save(err=>{
        if (err){
            resp.send({error: err.toString()})
        }else {
            resp.send({status: 'ok'})
        }
    })
});

module.exports = router;