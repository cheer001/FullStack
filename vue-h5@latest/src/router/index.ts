import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "layout",
		component: () => import("@/components/layout/index.vue"),
		redirect: "/home",
		meta: {
			title: "首页",
			keepAlive: false,
		},
		children: [
			{
				path: "/home",
				name: "home",
				component: () => import("@/views/home/index.vue"),
			},
			{
				path: "/member",
				name: "member",
				component: () => import("@/views/member/index.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
