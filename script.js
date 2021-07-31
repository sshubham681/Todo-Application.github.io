// getting values of elements 
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField .addBtn");
const todoList = document.querySelector(".todoList");

const clearAllBtn = document.querySelector(".footer button");

const pendingTask = document.querySelector(".pendingTask");
showTask();

inputBox.onkeyup = () => {
    let userData = inputBox.value;  //getting input box value
    if (userData.trim() != 0) {
        addBtn.classList.add("active");
    } else {
        addBtn.classList.remove("active");
    }
}
//Add button operation  
addBtn.addEventListener("click", function () {
    let userData = inputBox.value;   //grab value of inputBox
    if (userData.trim() != 0) {    // if userData is not null ==>>  will not submit null values

        let getLocalStorage = localStorage.getItem("My Data");
        if (getLocalStorage == null)
            newArr = [];           //creating a blank array
        else
            newArr = JSON.parse(getLocalStorage); //changing JS String into JS Object so that we can apply methods on JS Objects
        newArr.push(userData);
        localStorage.setItem("My Data", JSON.stringify(newArr));  //changing JS Object into JS String bcoz Data is stored in local storage in the form of String 
        inputBox.value = "";
    }
    showTask();
})

//function to show task   
function showTask() {

    let getLocalStorage = localStorage.getItem("My Data");  //creating localStorage variable

    if (getLocalStorage == null) {    //if it local storage is null make an empty array
        newArr = [];
    } else {
        newArr = JSON.parse(getLocalStorage);
    }
    let tag = '';
    newArr.forEach((element, index) => {            //put data 
        tag += `<li>${index + 1}. ${element} <span><i onclick="editTask(${index})" id="edit" class="fas fa-edit"></i>
        <i onclick="deleteTask(${index})" class= "fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = tag;


    // counting of current pending tasks 
    const pendingTask = document.querySelector(".pendingTask");
    pendingTask.textContent = newArr.length;

    //enabling clear all button if pending tasks are greater than 1 else disable button
    if (newArr.length > 0) {
        clearAllBtn.classList.add("active");
    } else {
        clearAllBtn.classList.remove("active");
    }
    const isPlural = document.querySelector(".isPlural");
    if (newArr.length == 1) {
        isPlural.textContent = " task";
    } else {
        isPlural.textContent = " tasks";
    }

}
//delete function 
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("My Data");
    newArr = JSON.parse(getLocalStorage);
    newArr.splice(index, 1);
    localStorage.setItem("My Data", JSON.stringify(newArr));
    inputBox.value = "";
    showTask();
}
//clear all button 
clearAllBtn.onclick = () => {
    newArr = [];
    localStorage.setItem("My Data", JSON.stringify(newArr));
    inputBox.value = "";
    showTask();
}

//edit function 
function editTask(index) {

    const saveIndex = document.getElementById("saveIndex");
    const addBtn = document.querySelector(".inputField .addBtn");
    const updateBtn = document.querySelector(".inputField .updateBtn");
    saveIndex.value = index;
    let getLocalStorage = localStorage.getItem("My Data");
    newArr = JSON.parse(getLocalStorage);
    inputBox.value = newArr[index];
    addBtn.style.display = "none";
    updateBtn.style.display = "block";
}
//update function
const updateBtn = document.querySelector(".inputField .updateBtn");
updateBtn.addEventListener("click", function () {
    let getLocalStorage = localStorage.getItem("My Data");
    newArr = JSON.parse(getLocalStorage);
    let saveIndex = document.getElementById("saveIndex").value;
    newArr[saveIndex] = inputBox.value;
    localStorage.setItem("My Data", JSON.stringify(newArr));
    addBtn.style.display = "block";
    updateBtn.style.display = "none";
    inputBox.value = "";
    showTask();
})