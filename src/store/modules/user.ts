import { defineStore } from 'pinia';
import { UserState } from '../types';
import store from '../pinia';

import Avatar from '@/assets/img_avatar.gif';

const defaultAvatar = Avatar;

const useUserStore = defineStore('user-info', {
  state: () => {
    return {
      sUserId: '',
      roleId: 0,
      sToken: '',
      sUserName: '',
      sAvatar: defaultAvatar,
    };
  },
  actions: {
    saveUser(userInfo: UserState) {
      console.log(userInfo);
      return new Promise<UserState>((resolve) => {
        this.sUserId = userInfo.sUserId;
        this.roleId = userInfo.roleId;
        this.sToken = userInfo.sToken;
        this.sUserName = userInfo.sUserName;
        this.sAvatar = userInfo.sAvatar || defaultAvatar;
        resolve(userInfo);
      });
    },
    isTokenExpire() {
      return !this.sToken;
    },
    changeNickName(newNickName: string) {
      this.sUserName = newNickName;
    },
    logout() {
      return new Promise<void>((resolve) => {
        this.$reset();
        localStorage.clear();
        sessionStorage.clear();
        resolve();
      });
    },
  },
  presist: {
    enable: true,
    resetToState: true,
    option: {
      exclude: ['sUserName'],
    },
  },
});

export default useUserStore;

export function useUserStoreContext() {
  return useUserStore(store);
}
