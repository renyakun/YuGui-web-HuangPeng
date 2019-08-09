import request from '@/utils/request';
import { stringify } from 'qs';

export async function creatValveReport(params) {
  return request(`/report/createValve`, {
    method: "POST",
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function getDetailValve(params) {
  return request(`/report/getReportDetail?${stringify(params)}`);
}


