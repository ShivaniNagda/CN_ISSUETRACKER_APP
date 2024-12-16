import { getDB } from "../config/mongodb.js";
import { ObjectId } from "mongodb";

export default class IssueRepository{
// Add Project
 async createBug(issueObj) {
    try {
      const db = getDB();
      const collection = db.collection("Issue");

      // Use provided _id or generate a new one
      await collection.insertOne(issueObj);

      const bugs = await collection.find({projectId:issueObj.projectId}).toArray();
      console.log("bug",bugs);
      console.log("Issue added:");
      return bugs;
    } catch (err) {
      console.error("Failed to add project:", err);
      throw new Error("Something went wrong while adding the project.");
    }
  }

// ===========================getAllIssue==========================
async getAllIssue(){
    const db = getDB();
    const collection = db.collection("Issue");
    return await collection.find().toArray();
}
// Get Issue by ID
 async getByProjectId(id) {
  const db = getDB();
  const collection = db.collection("Issue");
  const Issue =await collection.find({projectId:id}).toArray();

  if (!Issue) {
    throw new Error("Issue not found.");
  }
  return Issue;
}
// Get Issue by ID
 async getById(id) {
  const db = getDB();
  const collection = db.collection("Issue");
  const Issue = await collection.find({ _id: new ObjectId(id) }).toArray();
  console.log("Issue",Issue);
  if (!Issue) {
    throw new Error("Issue not found.");
  }
  return Issue;
}
// Delete
async deleteIssue(id) {
try {
      const db = getDB();
      const collection = db.collection("Issue");
  
      // Convert the id to ObjectId for MongoDB
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 0) {
        throw new Error("Project not found for deletion.");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
      throw new Error("Failed to delete project.");
   
    }
  }

// Filter ISsue
async filterIssueByLabel(filters,id){
  console.log(filters)
  const db = getDB();
  const collection = db.collection("Issue");
  const filter = await collection.find({
    projectId: id,
    bugLabels: { $in: filters }  
  }).toArray();
  console.log("filter",filter)
  return filter;
}}
  // Update Project
// static async update(projectObj) {
//   console.log("projectObj", projectObj);
  
  // Convert projectObj._id to ObjectId
//   projectObj._id = new ObjectId(projectObj._id);
  
  // Get the database and collection
//   const db = getDB();
//   const collection = db.collection("Project");
  
  // Update the project in the database
//   try {
//     const result = await collection.updateOne(
//       { _id: projectObj._id }, // Filter by ID
//       { $set: {                  // Update the specified fields
//           _projectname: projectObj._projectname,
//           _desc: projectObj._desc,
//           _author: projectObj._author,
//           _priority: projectObj._priority,
//           _status: projectObj._status,
//           _progress: projectObj._progress,
//         }
//       }
//     );

//     if (result.matchedCount === 0) {
//       throw new Error("Project not found for update.");
//     }
//   } catch (err) {
//     console.error("Error updating project:", err);
//     throw new Error("Failed to update project.");
//   }
// }

  // Delete Project
  // Delete Project
// static async delete(id) {
//   try {
//     const db = getDB();
//     const collection = db.collection("Project");

//     // Convert the id to ObjectId for MongoDB
//     const result = await collection.deleteOne({ _id: new ObjectId(id) });

//     if (result.deletedCount === 0) {
//       throw new Error("Project not found for deletion.");
//     }
//   } catch (err) {
//     console.error("Error deleting project:", err);
//     throw new Error("Failed to delete project.");
 
//   }
// }
// }