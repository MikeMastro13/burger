var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.select(function(data) {
    res.render("index", {burgers: data});
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insert(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.update(
    {
      devoured: req.body.devoured
    },
    condition,
    function(result) {
      res.status(200).end();
    }
  );
});

// Export routes for server.js to use.
module.exports = router;
