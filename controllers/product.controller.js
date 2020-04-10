var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config.json');

router.post('/:id', function (req, res) {
    if (!validaDados(res, req.body, req.params.id)) {
        return;
    }

    if (req.params.id != 0) { //update
        request.put({
            url: config.apiUrl + '/product/' + req.params.id,
            form: req.body,
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
    } else { //create
        request.post({
            url: config.apiUrl + '/product',
            form: req.body,
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
    }
});

function validaDados(res, reqBody, id) {
    var product = {
        _id: id,
        data_entrada: reqBody.data_entrada,
        tipo: reqBody.tipo,
        marca: reqBody.marca,
        caracteristicas: reqBody.caracteristicas,
        tamanho: reqBody.tamanho,
        cor: reqBody.cor,
        valor_etiqueta_c: reqBody.valor_etiqueta_c,
        valor_pago_c: reqBody.valor_pago_c,
        valor_margem: reqBody.valor_margem,
        preco_sugerido: reqBody.preco_sugerido
    }

    if (isNaN(product.valor_etiqueta_c)) {
        return res.render('product', {
            error: "O valor da etiqueta deve ser um número!",
            product
        });
    }

    if (isNaN(product.valor_pago_c)) {
        return res.render('product', {
            error: "O valor pago deve ser um número!",
            product
        });
    } else {
        reqBody.valor_margem = reqBody.valor_pago_c * 2;
    }

    if (isNaN(product.preco_sugerido)) {
        return res.render('product', {
            error: "O preço sugerido deve ser um número!",
            product
        });
    }

    return true;
}

module.exports = router;