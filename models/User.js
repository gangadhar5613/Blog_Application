let mongoose = require('mongoose');
const { schema } = require('./Article');
let Schema = mongoose.Schema;

//schema for user after auth completion
let userSchema = new schema({
    name:{type:String},
     email:{type:String,required:true},
     password:{type:String,required:true}
})


let User = mongoose.model('User',userSchema);


module.exports = User;