import Vue from "vue";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { getUserInfo } from "@/api/user";

const state = {
  token: getToken(),
  //用户信息
  userInfo: {}
};

Vue.observable(state);

const mutations = {
  SET_TOKEN(token) {
    state.token = token;
    setToken(token);
  },
  SET_USER_INFO(userInfo) {
    state.userInfo = userInfo;
  },
  REMOVE_TOKEN() {
    state.token = '';
    removeToken()
  }
};

const action = {
  getUserInfo() {
    return getUserInfo().then(res => {
      if (res.code === 0) {
        mutations.SET_USER_INFO(res.data);
      }
    });
  }
};

const store = {
  state,
  mutations,
  action
};


export default store;
