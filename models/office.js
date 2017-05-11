var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfficeSchema = new Schema({

    name : {
        type: String,
        required: true
    },
    department:{
        type: String
    },
    age:{
        type: Number,
        min: 12,
        max: 60
    },
    entryTime:{
    },
    exitTime:{
    }

});
/*
OfficeSchema.pre('save', function(next){
    var office = this;

    var currentDate = new Date();

    if(office.entryTime==null){
        office.entryTime = currentDate;
    }
  
    next();
});*/

module.exports = mongoose.model('Office', OfficeSchema);