import { createRouter, createWebHistory} from "vue-router";


import layout from '../components/layouts/Layout.vue';

import user from '../components/User.vue';
import login from '../components/Login.vue';
import home from '../components/HomePage.vue';
import form from '../components/pages/user/Form.vue';
import notfound from '../components/NotFound.vue';

import auth from '../middleware/auth';

const routes = [
    {
        path: '/',
        component: layout,
        meta:{
            middleware:[
                auth
            ]
        },
        children:[
            {
                path:'/',
                name:'home',
                component:home,
            },
            {
                path: '/user',
                component:user
            },
            {
                path: '/users/update/:id',
                component: form
            },
            {
                path: '/users/create',
                component: form
            },

        ]
    },
    {
        path:"/login",
        name: "login",
        component:login
    },
    {
        path:'/:pathMatch(.*)*',
        component: notfound
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {

    /** Navigate to next if middleware is not applied */
    if (!to.meta.middleware) {
        return next()
    }
 
    const middleware = to.meta.middleware;
    const context = {
      to,
      from,
      next,
    //   store  | You can also pass store as an argument
    }
 
    return middleware[0]({
        ...context
    })
  })



export default router