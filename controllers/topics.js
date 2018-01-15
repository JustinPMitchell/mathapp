var express = require("express");
var request = require("request");
var async = require("async");
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAER7smNa4bB93er89grghZjm96mYPV6OI');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var db = require("../models");

var currentTopic = 0;

router.get("/", function(req, res) {
  db.topic.findAll().then(function(topics) {
    res.render("topics/all", {topics: topics});
  });
});

// POST - receive the name of a topic and add it to the database
// this is where the video will be processed from the keyword and the youtube api added to the database
router.post('/', function(req, res) {
    console.log("this is the req.body.title", req.body.title);
    var youtubeSearch = "";

    //takes in 4 videos and passes the first one to youtubeSearch
    youtube.searchVideos(req.body.keyword, 4)
        .then(results => {
            console.log(`The video's url is ${results[0].url}`);
            youtubeSearch = results[0].url;
        })
        .catch(console.log);

    //don't like this solution, but it works, it allows the searchVideos thing to happen
    setTimeout( function() {
      db.topic.create({
        title: req.body.title,
        keyword: req.body.keyword,
        url: youtubeSearch
      }).then(function(createdTopic) {
        res.redirect("topics/" + createdTopic.id);
      }).catch(function(err) {
        res.send("uh oh!", err);
      });
    }, 1000);
});

//need to have put route, but don't know how to say edit topic
//the example code below uses something with a json file, not sequelize
router.put("/:id", isLoggedIn, function(req, res) {
  db.topic.findOne({ 
    where: { id: req.params.id } 
  }).then(function (topic) {
    topic.updateAttributes({
      title: req.body.title
    });
  }).then(function (topic) {
    res.send("success");
  });
});

router.delete("/:id", isLoggedIn, function(req, res) {
  console.log("delete route. ID = ", req.params.id);
  db.topic.destroy({
    where: { id: req.params.id }
  }).then(function(deleted){
    console.log("deleted = ", deleted);
    res.send("success");
  }).catch(function(err) {
    console.log("an error happened", err);
    res.send("fail");
  });
});

router.get("/new", isLoggedIn, function(req, res) {
    res.render("topics/new");
});

router.get("/edit/:id", isLoggedIn, function(req, res) {
  db.topic.findOne({
    where: {id: req.params.id},
    include: [db.problem]
  }).then(function(topic) {
    res.render("topics/edit", {topic: topic});
  });
});

router.get("/take/:id", function(req, res) {
  db.topic.findOne({
    where: {id: req.params.id},
    include: [db.problem]
  }).then(function(topic) {
    currentTopic = topic;
    res.render("topics/take", {topic: topic});
  });
});

router.get("/:id", isLoggedIn, function(req, res) {
  db.topic.findOne({
    where: {id: req.params.id},
    include: [db.problem]
  }).then(function(topic) {
    res.render("topics/single", {topic: topic});
  });
});

module.exports = router;