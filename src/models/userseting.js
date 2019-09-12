import { message } from 'antd';
import { routerRedux } from 'dva/router';
import {
    getAddUser,
    getUpdateUser,
    getDeleteUser,
    getUserInfo,
    getUserList,
    getUserNotifyInfo,
    getTodayNotify,
    getWaitCheckList,
    getWaitApproveList,
} from '@/services/userinfo';

export default {
    namespace: 'userseting',
    state: {
        info: {},
        userlist: {},
        notifyinfo: {},
        todaynotify: {},
        waitchecklist: [],
        waitapprovelist: [],
    },
    effects: {
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

        *fetchTodayNotify(_, { call, put }) {
            const res = yield call(getTodayNotify);
            if (res) {
                if (res.ok) {
                    const todaynotify = res.data;
                    console.log(todaynotify);
                    yield put({
                        type: 'saveList',
                        payload: { todaynotify },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *fetchWaitCheckList({ payload }, { call, put }) {
            const res = yield call(getWaitCheckList, payload);
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

        *fetchWaitApproveList({ payload }, { call, put }) {
            const res = yield call(getWaitApproveList, payload);
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

        *getAddUser({ payload }, { call, put }) {
            const res = yield call(getAddUser, payload);
            if (res) {
                if (res.ok) {
                    message.success(res.data);
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *getUpdateUser({ payload }, { call, put }) {
            const res = yield call(getUpdateUser, payload);
            if (res) {
                if (res.ok) {
                    message.success(res.data);

                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *fetchDeleteUser({ payload }, { call, put }) {
            const res = yield call(getDeleteUser, payload);
            if (res) {
                if (res.ok) {
                    message.success('删除成功');

                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *fetchUserList({ payload }, { call, put }) {
            const res = yield call(getUserList, payload);
            if (res) {
                if (res.ok) {
                    const userlist = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { userlist },
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