import {v4 as uuidv4} from "../snowpack/pkg/uuid.js";
const form = document.getElementById("form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = document.getElementById("desc");
  const severity = document.getElementById("severity");
  const assignedTo = document.getElementById("assigned-to");
  const descriptionValue = description.value;
  const severityValue = severity.value;
  const assignedToValue = assignedTo.value;
  const id = uuidv4();
  const newIssue = {
    id,
    status: "Open",
    description: descriptionValue,
    severity: severityValue,
    assignedTo: assignedToValue
  };
  const store = localStorage.getItem("issues");
  if (store === null) {
    let issuesArr = [];
    issuesArr.push(newIssue);
    localStorage.setItem("issues", JSON.stringify(issuesArr));
  } else {
    let existingArray = JSON.parse(store);
    existingArray.push(newIssue);
    localStorage.setItem("issues", JSON.stringify(existingArray));
  }
  renderPosts();
});
function closeIssue(id) {
  const store = localStorage.getItem("issues");
  if (store !== null) {
    let existingArray = JSON.parse(store);
    let itemYouWantToClose = existingArray.find((item) => item.id === id);
    if (itemYouWantToClose === void 0)
      return;
    itemYouWantToClose.status = "Closed";
    localStorage.setItem("issues", JSON.stringify(existingArray));
    renderPosts();
  }
}
function deleteIssue(id) {
  const store = localStorage.getItem("issues");
  if (store !== null) {
    let existingArray = JSON.parse(store);
    let itemYouWantToDelete = existingArray.find((item) => item.id === id);
    if (itemYouWantToDelete === void 0)
      return;
    for (let i = 0; i < existingArray.length; i++) {
      if (existingArray[i].id === id) {
        existingArray.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("issues", JSON.stringify(existingArray));
    renderPosts();
  }
}
function renderPosts() {
  const unorderedList = document.getElementById("unordered-list");
  unorderedList.innerHTML = "";
  const store = localStorage.getItem("issues");
  if (store !== null) {
    let existingArray = JSON.parse(store);
    existingArray.forEach((issue) => {
      const li = document.createElement("li");
      li.classList.add("issue-wrapper");
      li.innerHTML = `<div>Issue ID: ${issue.id}</div>
      <div class="open-status">${issue.status}</div>
      <h1>${issue.description}</h1>
      <div class="severity-user">
      <span class="material-symbols-outlined">schedule</span>
      <div class="severity">${issue.severity}</div><span id="account-circle" class="material-symbols-outlined">
      account_circle
      </span><div class="assigned-to">${issue.assignedTo}</div></div>`;
      const deleteBtn = document.createElement("button");
      deleteBtn.id = "delete-btn";
      deleteBtn.innerText = "Delete";
      deleteBtn.addEventListener("click", () => {
        deleteIssue(issue.id);
      });
      li.appendChild(deleteBtn);
      if (issue.status === "Open") {
        const closeButton = document.createElement("button");
        closeButton.classList.add("close-btn");
        closeButton.innerText = "Close";
        closeButton.addEventListener("click", () => {
          closeIssue(issue.id);
        });
        li.appendChild(closeButton);
      }
      unorderedList.appendChild(li);
    });
  }
}
renderPosts();
