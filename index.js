//const express= require('express');
import "dotenv/config.js";
import express from 'express';
import indexRoutes from "./routes/indexRoutes.js";
import itemsRoutes from "./routes/items.routes.js";
import loginRoutes from "./routes/login.Routes.js";

const app=express();

app.use(express.json());
app.use(indexRoutes);
app.use(itemsRoutes); 
app.use(loginRoutes);

app.listen(50000, console.log("http://localhost:50000"));