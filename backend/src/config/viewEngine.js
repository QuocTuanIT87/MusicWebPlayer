const path = require('path');
const express = require('express');

const configViewEngine = (app) => {
    app.set('views', './src/views');
    app.set('view engine', 'ejs');

    //config static files
    app.use(express.static('./src/public'));
};

module.exports = configViewEngine;
