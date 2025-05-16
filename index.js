//const express= require('express');
import "dotenv/config.js";
import express from 'express';
import cors from "cors";   
import indexRoutes from "./routes/indexRoutes.js";
//import itemsRoutes from "./routes/items.Routes.js";
import itemsRoutes2 from "./routes/items2.Routes.js";
import itemsRoutes3 from "./routes/items3.routes.js";
import loginRoutes from "./routes/login.Routes.js";
import morgan from "morgan";
import { connectDB } from "./utils/mongodb.js";

const app=express();

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(indexRoutes);
//app.use(itemsRoutes2); 
app.use(itemsRoutes3);
app.use(loginRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));