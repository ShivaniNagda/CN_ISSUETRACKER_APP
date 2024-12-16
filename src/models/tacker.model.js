
export default class TrackerModel {
  constructor(
    _id,
    _projectname,
    _desc,
    _author,
    _priority,
    _status,
    _progress
  ) {
    this._id = _id;
    this._projectname = _projectname;
    this._desc = _desc;
    this._author = _author;
    this._priority = _priority;
    this._status = _status;
    this._progress = _progress;
  }
}
