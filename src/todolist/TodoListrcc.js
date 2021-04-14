import React, { Component } from 'react'
import './style.css';
import axios from 'axios'

export default class TodoListrcc extends Component {

    state = {
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    }

    getTaskList = () => {
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/TodoList/GetAllTask',
            method: 'GET'
        });
        promise.then(res => {
            console.log("thanh cong");
            console.log(res.data);
            // Neu goi api thanh cong => setState
            this.setState({
                taskList: res.data
            })
        });
        promise.catch(err => {
            console.log("that bai");
            console.log(err);
        });
    }

    renderTaskTodo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
                <button className="remove" type="button" onClick={()=>this.delTask(item.taskName)}>
                    <i className="fa fa-trash-alt" />
                </button>
                <button className="complete" type="button" onClick={()=>this.checkTask(item.taskName)}>
                    <i className="far fa-check-circle" />
                    <i className="fas fa-check-circle" />
                </button>
            </div>
        </li>
        })
    }

    renderTaskTodoDone = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
                <button className="remove" type="button" onClick={()=>this.delTask(item.taskName)}>
                    <i className="fa fa-trash-alt" />
                </button>
                <button type="button" className="complete" onClick={() => this.rejectTask(item.taskName)}>
                    <i className="far fa-undo" />
                    <i className="fas fa-undo" />
                </button>
            </div>
        </li>
        })
    }

    rejectTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=?${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            this.getTaskList();
        });
        promise.catch(err => {
            alert(err);
        })
    }

    checkTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            this.getTaskList();
        });
        promise.catch(err => alert(err));
    }

    delTask = (taskName) => {
        // console.log(taskName);
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        promise.then(res => this.getTaskList());
        promise.catch(err => console.log(err));
    }

    componentDidMount(){
        this.getTaskList();
    }

    handleChange = (e) => {
        let {value, name} = e.target;
        console.log(value, name);
        let newValues = {...this.state.values};
        newValues = {...newValues, [name]: value}
        let newErrors = {...this.state.errors};
        let regexString = /^[a-z A-Z]+$/;
        if(!regexString.test(value) || value.trim() === ''){
            newErrors[name] = name + " is invalid !"
        }else{
            newErrors[name] = "";
        }
       
        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors
        })
    }

    addTask = (e) => {
        e.preventDefault();
        console.log(this.state.values.taskName);
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/TodoList/AddTask',
            method: 'POST',
            data: {
                taskName: this.state.values.taskName
            }
        })
        promise.then(res => this.getTaskList());
        promise.catch(err => console.log(err));
    }

    render() {
        return (
            <form onSubmit={this.addTask}>
                {/* <button onClick={() => {this.getTaskList()}}>Get task list</button> */}
           
            <div className="card">
                <div className="card__header">
                    <img src="./img/X2oObC4.png" />
                </div>
                {/* <h2>hello!</h2> */}
                <div className="card__body">
                    <div className="card__content">
                    <div className="form-group">
                    <div className="card__title">
                            <h2>My Tasks</h2>
                            <p>September 9,2020</p>
                        </div>
                        <div className="card__add">
                            <input name="taskName" onChange={this.handleChange} id="newTask" type="text" placeholder="Enter an activity..." />
                            
                            <button id="addItem" onClick={(e) => this.addTask(e)}>
                                <i className="fa fa-plus" />
                            </button>
                        </div>
                        <p className="text text-danger">{this.state.errors.taskName}</p>
                    </div>
                        
                        <div className="card__todo form-group">
                            {/* Uncompleted tasks */}
                            <ul className="todo" id="todo">
                                {this.renderTaskTodo()}
                            </ul>
                            {/* Completed tasks */}
                            <ul className="todo" id="completed">
                                {this.renderTaskTodoDone()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        )
    }
}
