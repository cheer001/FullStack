import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { getRootPath, getSrcPath } from "./build";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
	const rootPath = getRootPath();
	const srcPath = getSrcPath();
	return {
		plugins: [
			vue(),
			// Vant 按需引入组件样式
			Components({
				resolvers: [VantResolver()],
			}),
		],
		// 配置路径别名
		resolve: {
			alias: {
				"~": rootPath,
				"@": srcPath,
			},
		},
	};
});
