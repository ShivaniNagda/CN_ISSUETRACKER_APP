import { getDB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

export default class TrackerRepository {
  //=========================== Get all projects from the database ===========================
  async getAll() {
    const db = getDB();
    const collection = db.collection("Project");
    return await collection.find().toArray(); // Fetch all projects from the database
  }
  //=========================== Add Project ==================================================
  async add(projectObj) {
    try {
      const db = getDB();
      const collection = db.collection("Project");

      // Use provided _id or generate a new one

      await collection.insertOne(projectObj);
      return projectObj;
    } catch (err) {
      console.error("Failed to add project:", err);
      throw new Error("Something went wrong while adding the project.");
    }
  }

  //=========================== Get project by ID ===========================
  async getById(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ID format.");
    }
    const db = getDB();
    const collection = db.collection("Project");
    const project = await collection.findOne({ _id: new ObjectId(id) });
    if (!project) {
      throw new Error("Project not found.");
    }
    return project;
  }

  //=========================== Update Project ===========================
  async update(projectObj) {
    // Convert projectObj._id to ObjectId
    projectObj._id = new ObjectId(projectObj._id);

    // Get the database and collection
    const db = getDB();
    const collection = db.collection("Project");

    // Update the project in the database
    try {
      const result = await collection.updateOne(
        { _id: projectObj._id }, // Filter by ID
        {
          $set: {
            // Update the specified fields
            _projectname: projectObj._projectname,
            _desc: projectObj._desc,
            _author: projectObj._author,
            _priority: projectObj._priority,
            _status: projectObj._status,
            _progress: projectObj._progress,
          },
        }
      );

      if (result.matchedCount === 0) {
        throw new Error("Project not found for update.");
      }
    } catch (err) {
      console.error("Error updating project:", err);
      throw new Error("Failed to update project.");
    }
  }

  // =========================== Delete Project ===========================
  async delete(id) {
    try {
      const db = getDB();
      const collection = db.collection("Project");

      // Convert the id to ObjectId for MongoDB
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      console.log("delete on model", result);
      if (result.deletedCount === 0) {
        throw new Error("Project not found for deletion.");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
      throw new Error("Failed to delete project.");
    }
  }

  //=========================== Filter Project  ===========================
  async filter(filterData) {
    const db = getDB();
    const collection = db.collection("Project");
    // const authors = await collection.distinct('_author');
    // Build the query dynamically based on the filters provided
    let query = {};

    // Check for each filter and apply it if present
    if (filterData.author) {
      query._author = filterData.author; // Filter by author
    }
    if (filterData.priority) {
      query._priority = filterData.priority; // Filter by priority
    }
    if (filterData.status) {
      query._status = filterData.status; // Filter by status
    }
    if (filterData.progress) {
      query._progress = filterData.progress; // Filter by progress
    }
    if (filterData.urgent) {
      query._urgent = true; // Filter by urgent
    }
    if (filterData.search) {
      query.$or = [
        { _author: { $regex: filterData.search, $options: "i" } }, // Search by author
        { _projectname: { $regex: filterData.search, $options: "i" } }, // Search by project name
        { _desc: { $regex: filterData.search, $options: "i" } }, // Search by description
      ];
    }
    // Fetch the filtered projects from the database
    const projects = await collection.find(query).toArray();
    return projects;
  }
}
