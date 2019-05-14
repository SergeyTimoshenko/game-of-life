import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/game',
      name: 'game',
      component: require('@/components/Game/GamePage').default
    },
    {
      path: '/words',
      name: 'words',
      component: require('@/components/Words/WordsPage').default
    }
  ]
})
