var express = require("express");
var router = express.Router();
var db = require("../models");

router.post("/", function(req, res) {
  db.problem.create(req.body).then(function(createdProblem) {
    res.redirect("topics/" + createdProblem.topicId);
  });
});

module.exports = router;