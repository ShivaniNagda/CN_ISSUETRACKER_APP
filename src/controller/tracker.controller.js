import path from "path";
import TrackerModel from "../models/tacker.model.js";
import TrackerRepository from "../repository/tracker.repository.js";
import { ObjectId } from "mongodb";

export default class TrackerController {
  constructor() {
    this.trackerRepository = new TrackerRepository();
  }
  // ===================================// Get Project //========================================================
  async getProject(req, res) {
    let projects = await this.trackerRepository.getAll(); // Updated to use getAll()
    res.render("tracker", { projects });
  }
// ===================================// Get Add Project //========================================================
  
  getAddProject(req, res) {
    return res.render("createnewProject", { errorMessage: null });
  }

  // ===================================//  Post New Project : Create New Project //========================================================
  async postnewProjects(req, res) {
    try {
      const { _id,
        _projectname,
        _desc,
        _author,
        _priority,
        _status,
        _progress} = req.body;
      // Access data from form
      const newProject = new TrackerModel(_id,
        _projectname,
        _desc,
        _author,
        _priority,
        _status,
        _progress );

      await this.trackerRepository.add(newProject); // Ensure this is awaited
      let projects = await  this.trackerRepository.getAll(); // Updated to use getAll()
      res.render("tracker", { projects });
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to add project");
    }
  }
// ===================================//  Get New Update Project //========================================================
  async getUpdateProjects(req, res, next) {
    const id = req.params.id;
    try {
      const projectFound = await this.trackerRepository.getById(id);
      if (!projectFound) {
        return res.status(404).send("Project not found");
      }
      // Update Project

      res.render("update-project", {
        project: projectFound,
        errorMessage: null,
      });
    } catch (error) {
      res.status(404).send(error.message); // Return error message if project not found
    }
  }  

// ===================================//  Get Full Project //========================================================
  async getViewProject(req, res, next) {
    const id = req.params.id; // Fetch project ID from the request
    try {
      const viewproject = await this.trackerRepository.getById(id); // Get project by ID
      if (!viewproject) {
        return res.status(404).send("Project not found");
      }
      // Render the view with the project data
     return res.render("projectViewMore", { viewproject });
    }catch (error) {
      console.error("Error fetching project:", error.message);
     return res.status(500).send("Failed to fetch project");
    }
    next();
  }
// ===================================//  Post Update Project //========================================================
  async postupdateProjects(req, res) {
    try {
      console.log("Update Project", req.body);
      const {  _id,
        _projectname,
        _desc,
        _author,
        _priority,
        _status,
        _progress} = req.body;
        const newProject = new TrackerModel(_id,
          _projectname,
          _desc,
          _author,
          _priority,
          _status,
          _progress );
      await this.trackerRepository.update(newProject); // Ensure this is awaited
      let projects = await this.trackerRepository.getAll(); // Updated to use getAll()
      res.render("tracker", { projects });
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to update project");
    }
  }

  // Delete Project
  async postdeleteProjects(req, res) {
    try {
      const id = req.params.id;
      // Fetch project by ID to verify it exists

      const projectFound = await this.trackerRepository.getById(id);
      console.log("deleteproject",projectFound);
      if (!projectFound) {
        return res.status(404).send("Project Not Found"); // Use 404 for not found
      }
      // Delete the project
      await this.trackerRepository.delete(id);

      // Fetch updated list of projects from the database
      const projects = await this.trackerRepository.getAll();
      res.render("tracker", { projects });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).send("Internal Server Error");
    }
  }

// getting all projects
async getAllProjects(req, res) {

    const projects = await this.trackerRepository.getAll();
    res.render("fetchAllProjects", { projects });
  }

  // Filter Projects
  async filterProjects(req, res) {
    const filter = req.query;
    console.log(filter);
    const projects = await this.trackerRepository.filter(filter);
    res.render("fetchAllProjects", { projects });
  }
}