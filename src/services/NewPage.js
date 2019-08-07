// json序列化的工具
import { stringify } from "qs";
// ant 自己封装好的发送ajax请求的工具
import request from "@/utils/request";


// get请求 注意 ` 这个符号 不是这种 ’号
export async function queryUser1(params) {
  // stringify这个将json序列化 比如 {"a"：1，"b":2} 转换成 a=1&b=2
  return request(`/server/api/test/user?${stringify(params)}`);
}

// post请求 注意 ` 这个符号 不是这种 ’号
export async function queryUser2(params) {
  return request(`/server/api//test/user?${params}`, {
    method: "POST"
  });
}