import React from 'react';
import styleLoading from './LoadingComponent.module.css';

export default function LoadingComponent() {
    return (
        <div className={styleLoading.bgLoading}>
            <img  src={require('../../BaiTapToDoListSaga/id-loading-1.gif')}/>
        </div>
    )
}
