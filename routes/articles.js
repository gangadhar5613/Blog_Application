const { json } = require('express');
var express = require('express');
var router = express.Router();
let Article = require('../models/Article');
let Comment = require('../models/Comment');

/* GET home page. */



router.get('/new',(req,res) => {
  res.render('addNewArticleForm')
})

router.post("/", (req, res, next) => {
  
  req.body.tags = req.body.tags.split(" ");
  Article.create(req.body, (err, createdArticle) => {
    if (err) return next(err);
    res.redirect("/articles")
    
  })
});

router.get('/',(req,res,next) =>{
  Article.find({},(err,articles) => {
    if (err) return next(err);
    res.render("listArticles", { articles })
  })
});

router.get('/:id',(req,res,next) => {
  let id = req.params.id
  Article.findById(id,(err,article) => {
    if(err) return next(err);
    Comment.find({articleId : id},(err,comments) => {
     if(err) return next(err);
     res.render('articleView',{ article,comments});
    })
  
  })
})

// router.get('/:id',(req,res,next) => {
//   let id = req.params.id;
//   Article.findById(id).populate("comments").exec()
// })



router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
      if (err) return next(err);
      res.render("editArticle", { article })
  })
})


router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, {
    new: true
  }, (err, updatedArticle) => {
    if (err) return next(err);
    res.redirect(`/articles/${id}`)
  })
})


router.get("/:id/delete", (req, res, next) => {
  let id = req.params.id
  Article.findOneAndDelete( { _id : id}, (err, deletedArticle) => {
    if (err) return next(err);
    res.redirect("/articles");
  })
})


//router for comments

router.post('/:articleId/comments',(req,res,next) => {
  let articleId = req.params.articleId;
  req.body.articleId = articleId;
  Comment.create(req.body,(err,createdComment) => {
    if(err) return next(err);
    res.redirect('/articles/' + articleId);
  })
  console.log(req.body,articleId);
})

module.exports = router;
