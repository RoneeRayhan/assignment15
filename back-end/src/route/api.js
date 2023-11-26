const express=require('express');
const Tas=require('../controller/TasksController');
const router=express.Router();





// Task
router.post("/create-task",Tas.createTask);
router.get("/delete-task/:id",Tas.deleteTask);
router.post("/update-task/:id",Tas.updateTask);
router.get("/list-task",Tas.listTask);
router.get("/task-by-id/:id",Tas.taskByID);




module.exports=router;