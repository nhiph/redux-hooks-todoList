import React, {useState, useEffect} from 'react';
import './style.css'
import axios from 'axios'


export default function TodoListrfc(props) {

    let [state, setState] = useState({
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    });

    console.log(state);
    const handleChange = (e) => {
        let {value, name} = e.target;
        console.log(value, name);
        let newValues = {...state.values};
        newValues = {...newValues, [name]: value}
        let newErrors = {...state.errors};
        let regexString = /^[a-z A-Z]+$/;
        if(!regexString.test(value) || value.trim() === ''){
            newErrors[name] = name + " is invalid !"
        }else{
            newErrors[name] = "";
        }
       
        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })
    }

    const getTaskList = () => {
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/TodoList/GetAllTask',
            method: 'GET'
        });
        promise.then(res => {
            console.log("thanh cong");
            console.log(res.data);
            // Neu goi api thanh cong => setState
            setState({
                ...state,
                taskList: res.data
            })
        });
        promise.catch(err => {
            console.log("that bai");
            console.log(err);
        });
    }

    const addTask = (e) => {
        e.preventDefault();
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/TodoList/AddTask',
            method: 'POST',
            data: {
                taskName: state.values.taskName
            }
        })
        promise.then(res => getTaskList());
        promise.catch(err => console.log(err));
    }

    useEffect(() => {
        getTaskList();
        return () => {
        }
    }, [])

    const rejectTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=?${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            getTaskList();
        });
        promise.catch(err => {
            alert(err);
        })
    }

    const checkTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            getTaskList();
        });
        promise.catch(err => alert(err));
    }

    const delTask = (taskName) => {
        // console.log(taskName);
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        promise.then(res => getTaskList());
        promise.catch(err => console.log(err));
    }

    const renderTaskTodo = () => {
        return state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
                <button className="remove" type="button" onClick={()=>delTask(item.taskName)}>
                    <i className="fa fa-trash-alt" />
                </button>
                <button className="complete" type="button" onClick={()=>checkTask(item.taskName)}>
                    <i className="far fa-check-circle" />
                    <i className="fas fa-check-circle" />
                </button>
            </div>
        </li>
        })
    }

    const renderTaskTodoDone = () => {
        return state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
                <button className="remove" type="button" onClick={()=>delTask(item.taskName)}>
                    <i className="fa fa-trash-alt" />
                </button>
                <button type="button" className="complete" onClick={() => rejectTask(item.taskName)}>
                    <i className="far fa-undo" />
                    <i className="fas fa-undo" />
                </button>
            </div>
        </li>
        })
    }

    return (
        <div className="card">
            <div className="card__header">
                <img src="./img/X2oObC4.png" />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body" onSubmit={addTask}>
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input name="taskName" id="newTask" type="text" onChange={handleChange} placeholder="Enter an activity..." />
                        <button id="addItem" type="subtmit" onClick={addTask}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskTodo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskTodoDone()}
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    )
}
