// File not mandatory for the API.
// Express loading
var express = require('express');
var router = express.Router();

// Basic view in index.html when you go to root of your client (here, the demonstrator)
router.get('/', function(req, res, next){
   res.render('index.html');
});

module.exports = router;
