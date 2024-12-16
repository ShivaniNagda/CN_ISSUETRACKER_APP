import express from "express";
import validationMiddleware from "../middleware/validation.middleware.js";
import IssueController from "../controller/issue.controller.js";

const issueRouter = express.Router();

const issueController = new IssueController();

// ===============================render Bugs/issue Form for particular Post ========================
issueRouter.get('/createissue/:id',
    (req,res)=>
        {
        issueController.createIssueForm(req,res);
        });
// ===============================get Bugs/issue particular Post ========================
issueRouter.get("/getissue/:id",(req,res)=>{ 
    console.log("issueGet",req.body)
    issueController.getIssue(req,res)});

// ===============================post Bugs/issue particular Post ========================
issueRouter.post("/postissue/:id",(req,res)=>{ 
    console.log("issuePost",req.body)
    issueController.createIssue(req,res)});

// ===============================Delete Bugs/issue particular Post ========================
issueRouter.get("/delete/:id",(req,res)=>{ 
    console.log("delete",req.body,req.params);
    issueController.deleteIssue(req,res)});
    
// ===============================Filter Bugs/issue particular Post ========================
issueRouter.get("/filter/:id",(req,res)=>{ 
    console.log("filter",req.body,req.params);
    issueController.filterIssue(req,res)});

export default issueRouter;
