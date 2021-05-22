import axios from 'axios';
import {GET_TASK_API} from '../constants/TodoListConst';

// ***************************ACTION****************************
// ***************************ACTION****************************
// Action co 2 loai:
// Loại 1: Action dạng object thực thi ngay làm thay đổi reducer, action là object 
// Đối vs action aysnc thì phải cài đạt thư viện, redux-thunk hoặc saga để dispatch 
// Loại 2 (async action): Action dạng functionApi, thực hiện xử lý api khi thành công, 
// respone se được dispatch action object rồi gọi action 1 (object)
// Loại async action phải dùng thư viện, trả về hàm có tham số dispatch, thành cồn sẽ dispatch 

// middleware ho tro return ve function (creator function), k phai action (object)

// Ở ES: axios trả về promise, đợi làm xong cái này thì cái khác mới làm
//  => cách viết mới promise: là asyns await, xử lý các trg hợp bất đồng bộ => chạy tuần tự lại
export const getTaskListApi = () => {
    // Tien xu ly du lieu => Xu ly function ben duoi

    return async dispatch =>{
        try{
            let {data, status, ...res} = await axios({
                url: 'http://svcy.myclass.vn/api/TodoList/GetAllTask',
                method: 'GET'
            });
    
            if(status===200){
                dispatch({
                    type: GET_TASK_API,
                    taskList: data
                });
            }
        }
        catch(err){
            console.log("err", err);
        }
        
        // console.log('res',res);
    }

    /* 
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
    */
}

export const addTaskApi = (taskName) => {

    return async dispatch => {
        try{
            let {status, data} = await axios({
                        url: 'http://svcy.myclass.vn/api/TodoList/AddTask',
                        method: 'POST',
                        data: {taskName: taskName}
                    });
                    if(status===200){
                        dispatch(getTaskListApi());
                    }
        }catch(err){
            console.log(err);
        }
    }


    // return dispatch => {
    //     let promise = axios({
    //         url: 'http://svcy.myclass.vn/api/TodoList/AddTask',
    //         method: 'POST',
    //         data: {
    //             taskName: taskName
    //         }
    //     })
    //     promise.then(res => dispatch(getTaskListApi()));
    //     promise.catch(err => console.log(err));
    // }
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