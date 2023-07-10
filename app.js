// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

const uri = "mongodb+srv://thanhchaudo522:VKLs6CbXBBlOuIXw@cluster0.x2fbny8.mongodb.net/";
mongoose.connect(uri + "wikiDB", {useNewUrlParser: true});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

// TODO

app.route("/articles")
    .get(function(req, res) {
        Article.find({})
            .then((foundArticles) => {
                res.send(foundArticles);
            })
            .catch((err) => {
                res.send(err);
            })
    })
    .post(function(req, res) {

        const newArticle = new Article ({
            title: req.body.title,
            content: req.body.content 
        });

        newArticle.save()
            .then(() => {
                res.send("Successfully added a new article.")
            })
            .catch((err) => {
                res.send(err);
            });
    })

    .delete(function(req, res) {
        Article.deleteMany({})
            .then(() => {
                res.send("Successfully deleted all articles.");
            })
            .catch((err) => {
                res.send(err);
            })
    });

app.route("/articles/:articleTitle")
    .get(function(req, res) {
        Article.findOne({title: req.params.articleTitle})
            .then((foundArticle) => {
                if (foundArticle) {
                    res.send(foundArticle)
                } else {
                    res.send("No articles matching that title was found.");
                }
            })
            .catch((err) => {
                res.send(err);
            })
    })
    .put(function(req, res) {
        Article.findOneAndUpdate({title: req.params.articleTitle},
                                 {title: req.body.title, content: req.body.content},
                                 {overwrite: true})
            .then((updatedArticle) => {
                if (updatedArticle) {
                    res.send(updatedArticle);
                } else {
                    res.send("Failed to update. No articles matching that title was found.")
                }
            })
            .catch((err) => {
                res.send(err);
            })
    })
    .patch(function(req, res){
        Article.findOneAndUpdate({title: req.params.articleTitle},
            req.body)
            .then((updatedArticle) => {
        if (updatedArticle) {
            res.send(updatedArticle);
        } else {
            res.send("Failed to update. No articles matching that title was found.")
        }
        })
        .catch((err) => {
            res.send(err);
        })
    })
    .delete(function(req, res) {
        
    });

app.listen(3000, function() {
    console.log("Server started on port 3000");
});