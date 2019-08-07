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