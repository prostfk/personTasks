const express = require('express');
const router = express.Router();
const security = require('../util/security');
const Task = require('../model/task.model');

router.get('/myTasks', (req, resp) => {
    let userInfo = security.getUserInfo(req);
    Task.find({
        username: userInfo.username
    }, (err, tasks) => {
        resp.send(tasks);
    })
});

router.post('/addTask', (req, resp) => {
    let userInfo = security.getUserInfo(req);
    let {date, task} = req.body;
    let taskObj = new Task({date: date, content: task, username: userInfo.username});
    taskObj.save(err => {
        if (err) {
            resp.send({error: err.toString()})
        } else {
            resp.send({status: 'ok'})
        }
    })
});

router.put('/editTask', (req, resp) => {
    let {date, task, id} = req.body;
    let userInfo = security.getUserInfo(req);
    if (date && task && id){
        Task.updateOne({_id: id, username: userInfo.username}, {$set:{date: date, content: task}},(err,task)=>{
           resp.send({task});
        });
    }else{
        resp.send({error: 'Check parameters'});
    }
});

router.delete('/deleteTask', (req, resp) => {
    let userInfo = security.getUserInfo(req);
    let {id} = req.body;
    console.log(id, typeof id);
    if (id === 'undefined') {
        resp.send({error: 'id is empty'})
    } else {
        Task.deleteOne({_id: id}, err => {
            if (err) {
                resp.send({error: err.toString()});
            } else {
                resp.send({status: 'deleted'});
            }
        })
    }
});

module.exports = router;