import Vue from "vue";
import { getToken } from "@/utils/auth";
import { getUserInfo } from "@/api/user";

const state = {
  token: getToken(),
  //用户信息
  userInfo: {}
};

Vue.observable(state);

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  }
};

const action = {
  getUserInfo() {
    return getUserInfo().then(res => {
      if (res.code === 0) {
        mutations.SET_USER_INFO(state, res.data);
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
