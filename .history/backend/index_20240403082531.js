"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var routes_js_1 = require("./routes.js");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(function () {
    console.log('MongoDB connected');
})
    .catch(function (error) {
    console.error('Error connecting to MongoDB:', error);
});
app.use(express_1.default.json());
app.use('/', routes_js_1.default);
var PORT = 9000;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
