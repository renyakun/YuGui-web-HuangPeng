import { message } from 'antd';

import {
    getUserInfo,
    getUserNotifyInfo,
    getWaitCheckList,
    getWaitApproveList,
} from '@/services/userinfo';

export default {
    namespace: 'userseting',
    state: {
        info: {},
        notifyinfo: {},
        waitchecklist: [],
        waitapprovelist: [],
    },
    effects: {
        *fetchUserInfo(_, { call, put }) {
            const res = yield call(getUserInfo);
            if (res) {
                if (res.ok) {
                    const info = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { info },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
      },
        *fetchUserNotifyInfo(_, { call, put }) {
            const res = yield call(getUserNotifyInfo);
            if (res) {
                if (res.ok) {
                    const notifyinfo = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { notifyinfo },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },

       
        *fetchWaitCheckList(_, { call, put }) {
            const res = yield call(getWaitCheckList);
            if (res) {
                if (res.ok) {
                    const waitchecklist = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { waitchecklist },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },



        *fetchWaitApproveList(_, { call, put }) {
            const res = yield call(getWaitApproveList);
            if (res) {
                if (res.ok) {
                    const waitapprovelist = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { waitapprovelist },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },
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