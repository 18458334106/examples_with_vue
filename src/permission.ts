// import router from './router'
// import { getToken } from '@/utils/auth'
// import userStore from './store/user'
// import { ElMessage } from 'element-plus'
// import { storeToRefs } from 'pinia'

// const whiteList = ['/login','/home']
// router.beforeEach(async(to, from, next) => {
//     const hasToken = getToken()
//     const store = userStore()
//     if (hasToken) {
//       if (to.path === '/login') {
//         next({ path: '/' })
//       } else {
//         const { name } = storeToRefs(store)
//         const hasGetUserInfo = name
//         if (hasGetUserInfo) {
//           next()
//         } else {
//           try {
//             await store.getInfo()
//             next()
//           } catch (error) {
//             await store.resetToken()
//             ElMessage.error(error || 'Has Error')
//             next(`/login?redirect=${to.path}`)
//           }
//         }
//       }
//     } else {
//       if (whiteList.indexOf(to.path) !== -1) {
//         next()
//       } else {
//         next(`/login?redirect=${to.path}`)
//       }
//     }
//   })