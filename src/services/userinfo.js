// import request from '@/utils/request';
// import { stringify } from 'qs';

// export async function queryResource(params) {
//     return request(`/tk/task?${stringify(params)}`);
//   }

import raxios from '../utils/raxios';

export async function getUserInfo() {
    return raxios.get(`/getuser`);
}

export async function getUserNotifyInfo() {
  return raxios.get(`/getUserNotifyInfo`);
}


export async function getWaitCheckList() {
  return raxios.get(`/getWaitCheckList`);
}

export async function getWaitApproveList() {
  return raxios.get(`/getWaitApproveList`);
}