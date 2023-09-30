import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import HomePage from '../views/HomePage.vue'
import SaldoPage from '../views/SaldoPage.vue'
import HistoryUser from '../views/HistoryUser.vue'
import EditUser from '../views/EditUser.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'loginUser',
      component: LoginPage
    },
    {
      path: '/login-renter',
      name: 'loginRenter',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'registerUser',
      component: RegisterPage
    },
    {
      path: '/register-renter',
      name: 'registerRenter',
      component: RegisterPage
    },
    {
      path: '/',
      name: 'homePage',
      component: HomePage
    },
    {
      path:'/add-saldo',
      name: 'saldoPage',
      component: SaldoPage
    },
    {
      path:'/history-user',
      name: 'historyUserPage',
      component: HistoryUser
    },
    {
      path:'/edit-user',
      name: 'editUserPage',
      component: EditUser
    }
  ]
})

router.beforeEach((to,from,next)=>{
  const isAuth = localStorage.access_token
  const isRole = localStorage.role
  if(isAuth && (to.name === 'loginUser' || to.name === 'registerUser')){
    next({name:'homePage'})
  } else if(!isAuth && (to.name !== 'loginUser' && to.name !== 'registerUser')){
    next({name:'loginUser'})
  } else{
    next()
  }
})

export default router
