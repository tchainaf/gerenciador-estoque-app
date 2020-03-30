var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('product');
});

router.post('/', function (req, res) {
  request.post({
      url: config.apiUrl + '/product',
      form: req.body,
      json: true
  }, function (error, response, body) {
      if (error) {
          return res.render('product', { error: 'An error occurred' });
      }

      if (response.statusCode !== 200) {
          return res.render('product', {
              error: response.body
          });
      }

      req.session.success = 'Post successful';
      return res.redirect('/');
  });
});

module.exports = router;
