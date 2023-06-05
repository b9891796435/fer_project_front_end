import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Signin from '@/views/SignIn.vue'
import DashBoard from '@/views/DashBoard.vue'
import FerModule from '@/views/console/FerModule.vue'
import Profile from '@/views/console/Profile.vue'
import QueryRecord from '@/views/console/RecordQuery.vue'
import DynamicDetail from '@/views/console/DynamicDetail.vue'
import DynamicList from '@/views/console/DynamicList.vue'
import Donation from '@/views/console/Donation.vue'
import SuperProfile from '@/views/console/SuperProfile.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/DashBoard",
    name: "DashBoard",
    component: DashBoard,
    children: [{
      path: 'Fer',
      name: 'Fer',
      component: FerModule
    }, {
      path: 'Profile',
      name: 'Profile',
      component: Profile
    }, {
      path: 'QueryRecord',
      name: 'QueryRecord',
      component: QueryRecord
    }, {
      path: 'DynamicList',
      name: 'DynamicList',
      component: DynamicList
    }, {
      path: 'DynamicDetail',
      name: 'DynamicDetail',
      component: DynamicDetail
    }, {
      path: 'Donation',
      name: 'Donation',
      component: Donation
    },{
      path: 'SuperProfile',
      name: 'SuperProfile',
      component: SuperProfile
    },]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
