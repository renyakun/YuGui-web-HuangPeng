import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {
    creatValveReport,
    getcreateReportNumber,
    getcompanyInfo,
    getDetailValve,
    getNewReportList,
    getCheckUserList,
    getApproveUserList,
    getCheckedReportList,
    getApproveReportList,
    getFileReportList,
} from '@/services/valverserver';

export default {
    namespace: 'valvereport',

    state: {
        reportno: '',
        checkuserlist: [],
        approvedreportlist: [],
        approveuserlist: [],
        valveinfo: {
            reportInfo: {},
            historyInfo: {},
        },
    },

    effects: {
        *createValveReport({ payload }, { call, put }) {
            const res = yield call(creatValveReport, payload);
            if (res) {
                if (res.ok) {
                    const reportno = res.data;
                    //console.log("report:", reportno)
                    yield put(
                        routerRedux.push({
                            pathname: '/report/myreportList/newlist',//提交审核,选择报告审核人员
                            state: { reportno },
                        })
                    );
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

        *fetchcompanyInfo({ payload }, { call, put }) {
            const res = yield call(getcompanyInfo,payload);
            if (res) {
                if (res.ok) {
                    const companyList = res.data;
                    yield put({
                        type: 'saveList',
                        payload: { companyList },
                    });
                    localStorage.setItem('companyDataList', JSON.stringify(companyList));
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

        *fetchNewReportList(_, { call, put }) {
            const res = yield call(getNewReportList);
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

        *fetchCheckReportList(_, { call, put }) {
            const res = yield call(getCheckedReportList);
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

        *fetchApproveUserList(_, { call, put }) {
            const res = yield call(getApproveUserList);
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

        *fetchApproveReportList(_, { call, put }) {
            const res = yield call(getApproveReportList);
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

        *fetchApproveFilelist(_, { call, put }) {
            const res = yield call(getFileReportList);
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