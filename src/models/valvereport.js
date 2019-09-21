import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
    creatValveReport,
    updateReport,
    getcreateReportNumber,
    getcompanyInfo,
    getautoCheck,
    getDetailValve,
    getNewReportList,
    getCheckUserList,
    getApproveUserList,
    getCheckedReportList,
    getApproveReportList,
    getFileReportList,
    getSignature
} from '@/services/valverserver';

export default {
    namespace: 'valvereport',

    state: {
        reportno: '',
        checkuserlist: [],
        approvedreportlist: [],
        approveuserlist: [],
        CompanyList: {},
        valveinfo: {
            reportInfo: {},
            historyInfo: {},
        },
        Signature: null
    },

    effects: {
        *createValveReport({ payload }, { call, put }) {
            const res = yield call(creatValveReport, payload);
            if (res) {
                if (res.ok) {
                    message.success('创建成功',2);
                    const  reportno  = res.data;
                    yield put(
                        routerRedux.push({
                            pathname: '/report/handle/reportdetail',
                            report: reportno
                        })
                    );
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *updateReport({ payload }, { call, put }) {
            const res = yield call(updateReport, payload);
            if (res) {
                if (res.ok) {
                    message.success('修改成功');
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *getReportNumber(_, { call, put }) {
            const res = yield call(getcreateReportNumber);
            if (res) {
                if (res.ok) {
                    const ReportNumber = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { ReportNumber },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *fetchCompanyList(_, { call, put }) {
            const res = yield call(getcompanyInfo);
            if (res) {
                if (res.ok) {
                    const CompanyList = res.data;
                    yield put({
                        type: 'savelist',
                        payload: { CompanyList },
                    });
                    localStorage.setItem('companyDataList', JSON.stringify(CompanyList));
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *getValveReportInfo({ payload }, { call, put }) {
            const params = {};
            params.reportNo = payload
            const res = yield call(getDetailValve, params);
            if (res) {
                if (res.ok) {
                    const valveinfo = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { valveinfo },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *fetchNewReportList({ payload }, { call, put }) {
            const res = yield call(getNewReportList, payload);
            if (res) {
                if (res.ok) {
                    const newreportlist = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { newreportlist },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *fetchCheckReportList({ payload }, { call, put }) {
            const res = yield call(getCheckedReportList, payload);
            if (res) {
                if (res.ok) {
                    const checkedreportlist = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { checkedreportlist },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *fetchCheckUserList(_, { call, put }) {
            const res = yield call(getCheckUserList);
            if (res) {
                if (res.ok) {
                    const checkuserlist = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { checkuserlist },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *fetchApproveUserList({ payload }, { call, put }) {
            const res = yield call(getApproveUserList, payload);
            if (res) {
                if (res.ok) {
                    const approveuserlist = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { approveuserlist },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *fetchApproveReportList({ payload }, { call, put }) {
            const res = yield call(getApproveReportList, payload);
            if (res) {
                if (res.ok) {
                    const approvedreportlist = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { approvedreportlist },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *fetchApproveFilelist({ payload }, { call, put }) {
            const res = yield call(getFileReportList, payload);
            if (res) {
                if (res.ok) {
                    const approvedfilelist = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { approvedfilelist },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },


        *fetchAutoCheck({ payload }, { call, put }) {
            const res = yield call(getautoCheck, payload);
            if (res) {
                if (res.ok) {
                    const autocheck = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { autocheck },
                    });
                } else {
                    message.error(res.errMsg);
                }
            }
        },

        *fetchSignature(_, { call, put }) {
            const res = yield call(getSignature);
            if (res) {
                if (res.ok) {
                    const Signature = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { Signature },
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
            };
        },
    },
}