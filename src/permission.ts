import router from './router'
import { getToken } from '@/utils/auth'
import userStore from './store/user'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'

const whiteList = ['/home','/about','/msg']
router.beforeEach(async(to, _from, next) => {
    const hasToken = getToken()
    const store = userStore()
    if (hasToken) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        const { name } = storeToRefs(store)
        const hasGetUserInfo = name.value
        if (hasGetUserInfo) {
          next()
        } else {
          try {
            await store.getInfo()
            next()
          } catch (error) {
            await store.resetToken()
            ElMessage.error(error || 'Has Error')
            store.showLogin = true
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        store.showLogin = true
      }
    }
  })