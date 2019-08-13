import { message } from 'antd';
import { getDetailValve } from '@/services/valverserver';

export default {
  namespace: 'reportView',

  state: {
    reportno: '',
    valveinfo: {
      reportInfo: {},
      historyInfo: {},
    },
  },

  effects: {
    *getValveReportInfo({ payload }, { call, put }) {
      const params = {};
      params.reportNo = payload;

      const res = yield call(getDetailValve, params);
      if (res) {
        if (res.ok) {
          const valveinfo = res.data;
          yield put({
            type: 'save',
            payload: { valveinfo },
          });
        } else {
          message.error(res.errMsg);
        }
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
