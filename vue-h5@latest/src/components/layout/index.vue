<script setup lang="ts">
import { reactive, ref } from "vue";

/** 布局页面状态 */
interface ILayoutState {
	/** tabbar 列表 */
	tabbars: ITabbar[];
}

/** tabbar 列表 */
interface ITabbar {
	/** active */
	name: string;
	/** 图标 */
	icon: string;
	/** tabbar文本 */
	text: string;
	/** 路由名称 */
	to?: string;
}

const active = ref<string>("home");
const state = reactive<ILayoutState>({
	tabbars: [
		{
			name: "home",
			icon: "home-o",
			text: "首页",
			to: "/home",
		},
		{
			name: "member",
			icon: "setting-o",
			text: "我的",
			to: "/member",
		},
	],
});
</script>
<template>
	<router-view />
	<van-tabbar v-model="active" route>
		<van-tabbar-item
			v-for="item in state.tabbars"
			:name="item.name"
			:icon="item.icon"
			:to="item.to"
		>
			{{ item.text }}
		</van-tabbar-item>
	</van-tabbar>
</template>
<style></style>
