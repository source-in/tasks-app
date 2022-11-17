var editFormData;

function getFormData() {
    console.log(document.getElementById("completed").value)
    if (document.getElementById("completed").value) {
        return {
            title:document.getElementById("title").value,
            additionalInfo:document.getElementById("additionalInfo").value,
            completed:document.getElementById("completed").value
        }
    } else {
        return {
            title:document.getElementById("title").value,
            additionalInfo:document.getElementById("additionalInfo").value,
            //completed:document.getElementById("completed").value
        }
    }
    
}
function clearFormData() {
        document.getElementById("title").value = "";
        document.getElementById("additionalInfo").value = "";
        location.reload()
}

function setFormData(title, additionalInfo, completed) {
    document.getElementById("title").value = title;
    document.getElementById("additionalInfo").value = additionalInfo;
    document.getElementById("completed").value = completed;
}

// // set the message for form status
// function setSuccessMessage(message) {
//     document.getElementById("message").innerHTML = message;
// }
function editDataCall(id) {
    // call get user details by id API
        // editFormData =  response[0];
        // setFormData(editFormData.title,editFormData.additionalInfo)
        const taskId = parseInt(id)
        fetch("http://localhost:2000/tasks-app/v1/tasks/list").then(
                    (res)=>res.json()
                ).then((response)=>{
                    var tasks = response.message.tasks
                    tasks.forEach((task)=>{
                        if (task.id === taskId) {
                            setFormData(task.title, task.additionalInfo, task.completed)
                            editFormData = {
                                title: task.title,
                                additionalInfo: task.additionalInfo,
                                id: task.id
                            }
                        }
                    })
                }).then( () => {
                    document.getElementById("drpdown").style.display = "block"
                });           
}

// // callled this function when user click on button
function submitForm() {
        //console.log(editFormData)
        if (!editFormData){
            addUser(); // if the editFormData is undefined then call addUser()
        } else {
            editData(editFormData.id);
        }
        document.getElementById("drpdown").style.display = "none"
}
// // add user function 
function addUser() {
        let payload  = getFormData();
        console.log(payload)
        fetch("http://localhost:2000/tasks-app/v1/tasks/create",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        }).then((res)=>res.json()).then((response)=>{
            //setSuccessMessage(response.message)
                // clear input email and name
                //console.log("Sucess")
                clearFormData();
                getData(); // reload table 
                location.reload()
        })
}

// // edit data 
function editData(id) {
    var formData = getFormData();
        fetch("http://localhost:2000/tasks-app/v1/tasks/update/"+id,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        }).then((res)=>res.json()).then((response)=>{
            //setSuccessMessage(response.message)
                clearFormData(); // clear the form field
                getData() // reload the table
                location.reload()
        })
}

// delete data
function deleteData(id) {
    fetch("http://localhost:2000/tasks-app/v1/tasks/delete/"+id,{
        method:"DELETE"
    }).then((res)=>res.json()).then(
        (response)=>{
            console.log(response.message)
            //setSuccessMessage(response.message);
            getData();
        }
    )
    clearFormData();
    document.getElementById("drpdown").style.display = "none"
    location.reload()
}

// get data method
  
function getData() {
                fetch("http://localhost:2000/tasks-app/v1/tasks/list").then(
                    (res)=>res.json()
                ).then((response)=>{
                    var tmpData  = "";
                    var tmpData2  = "";
                    var tasks = response.message.tasks
                    //console.log(tasks);
                    tasks.forEach((task)=>{
                        if (task.completed === false) {
                            tmpData+="<tr>"
                            tmpData+="<td>"+task.title+"</td>";
                            tmpData+="<td>"+task.additionalInfo+"</td>";
                            tmpData+="<td><i class='fa-solid fa-pen' id='editBtn' onclick='editDataCall(`"+task.id+"`)'></i></td>";
                            //tmpData+="<td><button class='btn btn-primary' id='editBtn' onclick='editDataCall(`"+task.id+"`)'>Edit</button></td>";
                            tmpData+="<td><i class='fa-solid fa-trash' onclick='deleteData(`"+task.id+"`)'></i></td>";
                            //tmpData+="<td><button class='btn btn-danger' onclick='deleteData(`"+task.id+"`)'>Delete</button></td>";
                        
                            tmpData+="</tr>"; 
                        } else {
                            tmpData2+="<tr>"
                            tmpData2+="<td>"+task.title+"</td>";
                            tmpData2+="<td>"+task.additionalInfo+"</td>";
                            tmpData2+="<td><i class='fa-solid fa-pen' onclick='editDataCall(`"+task.id+"`)'></i></td>";
                            tmpData2+="<td><i class='fa-solid fa-trash' onclick='deleteData(`"+task.id+"`)'></i></td>";
                        
                            tmpData2+="</tr>"; 
                        }
                         
                    })
                    
                    document.getElementById("tb1Data").innerHTML = tmpData;
                    document.getElementById("tb2Data").innerHTML = tmpData2;
                })     
        }

getData();
