import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // component: () => import(/* webpackChunkName: "landing" */ './views/Home.vue')
      redirect: '/app-v0'
    },
    {
      path: '/app-v0',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "application" */ './age-v0/Entry.vue'),
      children: [
        {
          path: '',
          redirect: 'home'
        },
        {
          path: 'home',
          component: () => import(/* webpackChunkName: "application" */ './age-v0/pages/Landing.vue')
        },
        {
          path: 'age-editor',
          component: () => import(/* webpackChunkName: "application" */ './age-v0/pages/AgeEditor.vue')
        }
      ]
    }
  ]
})
