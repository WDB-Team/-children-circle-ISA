const routes = [
  {
    path: "/",
    component: () => import("layouts/LandingLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/app",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/MainPage.vue") },
      { path: "config", component: () => import("pages/UserConfPage.vue") },
    ],
  },

  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/LoginPage.vue") },
      {
        path: "createAccount",
        component: () => import("pages/CreateAccountPage.vue"),
      },
      {
        path: "onBoarding",
        component: () => import("pages/OnBoardPage.vue"),
      },
    ],
  },

  {
    path: "/addChild",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/AddChildPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
