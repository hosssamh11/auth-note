// checkLoginStatus()
window.onload= function() {
    const loginadmin = getcookie("loginadmin");

    if (!loginadmin || loginadmin === "0") {
        // If the cookie doesn't exist or has a value of "0", redirect to the login page
        window.location.href = "./login";
    }
}
let task=document.querySelector(".taskvalue")
let add=document.querySelector(".add")
let viewtasks=document.querySelector(".viewtask")
//array to add tasks
let arroftasks=[];
getlocal();
if (localStorage.getItem("tasks")) {
   arroftasks = JSON.parse(localStorage.getItem("tasks"));
 }
add.onclick=function (){
    if (task.value !== ""){
        addtask(task.value)
        task.value=""
    }
}
// add task
function addtask(task){
    let obj={
        id: Date.now(),
        value: task,
        
    };
    arroftasks.push(obj);
    displayTask(arroftasks);
    addtolocal(arroftasks);
}

// add to local storage
function addtolocal(arroftasks){
    localStorage.setItem("tasks",JSON.stringify(arroftasks))
    
}
//get from local storage
function getlocal(){
    let data=localStorage.getItem("tasks")
    displayTask(JSON.parse(data));
}
//delete from storge
function deletlocal(taskid){
    arroftasks=arroftasks.filter((ele)=>ele.id!=taskid)
    displayTask(arroftasks)
    addtolocal(arroftasks)
}
// to display tasks
function displayTask(eles) {
    viewtasks.innerHTML = "";
    eles.forEach(function (ele) {
        let div = document.createElement("div");
        div.className = "viewtask";
        div.setAttribute("task-id", ele.id);
        let textNode = document.createTextNode(ele.value);
        div.appendChild(textNode);

        let delBtn = document.createElement("span");
        delBtn.appendChild(document.createTextNode("Delete"));
        // span.className = "del";
        div.appendChild(delBtn);

        // Create an input for editing the task
        let editInput = document.createElement("input");
        editInput.type = "text";
        editInput.style.display = "none";
        div.appendChild(editInput);

        // Create "Edit" and "Save" buttons
        let editBtn = document.createElement("span");
        editBtn.appendChild(document.createTextNode("Edit"));
        div.appendChild(editBtn);

        let saveBtn = document.createElement("span");
        saveBtn.appendChild(document.createTextNode("Save"));
        saveBtn.style.display = "none";
        div.appendChild(saveBtn);

        // Event listener for the "Edit" button
        editBtn.addEventListener("click", function () {
            textNode.nodeValue = ""; // Set text to empty string to hide it
            editInput.style.display = "inline-block";
            editInput.value = ele.value;
            editBtn.style.display = "none";
            saveBtn.style.display = "inline-block";
        });
        // Event listener for the "Save" button
        saveBtn.addEventListener("click", function () {
            ele.value = editInput.value;
            textNode.nodeValue = ele.value;
            addtolocal(eles);
            displayTask(eles);
        });
        delBtn.addEventListener("click", function () {
            deletlocal(ele.id); // Use ele.id to get the task id
            // displayTask(eles); // Refresh the display after deletion
        });
        viewtasks.appendChild(div);
    });
}



