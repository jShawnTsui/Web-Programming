var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shawn', condition: true, anyArray: [1,2,3] });
});

router.get();

router.post();



module.exports = router;
