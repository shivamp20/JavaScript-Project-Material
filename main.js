document
  .getElementById('issueInputForm')
  .addEventListener('submit', saveIssues);
function saveIssues(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssigned = document.getElementById('issueAssignToInput').value;
  var issueId = chance.guid();
  var issueStatus = 'open';

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssigned,
    status: issueStatus,
  };

  if (localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }
  document.getElementById('issueInputForm').reset();
  issueFunction();
  e.preventDefault();
}
function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'closed';
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));

  issueFunction();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }
  localStorage.setItem('issues', JSON.stringify(issues));

  issueFunction();
}

function issueFunction() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';
  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issuesList.innerHTML +=
      '<div class="jumbotron" id="secondbox">' +
      '<h6>Issue ID' +
      id +
      '</h6>' +
      '<p><span class = "label label-info">' +
      status +
      '</span></p>' +
      '<h4>' +
      desc +
      '</h4>' +
      '<p><i class="fas fa-clock"></i>' +
      severity +
      '</span></p>' +
      '<p><i class="fas fa-user"></i>' +
      assignedTo +
      '</p>' +
      '<a href="#" onclick="setStatusClosed(\'' +
      id +
      '\')"  class = "btn btn-warning  mr-1">Close</a >' +
      '<a href="#"  onclick ="deleteIssue(\'' +
      id +
      '\')" class = "btn btn-danger   mr-1">Delete</a>' +
      '</div>';
  }
}
