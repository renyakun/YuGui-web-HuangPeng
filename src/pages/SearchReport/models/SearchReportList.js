import {
    getSearchReport,
    getUserName
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
        SearchList:{}
    },

    effects: {

        *fetchSearchList({ payload }, { call, put }) {
            const res = yield call(getSearchReport, payload);
            if (res) {
                if (res.ok) {
                    const SearchList = res.data;
                    yield put({
                        type: 'savelist',
                        payload: { SearchList },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
            // yield put({
            //     type: 'savelist',
            //     payload: res,
            // });
        },
        *fetchUserName({ payload }, { call, put }) {
            const res = yield call(getUserName, payload);
            if (res) {
                if (res.ok) {
                    const UserName = res.data;
                    yield put({
                        type: 'savelist',
                        payload: { UserName },
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