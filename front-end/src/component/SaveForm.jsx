import React, {useEffect, useState} from 'react';
import {toast, Toaster} from "react-hot-toast";
import {createTaskRequest, taskByIDRequest, updateTaskRequest} from "../apiRequest/apiRequest.js";
import {useNavigate} from "react-router-dom";
const SaveForm = () => {

    let navigate=useNavigate();
    let [FormValue,SetFormValue]=useState({email:"", title:"", description:"", status:""})
    let [UpdateID,SetUpdateID]=useState(null);


    useEffect(() => {
        (async ()=>{
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            SetUpdateID(id)
            if(id!==null){
               await FillForm(id)
            }
        })()
    }, []);
    
    const FillForm =async (id) => {
       let res= await taskByIDRequest(id)
       SetFormValue({
           email:res['email'],
           title:res['title'],
           description:res['description'],
           status:res['status']
       })
    }


    const InputOnChange = (name,value) => {
        SetFormValue((FormValue)=>({
            ...FormValue,
            [name]:value
        }))
    }

    const Save = async () => {
        if(FormValue.email.length===0){
            toast.error("Email Required !")
        }
        else if(FormValue.title.length===0){
            toast.error("Title Required !")
        }
        else if(FormValue.description.length===0){
            toast.error("Description Required !")
        }
        else if(FormValue.status.length===0){
            toast.error("Status Required !")
        }
        else{
            if(UpdateID==null){
                let res=await createTaskRequest(FormValue);
                if(res){
                    toast.success("Create Request Completed");
                    navigate("/");
                }
                else{
                    toast.error("Create Request Fail");
                }
            }
            else{
                let res=await updateTaskRequest(FormValue,UpdateID);
                if(res){
                    toast.success("Update Request Completed");
                    navigate("/");
                }
                else{
                    toast.error("Update Request Fail");
                }
            }


        }

    }


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4 p-2">
                    <label className="form-label">Your Email Address</label>
                    <input value={FormValue.email} onChange={(e)=>InputOnChange('email',e.target.value)} type="text" className="form-control" placeholder="Email"/>
                </div>
                <div className="col-md-4 p-2">
                    <label className="form-label">Your Title</label>
                    <input value={FormValue.title} onChange={(e)=>InputOnChange('title',e.target.value)} type="text" className="form-control" placeholder="Title"/>
                </div>
                <div className="col-md-4 p-2">
                    <label className="form-label">Your Description</label>
                    <input value={FormValue.description} onChange={(e)=>InputOnChange('description',e.target.value)} type="text" className="form-control" placeholder="Description"/>
                </div>
                <div className="col-md-4 p-2">
                    <label className="form-label">Your Status</label>
                    <input value={FormValue.status} onChange={(e)=>InputOnChange('status',e.target.value)}  type="text" className="form-control" placeholder="Status"/>
                </div>
                <div className="col-md-4 p-2">
                    <label className="form-label">Save Change</label><br/>
                    <button onClick={Save} className="btn w-100 btn-success">Submit</button>
                </div>
            </div>
            <Toaster position="bottom-center" />
        </div>
    );
};

export default SaveForm;