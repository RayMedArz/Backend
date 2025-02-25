//const express= require('express');
import express from 'express';
import indexRoutes from "./routes/indexRoutes.js";

const app=express();

app.use('/',indexRoutes);

app.listen(5000,console.log('http://localhost:5000'));

console.log('Hola mundo');