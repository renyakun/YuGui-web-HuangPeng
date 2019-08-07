import { queryResource } from '@/services/userinfo';

export default {
    namespace: 'userseting',
    state: {
        notifyinfo: {
            checkNum: 6,
            proveNum: 8
        }
    },
    effects: { //新增effects配置，用于异步加载数据
        // *initData(params, sagaEffects) { //定义异步方法
        //     const { call, put } = sagaEffects; //获取到call、put方法
        //     const url = "/tk/task"; // 定义请求的url
        //     let data = yield call(requests, url); //执行请求
        //     yield put({ // 调用reducers中的方法
        //         type: "saveList", //指定方法名
        //         data: data //传递ajax回来的数据
        //     });
        // }
        *fetchUserNotifyInfo({ payload }, { call, put }) {
            const response = yield call(queryResource, payload);
            yield put({
                type: 'saveList',
                payload: response,
            })
        }
    },
    reducers: {
        saveList(state, action) {
            return {
                ...state,
                ...action.payload,
            }
        }
    }


};