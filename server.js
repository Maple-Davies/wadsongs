"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    res.send('Hello World from Express!');
});
var PORT = 3000;
app.listen(PORT, function () {
    console.log("Server listening on port ".concat(PORT, "."));
});
