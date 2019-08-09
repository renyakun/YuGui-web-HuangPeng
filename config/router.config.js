export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user','super', 'partner', 'app'], 
    routes: [
      { path: '/', redirect: '/workplatform/mytask',},//index
      //{ path: '/', authority: ['admin', 'user'],},
      
      //templent
      {
        path: '/templent',
        name: 'templent',
        icon: 'snippets',
        component: './templent',
      },

      //house
      {
        path: '/house',
        name: 'house',
        icon: 'home',
        routes: [
          {
            path: '/house/resource',
            name: 'resource',
            hideInMenu: 'true',
            component: './haoke/house/Resource',
          },
          {
            path: '/house/addResource',
            name: 'addResource',
            hideInMenu: 'true',
            component: './haoke/house/AddResource',
          },
          {
            path: '/house/analysis',
            name: 'analysis',
            hideInMenu: 'true',
            component: './haoke/house/NewAnalysis',
          },
          {
            path: '/house/newpage',
            name: 'newpage',
            component: './haoke/house/NewPage',
          },
        ],
      },
      //Workplatform
      {
        path: '/workplatform',
        name: 'workplatform',
        icon: 'fund',
        routes: [
          {
            path: '/workplatform/mytask',
            name: 'mytask',
            icon: 'radar-chart',
            component: './Workplatform/MyTask',
          },
          {
            path: '/workplatform/waitcheckList',
            name: 'waitcheckList',
            icon: 'radar-chart',
            component: './Workplatform/WaitCheckList',
          },
          {
            path: '/workplatform/waitapprveList',
            name: 'waitapprveList',
            icon: 'radar-chart',
            component: './Workplatform/WaitApprveList',
          },
          {
            path: '/workplatform/detailwaitCheck',
            name: 'detailwaitCheck',
            hideInMenu: 'true', //添加页不需要在menu上显示
            component: './Workplatform/DetailWaitCheck',
          },
          {
            path: '/workplatform/detailwaitApprove',
            name: 'detailwaitApprove',
            hideInMenu: 'true',
            component: './Workplatform/DetailWaitApprove',
          },
        ],
      },

      //ReportManager
      {
        path: '/reportmanager',
        name: 'reportmanager',
        icon: 'radar-chart',
        routes: [
          {
            path: '/reportmanager/createreport/basicform',
            name: 'basicform',
            icon: 'radar-chart',
            component: './reportmanager/createreport/basicform',
          },
          {
            path: '/reportmanager/myreportlist/newlist',
            name: 'newlist',
            icon: 'radar-chart',
            component: './reportmanager/myreportlist/newlist',
          },
          {
            path: '/reportmanager/myreportlist/checkedlist',
            name: 'checkedlist',
            icon: 'radar-chart',
            component: './reportmanager/myreportlist/checkedlist',
          },
          {
            path: '/reportmanager/myreportlist/approvelist',
            name: 'approvelist',
            icon: 'radar-chart',
            component: './reportmanager/myreportlist/approvelist',
          },
          {
            path: '/reportmanager/myreportlist/filelist',
            name: 'filelist',
            icon: 'radar-chart',
            component: './reportmanager/myreportlist/filelist',
          },
        ],
      },

      //System
      {
        path: '/system',
        name: 'system',
        icon: 'radar-chart',
        //hideInMenu: 'true',
        routes: [
          {
            path: '/system/info',
            name: 'info',
            icon: 'radar-chart',
            component: './system/info',
          },
        ]
      },

      //SearchReport
      {
        path: '/searchreport',
        name: 'searchreport',
        icon: 'radar-chart',
        hideInMenu: 'true',
        routes: [
          {
            path: '/searchreport/searchreportlist',
            name: 'searchreportlist',
            component: './searchreport/searchreportlist',
          }
        ]
      },

      //dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        hideInMenu: 'true',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        hideInMenu: 'true',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                name: 'stepform',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            //authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        hideInMenu: 'true',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            //hideInMenu: 'true',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        hideInMenu: 'true',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            //authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        hideInMenu: 'true',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: 'true',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            // hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        hideInMenu: 'true',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
