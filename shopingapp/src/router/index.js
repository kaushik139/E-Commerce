import { createRouter, createWebHistory } from 'vue-router'
import signUp from "../views/signUp.vue"
import logIn from '../views/logIn.vue'
import cartPage from '../views/cartPage.vue'
import detailsPage from '../views/detailsPage.vue'
import productsPage from '../views/productsPage.vue'
import adminPage from '../views/adminPage.vue'
import errorPage from '../views/errorPage.vue'
import adminSales from '../views/adminSales.vue'
import userAddress from '../views/userAddress.vue'

const routes = [
  {
    path: '/userAddress',
    name: 'userAddress',
    component: userAddress,
  },
  {
    path: "/adminSales",
    name: "adminSales",
    component: adminSales,
  },
  {
    path: "/errorPage",
    name: "errorPage",
    component: errorPage,
  },
  {
    path: "/adminPage",
    name: "adminPage",
    component: adminPage,
  },
  {
    path: "/",
    name: "signUp",
    component: signUp,
  },
  {
    path: "/logIn",
    name: "logIn",
    component: logIn,
  },
  {
    path: "/cartPage",
    name: "cartPage",
    component: cartPage,
  },
  {
    path: "/detailsPage",
    name: "detailsPage",
    component: detailsPage,
  },
  {
    path: "/productsPage",
    name: "productsPage",
    component: productsPage,
  },
  // {
  //   path: '/',
  //   redirects: '/productsPage'
  //     }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
