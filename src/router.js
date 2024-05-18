import { createRouter, createWebHistory } from 'vue-router'
import Posts from '@/views/Posts.vue'
import Post from '@/views/Post.vue'
import Magazines from '@/views/Magazines.vue'
import Magazine from '@/views/Magazine.vue'
import User from '@/views/User.vue'

const routes = [
  {path: '/', name: 'Posts', component: Posts},
  {path: '/posts/:post_id', name: 'Post', component: Post},
  {path: '/magazines', name: 'Magazines', component: Magazines},
  {path: '/magazines/:magazine_id', name: 'Magazine', component: Magazine},
  {path: '/users/:user_id', name: 'User', component: User},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router