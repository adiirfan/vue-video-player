import Vue from 'vue'
import Router from 'vue-router'
import Player from './views/player.vue'
import category from './views/Category.vue'
import Tag from './views/Tag.vue'
import Home from './views/Home.vue'
import Film from './views/Film.vue'
import categoryandtag from './views/categoryandtag.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      },
      {
          path: '/player',
          name: 'player',
          component: Player,
      },
      {
          path: '/category/:id',
          name: 'category',
          component: category,
      },
      {
          path: '/tag/:id',
          name: 'tag',
          component: Tag,
      },
      {
          path: '/category/',
          name: 'categoryandtag',
          component: categoryandtag,
      },
      {
          path: '/genre',
          name: 'genre',
          component: category,
      },
      {
          path: '/film/:id',
          name: 'film',
          component: Film,
      },
  ]
})
