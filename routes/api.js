var express = require('express');

var app =express.Router();

var Office = require('../models/office');

function displayTime() {
    var str = "";

    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        str += "PM"
    } else {
        str += "AM"
    }
    return str;
}

app.get('/', function(req,res){
    console.log("Redirecting to /employees.....");
    res.redirect('/employees');
});

//GET
app.get('/employees', function(req,res){

    Office.find({}, function(err, data){
        if(err){
            console.log("Error Cant find records.....");
            res.send(err);
        }
        else{
        res.send(data);
        console.log("Success.....");
        }
    })

});

//GET ONE
app.get('/employee/:id', function(req,res){
    var _id = req.params.id;
    Office.findById(_id, function(err, data){
        if(err){
            console.log("Error Cant find records.....");
            res.send(err);
        }
        else{
        res.send(data);
        console.log("Success.....");
        }
    })

});

//DELETE
app.delete('/employee/:id', function(req,res){
    var _id = req.params.id;
    Office.findByIdAndRemove(_id, function(err, data){
        if(err){
            console.log("Error Cant find records.....");
            res.send(err);
        }
        else{
        console.log("Successfully deleted.....");
        }
    })

});

//POST
app.post('/employee', function(req,res){

    if (!req.body.name){
        return res.status(400).send('Bad Data.....');
        console.log('Bad Data.....');
    }

    var Employee = new Office({
        name: req.body.name,
        department: req.body.department,
        age: req.body.age,
        entryTime: displayTime(),
        exitTime: null 
    });

    Employee.save(function(err, data){
        if (err){
            res.send(err);
            console.log("Error Cant add data.....");
        }
        else{
            res.send(data);
            console.log(data);
            console.log("Successfully data added.....");
        }
    });
});

//PUT
app.put('/employee/:id', function(req,res){
    var _id = req.params.id;
    var update = req.body;
   
    if(update.exitTime==null && update.entryTime!=null){
    update.exitTime = displayTime();
    update.entryTime += " (past)";
    }
    else if(update.entryTime!=null){
    update.entryTime = displayTime();
    update.exitTime = null;
    }
    Office.findByIdAndUpdate(_id,update, {new:true},function(err,data){
        if (err){
            res.send(err);
            console.log("Cant update.....");
        }
        else{
            res.send(data);
            console.log("Updated successfully.....");
        }
    });
});

module.exports = app;