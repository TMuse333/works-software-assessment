"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import express_1 from "express";
import dotenv_1 from "dotenv";
import mongoose_1 from "mongoose";
import cors_1 from "cors";
import routes_js_1 from "./routes.js";
dotenv_1.config();
var app = (0, express_1)();
app.use((0, cors_1)());
mongoose_1.connect(process.env.MONGODB_URI)
    .then(function () {
    console.log('MongoDB connected');
})
    .catch(function (error) {
    console.error('Error connecting to MongoDB:', error);
});
app.use(express_1.json());
app.use('/', routes_js_1);
var PORT = 9000;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
