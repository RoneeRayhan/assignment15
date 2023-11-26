import React from 'react';
import AppNavBar from "../component/AppNavBar.jsx";
import TaskList from "../component/TaskList.jsx";

const ListPage = () => {
    return (
        <div>
            <AppNavBar/>
            <TaskList/>
        </div>
    );
};

export default ListPage;