const express = require('express');

const shoppingRouter = express.Router();

shoppingRouter.get('/', function (req, res){
    res.send('<h1>shopping Router</h1>');
});
shoppingRouter.get('/index', function (req, res){
    res.send('<h1>shopping Router Index</h1>');
});
module.exports = shoppingRouter;