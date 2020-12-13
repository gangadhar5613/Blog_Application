let mongoose = require('mongoose');
let Schema = mongoose.Schema;



let articleSchema = new Schema({
    
    title:{type:String},
    description:{type:String},
    tags:[{type:String}],
    authorId:{type:Schema.Types.ObjectId}

},{timestamps:true})





let Article = mongoose.model('Article',articleSchema);

module.exports = Article;