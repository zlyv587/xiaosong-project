import axios from "axios";
// import store from '@/store'
import { getToken, removeToken } from "@/utils/auth";
import { Message } from "element-ui";

//创建实例
const service = axios.create({
  baseURL: "//localhost:8081",
  timeout: 5000
});

//请求拦截器
service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data || {};
    // 如果响应成功但结果不为0,则提示错误信息
    if (res.code !== 0) {
      Message({
        message: res.msg || "Error",
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(new Error(res.msg || "Error"));
    }
    return res;
  },
  error => {
    const res = error.response || {};
    /**
     * 如果token失效,重新刷新页面。会触发beforeRouter钩子函数。
     * 钩子函数里会请求`UserInfo`接口，因为token失效，会抛出401抛出异常，
     * 捕获异常后就会清除本地`token`，然后跳转到登录页面。
     */
    if (res.status === 401) {
      removeToken();
      location.reload();
    } else {
      //提示后端抛出的异常信息
      const errMsg = (res.data && res.data.msg) || "发生未知的错误";
      Message({
        message: errMsg,
        type: "error",
        duration: 5 * 1000
      });
    }
    return Promise.reject(error);
  }
);

export default service;
