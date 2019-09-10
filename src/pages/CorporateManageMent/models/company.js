import {
    getCompanyList,
    getAddCompany,
    deleteCompany,
    getUpdateCompany
} from '@/services/CompanyList';
import { message } from 'antd';

export default {
    namespace: 'company',

    state: {
        CompanyList: {}
    },

    effects: {
        *fetchCompanyList({ payload }, { call, put }) {
            const res = yield call(getCompanyList, payload);
            if (res) {
                if (res.ok) {
                    const CompanyList = res.data;
                    yield put({
                        type: 'savelist',
                        payload: { CompanyList },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *fetchAddCompany({ payload }, { call, put }) {
            const res = yield call(getAddCompany, payload);
            if (res) {
                if (res.ok) {
                    message.success('添加成功');
                } else {
                    message.error(res.errMsg);
                }
            }
        },


        *fetchUpdateCompany({ payload }, { call, put }) {
            const res = yield call(getUpdateCompany, payload);
            if (res) {
                if (res.ok) {
                    message.success('修改成功');
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *fetchdeleteCompany({ payload }, { call, put }) {
            const res = yield call(deleteCompany, payload);
            if (res) {
                if (res.ok) {
                    message.success('刪除成功');
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