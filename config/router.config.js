export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },

  //ReportPrint
  {
    path: '/print',
    routes: [
      { path: '/print', component: './ReportPrint' },
    ],
  },

  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'examine', 'approval', 'clerk'],
    // 服务端返回的userLevel隐射关系，0：admin 超级管理员, 1:examine 管理员(审核)企业子账号, 2: approval 企业子账号(审批), 3: clerk 账号(文员)
    routes: [
      { path: '/', redirect: '/workplatform/mytask', },//index

      //Workplatform
      {
        path: '/workplatform',
        name: 'workplatform',
        icon: 'fund',
        //iconfont:'icon-reportList',
        // authority: ['admin', 'examine', 'approval', ],
        routes: [
          {
            path: '/workplatform/mytask',
            name: 'mytask',
            component: './Workplatform/MyTask',
          },
          {
            path: '/workplatform/waitcheckList',
            name: 'waitcheckList',
            hideInMenu: 'true',
            component: './Workplatform/WaitCheckList',
          },
          {
            path: '/workplatform/waitapprveList',
            name: 'waitapprveList',
            hideInMenu: 'true',
            //authority: ['admin', 'approval',],
            component: './Workplatform/WaitApprveList',
          },
          {
            path: '/workplatform/detailwaitCheck',
            name: 'detailwaitCheck',
            hideInMenu: 'true',
            component: './Workplatform/DetailWaitCheck',
          },
          {
            path: '/workplatform/detailwaitApprove',
            name: 'detailwaitApprove',
            hideInMenu: 'true',
            //authority: ['admin', 'approval',],
            component: './Workplatform/DetailWaitApprove',
          },
        ],
      },

      //ReportManager
      {
        path: '/report',
        name: 'report',
        icon: 'snippets',
        //authority: ['admin', 'examine', 'approval',],
        routes: [
          { path: '/report', redirect: '/report/create/basicForm', },
          {
            path: '/report/create/basicForm',
            name: 'basicform',
            component: './ReportManager/CreateReport/BasicForm',
          },
          {
            path: '/report/myList/newlist',
            name: 'newlist',
            component: './ReportManager/MyReportList/NewList',
          },
          {
            path: '/report/myList/checkedlist',
            name: 'checkedlist',
            //authority: ['admin', 'examine', 'approval',],
            component: './ReportManager/MyReportList/CheckedList',
          },
          {
            path: '/report/myList/approvelist',
            name: 'approvelist',
            //authority: ['admin', 'approval',],
            component: './ReportManager/MyReportList/ApproveList',
          },
          {
            path: '/report/myList/filelist',
            name: 'filelist',
            //authority: ['admin',  'approval',],
            component: './ReportManager/MyReportList/FileList',
          },
          {
            path: '/report/handle/reportdetail',
            name: 'reportdetail',
            hideInMenu: 'true',
            component: './ReportManager/HandleReport/ReportDetail',
          },
          {
            path: '/report/handle/reportcheck',
            name: 'reportcheck',
            hideInMenu: 'true',
            component: './ReportManager/HandleReport/ReportCheck',
          },
          {
            path: '/report/handle/reportapprove',
            name: 'reportapprove',
            hideInMenu: 'true',
            component: './ReportManager/HandleReport/ReportApprove',
          },
          {
            path: '/report/handle/modifyreportdetail',
            name: 'modifyreportdetail',
            hideInMenu: 'true',
            component: './ReportManager/HandleReport/ModifyReportDetail',
          },
          {
            path: '/report/handle/modifyreportcheck',
            name: 'modifyreportcheck',
            hideInMenu: 'true',
            component: './ReportManager/HandleReport/ModifyReportCheck',
          },
          {
            path: '/report/handle/reportview',
            name: 'reportview',
            hideInMenu: 'true',
            component: './ReportManager/HandleReport/ReportView',
          },
        ],
      },

      //SearchReport
      {
        path: '/search',
        name: 'search',
        icon: 'file-search',
        component: './SearchReport/SearchReportList',
      },

      //System
      {
        path: '/system/info',
        name: 'info',
        icon: 'usergroup-add',
        component: './System/Info/Info',
        routes: [
          {
            path: '/system/info',
            redirect: '/system/info/admininfo',
          },
          {
            path: '/system/info/admininfo',
            component: './System/Info/AdminInfo',
          },
          {
            path: '/system/info/security',
            component: './System/Info/Security',
          },
          {
            path: '/system/info/usertable',
            //authority: ['admin',],
            component: './System/Info/UserTable',
          },
        ],
      },

      //Corporation
      {
        path: '/company',
        name: 'company',
        icon: 'hdd',
        component: './CorporateManageMent/Corporation',
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

      // profile
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        hideInMenu: 'true',
        routes: [
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

      // result
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        hideInMenu: 'true',
        routes: [
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },

      // exception
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: 'true',
        routes: [
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

      //account
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
