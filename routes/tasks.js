const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost/tasklistapp', ['tasks']);


//Get All tasks
router.get('/tasks', (req, res, next) => {
   db.tasks.find((err,tasks)=>{
       if(err){
           res.send(err);
       }
       res.json(tasks);
   });
});


//Get Single Task
router.get('/tasks/:id', (req, res, next) => {
    db.tasks.findOne({_id:mongojs.ObjectID(req.params.id)},(err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

//Save Task
router.post('/tasks', (req, res, next) => {
   var task = req.body;
   if(!task.title || !(task.isDone+'')){
       res.status(400);
       res.json({
           error:"Bad Data"
       });
   }
   else{
       db.tasks.save(task,(err,task)=>{
           if (err) {
               res.send(err);
           }
           res.json(task);
       });
   }
});

//Delete Task
router.delete('/tasks/:id', (req, res, next) => {
    db.tasks.remove({ _id: mongojs.ObjectID(req.params.id) }, (err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});



//Upadate Task
router.put('/tasks/:id', (req, res, next) => {
    var task = req.body;
    var updTask = {};

    if(task.isDone){
        updTask.isDone= task.isDone;
    }
    if(task.title){
        updTask.title = task.title;
    }
    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }
    else{
        db.tasks.update({ _id: mongojs.ObjectID(req.params.id) },updTask,{}, (err, task) => {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }

});
module.exports = router;