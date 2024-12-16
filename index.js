
import "./env.js";

import express from "express";
import trackerRouter from "./src/routes/tracker.routes.js";
import IssueController from "./src/controller/issue.controller.js";
import path from 'path';
import ejsLayouts from "express-ejs-layouts";
import validationMiddleware from "./src/middleware/validation.middleware.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
import issueRouter from "./src/routes/issue.routes.js";
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.static('public'))
server.use(ejsLayouts);
server.use(express.json());
server.use(express.urlencoded({extended:true}))
//SetUp view engine settings
server.set("view engine","ejs");
server.set("views",path.join(path.resolve(),"src","views"));

// create an instance of TrackerController
server.use("https://cn-issuetracker-app.vercel.app",trackerRouter);
server.use("https://cn-issuetracker-app.vercel.app/issue",issueRouter);


server.use(express.static('src/views'))

server.use('https://cn-issuetracker-app.vercel.app',(req,res)=>{
    res.render('pagenotFound.ejs')
})

server.listen(5555,()=>{
    console.log('Server is listening on port 5555');
    connectToMongoDB();
}); 
