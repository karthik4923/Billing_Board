
import { createWebHistory, createRouter } from 'vue-router'
import mainpage from './Project/mainpage.vue'
import left from './Project/left.vue'
import right from './Project/right.vue'
import payment from './Project/payment.vue'
const routes = [
  {
    path: '/',
    name: 'mainpage',
    component: mainpage,
    children: [
      { path: '', redirect: '/default' },
      {
        path: 'default',
        components: {
          left: left,
          right:right,
        }
      },
      { path: 'left', name: 'left', component: left },
      { path: 'right', name: 'right', component: right },
    ]
  },
  {path:'/payment',name:'payment',component:payment},

]
const router = createRouter({
  history: createWebHistory(),
           routes
})
export default router;
