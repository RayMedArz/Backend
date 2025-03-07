//const express= require('express');
import "dotenv/config.js";
import express from 'express';
import cors from "cors";   
import indexRoutes from "./routes/indexRoutes.js";
import itemsRoutes2 from "./routes/items.Routes.js";
import itemsRoutes from "./routes/items2.Routes.js";
import loginRoutes from "./routes/login.Routes.js";
import morgan from "morgan";
import { connectDB } from "./utils/mongodb.js";

const app=express();

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(indexRoutes);
app.use(itemsRoutes2); 
app.use(loginRoutes);

app.listen(50000, console.log("http://localhost:50000"));