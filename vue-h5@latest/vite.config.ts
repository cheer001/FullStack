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
		server: {
			host: "192.168.50.168",
			port: 8888,
			https: false,
			cors: true,
			proxy: {
				"/api": {
					target: "http://192.168.50.168:8088",
					changeOrigin: true,
					//rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
	};
});
