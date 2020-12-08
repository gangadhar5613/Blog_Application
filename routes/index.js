var express = require('express');
var router = express.Router();
let Article = require('../models/Article');
let Comment = require('../models/Comment');


/* GET home page. */
router.get('/', function(req, res, next) {
    Article.find({},(err,articles) => {
        if(err) return next(err);
        res.render('index',{articles})
    })
 
});





module.exports = router;