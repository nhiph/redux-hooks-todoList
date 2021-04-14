import axios from 'axios';
import {GET_TASK_API} from '../constants/TodoListConst';

// ***************************ACTION****************************
// ***************************ACTION****************************
// Action co 2 loai:
// Loại 1: Action dạng object thực thi ngay làm thay đổi reducer
// Loại 2 (async action): Action dạng functionApi, thực hiện xử lý rồi gọi action 1 (object)
// Loại async action phải dùng thư viện, trả về hàm có tham số dispatch

// middleware ho tro return ve function (creator function), k phai action (object)

export const getTaskListApi = () => {
    // Tien xu ly du lieu => Xu ly function ben duoi
    return dispatch => {
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/TodoList/GetAllTask',
            method: 'GET'
        });
        promise.then(res => {
            console.log("thanh cong");
            console.log(res.data);
            // Neu goi api thanh cong => data dua len store quan ly = dispatch
            dispatch({
                type: GET_TASK_API,
                taskList: res.data
            })
        });
        promise.catch(err => {
            console.log("that bai");
            console.log(err);
        });
    }
}

export const addTaskApi = (taskName) => {
    return dispatch => {
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/TodoList/AddTask',
            method: 'POST',
            data: {
                taskName: taskName
            }
        })
        promise.then(res => dispatch(getTaskListApi()));
        promise.catch(err => console.log(err));
    }
}

export const deleteTaskApi = taskName => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        promise.then(res => dispatch(getTaskListApi()));
        promise.catch(err => console.log(err));
    }
}

export const checkTaskApi = taskName => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        });
        promise.then(res => {
            alert(res.data);
            dispatch(getTaskListApi());
        });
        promise.catch(err => alert(err));
    }
}

export const rejectTaskApi = taskName => {
    return dispatch => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=?${taskName}`,
            method: 'PUT'
        });
        // promise.then(res => {
        //     alert(res.data);
        //     dispatch(getTaskListApi());
        // });
        promise.then(res => {
            alert(res.data);
            dispatch(getTaskListApi());
        });
        promise.catch(err => {
            alert(err);
        })
    }
}