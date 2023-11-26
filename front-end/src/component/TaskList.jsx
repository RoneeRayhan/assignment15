import React, {useEffect, useState} from 'react';
import {deleteTaskRequest, listTaskRequest} from "../apiRequest/apiRequest.js";
import {toast, Toaster} from "react-hot-toast";
import {Link} from "react-router-dom";

const TaskList = () => {

    let [data,setData]=useState([]);
    let [change,setChange]=useState(0);

    useEffect(() => {
        (async ()=>{
          let res= await listTaskRequest();
          setData(res);
        })()
    }, [change]);

    const onDelete =async(id) => {
       let res= await deleteTaskRequest(id);
       if(res){
           toast.success("Delete completed");
           setChange(new Date().getTime())
       }else {
           toast.error("Delete fail")
       }
    }


    if(data.length===0){
        return (
            <div>
                <h1>Loading.....</h1>
            </div>
        );
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                      <tr>
                                          <th>Email</th>
                                          <th>Title</th>
                                          <th>Description</th>
                                          <th>Status</th>
                                          <th>Action</th>
                                      </tr>
                                </thead>
                                <tbody>
                                     {
                                         data.map((item,i)=>{
                                             return(
                                                 <tr key={i}>
                                                     <td>{item['email']}</td>
                                                     <td>{item['title']}</td>
                                                     <td>{item['description']}</td>
                                                     <td>{item['status']}</td>
                                                     <td>
                                                         <button onClick={()=>{onDelete(item['_id'])}} className="btn btn-danger">Delete</button>
                                                         <Link className="btn mx-2 btn-success" to={"/save?id="+item['_id']}>Edit</Link>
                                                     </td>
                                                 </tr>
                                             )
                                         })
                                     }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Toaster position="bottom-center" />
            </div>
        );
    }
};

export default TaskList;