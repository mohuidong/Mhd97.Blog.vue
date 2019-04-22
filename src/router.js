import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
// import MyHome from './views/Myhome.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
        path: '/',
        name: 'Home',
        component: () => import('./views/NewHome.vue'),
      },
      {
          path: '/article/:id',
          name: 'article',
          component: () => import( './views/Article.vue'),
      },
      {
          path: '/issue',
          name: 'issue',
          component: () => import('./views/Issue.vue')
      },
      {
          path: '/me',
          name: 'me',
          component: () => import('./views/Me.vue')
      },
      {
          path: '/reward',
          name: 'reward',
          component: () => import('./views/Reward.vue')
      },
      {
          path: '/question/:id',
          name: 'question',
          component: () => import( './views/Question.vue'),
      },
      {
          path: '/sendQuestion',
          name: 'sendQuestion',
          component: () => import( './views/SendQuestion.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('./views/About.vue')
      },
      {
          path: '/register',
          name: 'register',
          component: () => import('./views/Register.vue')
      },
      {
          path: '/Login',
          name: 'login',
          component: () => import('./views/Login.vue')
      },
      {
          path: '/MyHome',
          name: 'MyHome',
          component: () => import('./views/NewHome.vue'),
          children:[
              {
                  path: '/homeIndex',
                  name: 'homeIndex',
                  component: () => import('./views/Home/HomeIndex.vue'),
              },
              {
                  path: '/homePost',
                  name: 'homePost',
                  component: () => import('./views/Home/HomePost.vue'),
              },
          ]
      },
      {
          path:'/Class',
          name:'Class',
          component: () => import('./views/Class.vue'),
      }
  ]
})
