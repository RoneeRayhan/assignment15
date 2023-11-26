const TaskModel=require('../models/TasksModel');


// Create 
exports.createTask=async(req, res)=> {
    let reqBody=req.body;
    try{
        let result=await TaskModel.create(reqBody);
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


// Delete
exports.deleteTask=async(req, res)=> {
    let id=req.params.id;
    let query={_id:id};
    try{
        let result=await TaskModel.deleteOne(query);
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


// Update
exports.updateTask=async(req, res)=> {
    let id=req.params.id;
    let reqBody=req.body;
    let query={_id:id};
    try{
        let result=await TaskModel.updateOne(query,reqBody);
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}



// Read
exports.listTask=async(req, res)=> {
    try{
        let result=await TaskModel.find();
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}


exports.taskByID=async(req, res)=> {
    try{
        let id=req.params.id;
        let query={_id:id};
        let result=await TaskModel.find(query);
        res.status(200).json({status:"success",data:result})
    }
    catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
}




