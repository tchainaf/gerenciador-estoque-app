var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config.json');

var products = [];

/* GET home page. */
router.get('/', function (req, res, next) {
  request.get({
    url: config.apiUrl + '/product/all',
    json: true
  }, function (error, response, body) {
    if (error) {
      return res.render('error', {
        message: "Não foi possível acessar a API",
        error
      });
    }

    if (response.statusCode !== 200) {
      return res.render('error', {
        message: "Não foi possível acessar o banco de dados",
        error: response.body
      });
    }

    products = response.body;
    res.render('index', { products });
  });
});

router.get('/create', function (req, res, next) {
  res.render('product', { product: { _id: 0 } });
});

router.get('/edit/:i', function (req, res, next) {
  var product = products[req.params.i];

  return res.render('product', { product });
});

router.get('/view/:i', function (req, res, next) {
  var product = products[req.params.i];

  return res.render('product', {
    isView: true,
    product
  });
});

router.get('/delete/:i', function (req, res) {
  var id = products[req.params.i]._id;

  request.delete({
    url: config.apiUrl + '/product/' + id,
    json: true
  }, function (error, response, body) {
    if (error) {
      return res.render('error', {
        message: "Não foi possível acessar a API",
        error
      });
    }

    if (response.statusCode !== 200) {
      return res.render('error', {
        message: "Não foi possível acessar o banco de dados",
        error: response.body
      });
    }

    return res.redirect('/');
  });
});

module.exports = router;