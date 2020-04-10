var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config.json');

router.post('/:id', function (req, res) {
    req.body.valor_margem = req.body.valor_pago_c * 2;
    if (req.params.id != 0) { //update
        request.put({
            url: config.apiUrl + '/product/' + req.params.id,
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

            return res.redirect('/');
        });
    } else { //create
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

            return res.redirect('/');
        });
    }
});

module.exports = router;