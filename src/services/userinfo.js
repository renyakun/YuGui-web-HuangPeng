import request from '@/utils/request';
import { stringify } from 'qs';


export async function getUserInfo() {
    return request(`/getuser`);
}

export async function getUserNotifyInfo() {
  return request(`/getUserNotifyInfo`);
}

export async function getWaitCheckList() {
  return request(`/getWaitCheckList`);
}

export async function getWaitApproveList() {
  return request(`/getWaitApproveList`);
}

