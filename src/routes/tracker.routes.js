import express from "express";
import TrackerController from "../controller/tracker.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";

const trackerRouter = express.Router();

const trackerController = new TrackerController();

// ===============================Get Project ========================
trackerRouter.get("/", (req, res) => {
  trackerController.getProject(req, res);
});
// ===============================add Project ========================
trackerRouter.get("/add-project", (req, res) => {
  trackerController.getAddProject(req, res);
});

// ===============================update Project ========================
trackerRouter.get("/update-project/:id", (req, res) => {
  trackerController.getUpdateProjects(req, res);
});

// ===============================view Project ========================
trackerRouter.get("/view-project/:id", (req, res) => {
  trackerController.getViewProject(req, res);
});

// ==============================delete Project ========================
trackerRouter.post("/delete-project/:id", (req, res) => {
  trackerController.postdeleteProjects(req, res);
});
// ===============================Post/Upload new Project ========================
trackerRouter.post("/", validationMiddleware,(req, res) => {
  trackerController.postnewProjects(req, res);
});
// =============================== update Project post ========================
trackerRouter.post("/update-project",validationMiddleware, (req, res) => {
  trackerController.postupdateProjects(req, res);
});
// ===============================Get Project ========================
trackerRouter.get("/projects", (req, res) => {
  trackerController.getAllProjects(req, res);
});

// ===============================Filter Project ========================
trackerRouter.get("/filter", (req, res) => {
  trackerController.filterProjects(req, res);
});

export default trackerRouter;
