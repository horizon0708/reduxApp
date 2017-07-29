"use strict"

var express = require('express');
var app = express();
var path = require('path');

// middleware
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname,'public','index.html'))
})

app.listen(3000, function(){
    console.log('app is listenging on port 3000');
})