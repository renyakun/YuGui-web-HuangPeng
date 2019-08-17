import {
    getSearchReport,
    getUserRealName
} from '@/services/SearchReportList';
import { message } from 'antd';

export default {
    namespace: 'SearchReport',

    state: {
        data: {
            list: [],
            pagination: {},
        },
        RealName: [],
    },

    effects: {

        *fetchSearchList({ payload }, { call, put }) {
            const res = yield call(getSearchReport, payload);
            yield put({
                type: 'savelist',
                payload: res,
            });
        },
        *fetchUserRealName({ payload }, { call, put }) {
            const res = yield call(getUserRealName, payload);
            if (res) {
                if (res.ok) {
                    const RealName = res.data;
                    yield put({
                        type: 'savelist',
                        payload: { RealName },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }

        },
    },

    reducers: {
        savelist(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
};