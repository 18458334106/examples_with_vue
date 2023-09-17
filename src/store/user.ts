import { login, getInfo } from '@/api/user'
import router from '@/router'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { defineStore } from 'pinia'

const userStore = defineStore('userStore',{
  state:() => ({
    token: getToken(),
    name: '',
    avatar: '',
    showLogin: false
  }),
  actions:{
    login(data:any) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          this.token = res
          setToken(res.token)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
  
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          if (!res) {
            return reject('Verification failed, please Login again.')
          }
          this.name = res.name
          this.avatar = res.avatar || null
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
  
    logout() {
      removeToken()
      router.push({ path: '/login' })
    },
  
    resetToken() {
      return new Promise(resolve => {
        removeToken()
        this.token = ''
        resolve(null)
      })
    }
  }
})

export default userStore