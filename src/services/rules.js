import { stringify } from 'qs';
import request from '@/utils/request';


export async function queryRule(params) {
    return request(`/api/rules?${stringify(params)}`);
  }