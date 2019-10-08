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

      //UserManual
      {
        path: '/usermanual',
        name: 'usermanual',
        hideInMenu: 'true',
        component: './UserManual',
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

      {
        component: '404',
      },
    ],
  },

];
