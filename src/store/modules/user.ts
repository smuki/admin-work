import { defineStore } from 'pinia'
import { UserState } from '../types'
import store from '../pinia'

import Avatar from '@/assets/img_avatar.gif'

const defaultAvatar = Avatar

const useUserStore = defineStore('user-info', {
  state: () => {
    return {
      userId: '',
      token: '',
      userName: '',
      avatar: defaultAvatar,
    }
  },
  actions: {
    saveUser(userInfo: UserState) {
      console.log(userInfo)
      return new Promise<UserState>((resolve) => {
        this.userId = userInfo.UserId
        this.token = userInfo.Token
        this.userName = userInfo.UserName
        this.avatar = userInfo.Avatar || defaultAvatar
        resolve(userInfo)
      })
    },
    isTokenExpire() {
      return !this.token
    },
    changeNickName(newNickName: string) {
      this.userName = newNickName
    },
    logout() {
      return new Promise<void>((resolve) => {
        this.$reset()
        localStorage.clear()
        sessionStorage.clear()
        resolve()
      })
    },
  },
  presist: {
    enable: true,
    resetToState: true,
    option: {
      exclude: ['sUserName'],
    },
  },
})

export default useUserStore

export function useUserStoreContext() {
  return useUserStore(store)
}
