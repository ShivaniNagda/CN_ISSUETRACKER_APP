

export default class IssueModel {
  constructor(
    bugTitle,
    bugDesc,
    bugauthor,
    bugLabels,
    projectId ,
    createdAt,
    _bugid,
  ) {
    this.bugTitle = bugTitle;
    this.bugDesc = bugDesc;
    this.bugauthor =bugauthor;
    this.buglabel = bugLabels;
    this.projectId =projectId,
    this.createdAt=createdAt,
    this._id = _bugid;
   
  }

 
}

// Sample Project Data (Optional)
// const Issue = [];