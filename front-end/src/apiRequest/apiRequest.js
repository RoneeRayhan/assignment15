import axios from "axios";

export async function listTaskRequest(){
    try {
        let res=await fetch("http://localhost:5010/api/v1/list-task");
        let JSONData=await res.json();
        return JSONData['data'];
    }catch (e) {
        return []
    }
}

export async function taskByIDRequest(id){
    try {
        let res=await fetch("http://localhost:5010/api/v1/task-by-id/"+id);
        let JSONData=await res.json();
        return JSONData['data'][0];
    }catch (e) {
        return []
    }
}








export async function createTaskRequest(postBody){
    try {
        let res=await axios.post("http://localhost:5010/api/v1/create-task",postBody);
        if(res.status===200){
            return true;
        }
        else{
            return  false
        }

    }catch (e) {
        return  false
    }
}



export async function updateTaskRequest(postBody,id){
    try {
        let res=await axios.post("http://localhost:5010/api/v1/update-task/"+id,postBody);
        if(res.status===200){
            return true;
        }
        else{
            return  false
        }

    }catch (e) {
        return  false
    }
}



export async function deleteTaskRequest(id){
    try {
        let res=await fetch("http://localhost:5010/api/v1/delete-task/"+id);
        let JSONData=await res.json();
        if(JSONData['status']==="success"){
            return  true;
        }else{
            return  false;
        }
    }catch (e) {
        return  false;
    }
}