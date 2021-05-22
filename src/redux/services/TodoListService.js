import React, { Component } from 'react';
import axios from 'axios';
import {DOMAIN} from '../../utils/constants/SettingSystem';

export class TodoListService {
    constructor(){
    }
    getTaskApi = () => {
        return axios({
            url: `${DOMAIN}/TodoList/GetAllTask`,
            method: 'GET'
        })
    }

    addTaskApi = (taskName) => {
        return axios({
            url: `${DOMAIN}/TodoList/addTask`,
            method: 'POST',
            data: {
                taskName: taskName
            }
        })
    }

    deleteTaskApi = (taskName) => {
        return axios({
            url: `${DOMAIN}/TodoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
    }

    checkDoneTask =(taskName)=>{
        return axios({
            url: `${DOMAIN}/TodoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
    }

    rejectTask =(taskName)=>{
        return axios({
            url: `${DOMAIN}/TodoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })
    }
}

export const todoListService = new TodoListService();

// Noi tuong tac vs backend