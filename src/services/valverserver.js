import request from '@/utils/request';
import { stringify } from 'qs';

export async function creatValveReport(params) {
  return request(`/createValve`, {
    method: "POST",
    body: {
      ...params,
      method: 'post',
    },
  });
}

