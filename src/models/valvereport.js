import { creatValveReport,getDetailValve} from '@/services/valverserver';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
    namespace: 'valvereport',

    state: {
        reportno: '',
        valveinfo: {
            reportInfo: {},
            historyInfo: {},
        },
    },

    effects: {
        // *fetch({ payload }, { call, put }) {
        //   const response = yield call(queryResource, payload);
        //   yield put({
        //     type: 'saveList',
        //     payload: response,
        //   });
        // }
        *creatValveReport({ payload }, { call, put }) {
            const res = yield call(creatValveReport, payload);
            if (res) {
                if (res.ok) {
                    const reportno = res.data;
                    console.log("report:", reportno)
                    yield put(
                        routerRedux.push({
                            pathname: '/report/detail',
                            state: { reportno },
                        })
                    );
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

                    console.log("valveinfo:", valveinfo)
                    yield put({
                        type: 'saveList',
                        payload: { valveinfo },
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
                data: action.payload,
            };
        },
    },
}