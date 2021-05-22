import axios from 'axios';
import {all, fork, put, take, takeEvery} from 'redux-saga/effects';
import {GET_TASK_API} from '../constants/TodoListConst';
import * as TodoListSaga from './TodoListSaga';

export function * RootSaga(){
    // yield fork(getTaskApi); //fork nhan vao action, khi mo app, chay saga run => chay rootsaga
    // yield takeEvery('getTaskApiAction', getTaskApi);
    yield all([
        // Nghiep vu theo doi cac action saga todolist
        TodoListSaga.theoDoiActionGetTaskApi(),
        TodoListSaga.theoDoiActionAddTaskApi(),
        TodoListSaga.theoDoiActionDeleteTaskApi(),
        TodoListSaga.theoDoiActionDoneTaskApi(),
        TodoListSaga.theoDoiActionRejectTaskApi()
        // Nghiep vu khac
        // .....
    ])
}
