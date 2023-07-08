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

app.get("/articles", function(req, res) {
    Article.find({})
        .then((foundArticles) => {
            res.send(foundArticles);
        })
        .catch((err) => {
            res.send(err);
        })
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
});