export default {
  path: "/system",
  meta: {
    icon: "ri:settings-3-line",
    title: "系统管理",
    rank: 11
  },
  children: [
    {
      path: "/system/user/index",
      component: () => import("@/views/system/user/index.vue"),
      name: "SystemUser",
      meta: {
        icon: "ri:admin-line",
        title: "用户管理",
        roles: ["admin"]
      }
    },
    {
      path: "/system/role/index",
      component: () => import("@/views/system/role/index.vue"),
      name: "SystemRole",
      meta: {
        icon: "ri:admin-fill",
        title: "角色管理",
        roles: ["admin"]
      }
    },
    {
      path: "/system/menu/index",
      component: () => import("@/views/system/menu/index.vue"),
      name: "SystemMenu",
      meta: {
        icon: "ep:menu",
        title: "菜单管理",
        roles: ["admin"]
      }
    },
    {
      path: "/system/dept/index",
      component: () => import("@/views/system/dept/index.vue"),
      name: "SystemDept",
      meta: {
        icon: "ri:git-branch-line",
        title: "部门管理",
        roles: ["admin"]
      }
    }
  ]
};
