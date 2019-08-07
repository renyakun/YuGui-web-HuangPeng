// import { routerRedux } from 'dva/router';
// import { stringify } from 'qs';
// import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
// import { setAuthority } from '@/utils/authority';
// import { getPageQuery } from '@/utils/utils';
// import { reloadAuthorized } from '@/utils/Authorized';

// export default {
//   namespace: 'login',

//   state: {
//     status: undefined,
//   },

//   effects: {
//     *login({ payload }, { call, put }) {
//       const response = yield call(fakeAccountLogin, payload);
//       yield put({
//         type: 'changeLoginStatus',
//         payload: response,
//       });
//       // Login successfully
//       if (response.status === 'ok') {
//         reloadAuthorized();
//         const urlParams = new URL(window.location.href);
//         const params = getPageQuery();
//         let { redirect } = params;
//         if (redirect) {
//           const redirectUrlParams = new URL(redirect);
//           if (redirectUrlParams.origin === urlParams.origin) {
//             redirect = redirect.substr(urlParams.origin.length);
//             if (redirect.startsWith('/#')) {
//               redirect = redirect.substr(2);
//             }
//           } else {
//             window.location.href = redirect;
//             return;
//           }
//         }
//         yield put(routerRedux.replace(redirect || '/'));
//       }
//     },

//     *getCaptcha({ payload }, { call }) {
//       yield call(getFakeCaptcha, payload);
//     },

//     *logout(_, { put }) {
//       yield put({
//         type: 'changeLoginStatus',
//         payload: {
//           status: false,
//           currentAuthority: 'guest',
//         },
//       });
//       reloadAuthorized();
//       yield put(
//         routerRedux.push({
//           pathname: '/user/login',
//           search: stringify({
//             redirect: window.location.href,
//           }),
//         })
//       );
//     },
//   },

//   reducers: {
//     changeLoginStatus(state, { payload }) {
//       setAuthority(payload.currentAuthority);
//       return {
//         ...state,
//         status: payload.status,
//         type: payload.type,
//       };
//     },
//   },
// };



import { routerRedux } from 'dva/router';
import { logout, login, checkLogin } from '../services/user';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

// 服务端返回的userLevel隐射关系，0：super 暂无, 1: admin 管理员, 2: partner 企业子账号, 3: app app账号
const roles = ['super', 'admin', 'partner', 'app'];

export default {
  namespace: 'login',

  state: {
    status: undefined,
    userMenu: [],
    currentAuthority: undefined,
  },

  effects: {
    *check({ fromLogin, response }, { put }) {
      if (!response || !response.ok) {
        let errMsg; // checkLogin跳转到登录页后不需要展示错误信息
        let status;
        console.log("rsp:", response)
        if (fromLogin) {
          errMsg = (response && response.errMsg) || '网络错误...';
          status = 'error';
        }

        yield put({
          type: 'changeLoginStatus',
          payload: {
            errMsg,
            status,
            type: 'account',
          },
        });

        reloadAuthorized();
        if (!window.location.href.includes('/user/login')) {
          yield put(routerRedux.push('/user/login'));
        }
      } else if (response.ok) {
        const { errMsg, data } = response;
        const res = {
          errMsg,
          type: 'account',
          status: 'ok',
          currentAuthority: 'partner',
        };
        
        if (data) {
          const { userLevel, userName, enable } = data;
          res.account = userName;
          res.enable = enable;
          res.currentAuthority = roles[userLevel];
     
        }
   
        yield put({
          type: 'changeLoginStatus',
          payload: res,
        });

        if (fromLogin) {
          reloadAuthorized();
          yield put(
            routerRedux.push({
              pathname: '/workplatform/mytask', // here
              state: { fromLogin },
            })
          );
        }
      }
    },
    *login({ payload }, { call, put }) {
      const { ...params } = payload;
      const response = yield call(login, params);

      console.log("rsp:", response)
      yield put({
        type: 'check',
        fromLogin: true,
        response,
      });
    },
    *checkLogin(_, { put, call }) {
      const response = yield call(checkLogin);

      yield put({
        type: 'check',
        response,
      });
    },
    *logout(_, { put, select, call }) {
      yield call(logout);
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put({
          type: 'clearState',
        });
        yield put(
          routerRedux.push({
            pathname: '/user/login',
            state: {
              logout: true,
            },
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        ...payload,
      };
    },
  },
};




