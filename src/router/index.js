import { createRouter, createWebHistory } from "vue-router";

// blogs
import BlockIndex from "@/pages/blogs/BlogIndex.vue";
// post
import PostList from "@/pages/posts/PostList.vue";
import PostDetail from "@/pages/posts/PostDetail.vue";
import PostEditor from "@/pages/posts/PostEditor.vue";
// authors
// import AuthorDetail from '@/pages/authors/AuthorDetail.vue'
// // me
import Me from "@/pages/me/Me.vue";
import EditProfile from "@/pages/me/EditProfile.vue";

// auth
import Login from "@/pages/auth/Login.vue";

import HomeView from "@/pages/HomeView.vue";
import Register from "@/pages/auth/Register.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // post
  {
    path: "/posts",
    name: "post-list",
    component: PostList,
  },
  {
    path: "/posts/:slug",
    name: "post-detail",
    component: PostDetail,
  },
  {
    path: "/posts/new",
    name: "post-new",
    component: PostEditor,
  },
  {
    path: "/posts/:slug/edit",
    name: "post-edit",
    component: PostEditor,
    props: true,
  },
  // blogs

  {
    path: "/blogs",
    name: "blogs",
    component: BlockIndex,
  },
  // authors
  //   {
  //       path: 'author/:username',
  //       name: 'author-detail',
  //       component: AuthorDetail,
  //   },
  //   // me (current user)
  {
    path: "/me",
    name: "me",
    component: Me,
    meta: { requireAuth: true },
  },
  {
    path: "/me/profile",
    name: "me-profile",
    component: EditProfile,
    meta: { requireAuth: true },
  },

  // auth
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      hideNav: true,
      fullPage: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      hideNav: true,
      fullPage: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
