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
        component: () => import(/* webpackChunkName: "about" */ './views/NewHome.vue'),
      },
      {
          path: '/article/:id',
          name: 'article',
          component: () => import( './views/Article.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      },
      {
          path: '/Login',
          name: 'login',
          component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
      },
      {
          path: '/MyHome',
          name: 'MyHome',
          component: () => import(/* webpackChunkName: "about" */ './views/Myhome.vue'),
          children:[
              {
                  path: '/homeIndex',
                  name: 'homeIndex',
                  component: () => import(/* webpackChunkName: "about" */ './views/Home/HomeIndex.vue'),
              },
              {
                  path: '/homePost',
                  name: 'homePost',
                  component: () => import(/* webpackChunkName: "about" */ './views/Home/HomePost.vue'),
              },
          ]
      }
  ]
})
