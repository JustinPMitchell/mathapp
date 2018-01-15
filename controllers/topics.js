var express = require("express");
var async = require("async");
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var db = require("../models");

var currentTopic = 0;

router.get("/", function(req, res) {
  db.topic.findAll().then(function(topics) {
    res.render("topics/all", {topics: topics});
  });
});

router.post("/", function(req, res) {
  db.topic.create(req.body).then(function(createdTopic) {
    res.redirect("/topics/" + createdTopic.id);
  }).catch(function(err){
    console.log("err", err);
    res.send("uh oh!");
  });
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