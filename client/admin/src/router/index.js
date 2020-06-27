import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home";
import Login from "../views/login";
import ProductList from "../views/product-list";
import ProductDetail from "../views/product-detail";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "product_list",
        component: ProductList
      },
      {
        path: "product_detail/:id",
        component: ProductDetail
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
});

export default router;
