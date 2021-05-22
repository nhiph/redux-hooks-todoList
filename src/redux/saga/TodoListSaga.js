import axios from 'axios';
import { call, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { STATUS_CODE } from '../../utils/constants/SettingSystem';
import { ADD_TASK_API, CHECK_TASK_API, DELETE_TASK_API, GET_TASKLIST_API, GET_TASK_API, REJECT_TASK_API } from '../constants/TodoListConst';
import { todoListService } from '../services/TodoListService';
/*
redux co 2 loai action
loai 1: action => object 
loai 2: action => function (xu ly api hoac call function khac), dung middleware
*/

function* getTaskApiAction(action) {
    let { data, status } = yield call(todoListService.getTaskApi)
    try {
        // Sau khi thanh cong, dung put (saga) ~ dispatch(thunk)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_API,
                taskList: data
            })
        }
        else {
            console.log('error')
        }
    }
    catch (err) {
        console.log("err");
    }
}

export function* theoDoiActionGetTaskApi() {
    yield takeLatest(GET_TASKLIST_API, getTaskApiAction);
}

function* addTaskApiAction(action) {
    console.log(action);
    const {taskName} = action;
    // goi api
    try{
        const {data, status} = yield call(() => { return todoListService.addTaskApi(taskName) })
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type: GET_TASKLIST_API
            })
        }
    }
    catch(err){
        console.log("err");
    }
    
    // hien thi loading
    // thanh cong thi goi lai action saga load tasklist
}

export function* theoDoiActionAddTaskApi() {
    yield takeLatest(ADD_TASK_API, addTaskApiAction)
}

function * deleteTaskApi(action) {
    const {taskName} = action;
    try{
        const {data, status} = yield call(() => {
            return todoListService.deleteTaskApi(taskName);
        });
        if(status==STATUS_CODE.SUCCESS){
            // neu thanh cong thi goi lai action get tasklist api
            yield put({
                type: GET_TASKLIST_API
            })
        }
        
    }
    catch(err){
        console.log(err);
    }
}

export function* theoDoiActionDeleteTaskApi() {
    yield takeLatest(DELETE_TASK_API, deleteTaskApi)
}

function* checkDoneTaskApi(action) {
    const {taskName} = action;
    try{
        const {data, status} = yield call(() => {return todoListService.checkDoneTask(taskName)});
        if(status==STATUS_CODE.SUCCESS){
            yield put({
                type: GET_TASKLIST_API
            })
        }
    }
    catch(err){
        console.log(err);
    }
}

export function* theoDoiActionDoneTaskApi() {
    yield takeLatest(CHECK_TASK_API, checkDoneTaskApi)
}

function* rejectTask(action) {
    console.log(action);
    const {taskName} = action;
    try{
        const {data, status} = yield call(() => {return todoListService.rejectTask(taskName)});
        if(status == STATUS_CODE.SUCCESS){
            yield put({
                type: GET_TASKLIST_API
            })
        }
    }
    catch(err){
        console.log(err);
    }
}

export function* theoDoiActionRejectTaskApi() {
    yield takeLatest(REJECT_TASK_API, rejectTask)
}