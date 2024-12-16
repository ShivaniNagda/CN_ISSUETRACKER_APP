import IssueModel from "../models/issue.model.js";
import IssueRepository from "../repository/issue.repository.js";

export default class IssueController {
  constructor() {
    this.issueRepository = new IssueRepository();
  }
  //============== Get Issue form for Create new Bugs =========================
  async createIssueForm(req, res) {
    console.log(req.body, req.params);
    const id = req.params.id;
    res.render("postBug", { id });
  }

  //  ==================== post Create Issue ===============================
  async createIssue(req, res) {
    console.log("req.body", req.body);
    console.log("req.query", req.query);
    try {
      const { bugTitle, bugDesc, bugauthor, bugLabels, projectId } = req.body;
      const newIssue = {
        bugTitle,
        bugDesc,
        bugauthor,
        bugLabels,
        projectId,
        createdAt: new Date().toISOString(),
      };
      const newissuee = await this.issueRepository.createBug(newIssue);
      res.render("createbug", { bugs: newissuee ,id:projectId});
    } catch (error) {
      console.error("Error creating issue:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  // ==================== getIssue ===================================
  async getIssue(req, res) {
   try{
    const id = req.params.id;
    let bugs = await this.issueRepository.getByProjectId(id); // Updated to use getAll()
    res.render("createbug", { bugs, id });
  }catch(err){
    console.error("Error getting issue:", err);
    res.status(500).render('pagenotFound');
  }
  }

  // =======================Delete Issue ============================
  async deleteIssue(req, res) {
    console.log(req.params.id);
    const id = req.params.id;
    try {
      const deletedIssue = await this.issueRepository.deleteIssue(id);
      res.redirect("back");
    } catch (error) {
      console.error("Error deleting issue:", error);
      res.status(500).render("pagenotFound");
    }
  }
  // =========  Filter Issue ================================
  async filterIssue(req, res) {
    const id = req.params.id;
    try{
    const filterData = Object.keys(req.query)
      .filter((key) => req.query[key])
      .map((key) => key);
    if (filterData.length === 0) {
      return res.redirect("back");
    }
 
    const bugs = await this.issueRepository.filterIssueByLabel(filterData, id);
    res.render("createbug", { bugs, id });
  }catch(err){
  console.error("Error getting issue:", err);
  res.status(500).render('pagenotFound');
}
  }}
