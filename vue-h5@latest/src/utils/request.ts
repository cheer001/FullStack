import axios, { AxiosRequestConfig, Method } from "axios";
import { error } from "console";
import { get } from "http";
import { url } from "inspector";
import { config } from "process";
import { Toast } from "vant";

/** 请求错误码及解释 */
const errorMsgs = {
	400: "发出信息有误",
	401: "用户没有权限(令牌失效、用户名、密码错误、登录过期)",
	402: "前端无痛刷新token",
	403: "用户得到授权，但是访问是被禁止的",
	404: "访问资源不存在",
	406: "请求格式不可得",
	410: "请求资源被永久删除，且不会被看到",
	500: "服务器发生错误",
	502: "网关错误",
	503: "服务不可用，服务器暂时过载或维护",
	504: "网关超时",
};

/**
 * 请求失败后的错误 统一处理
 * @param statusCode 状态码
 * @param other
 */
const errorHandle = (statusCode: number, other: string) => {
	switch (statusCode) {
		case 401:
			Toast(errorMsgs[statusCode]);
			// TODO 跳转到登录页
			break;
		case 403:
			// TODO 登录过期
			Toast(errorMsgs[statusCode]);
			break;
	}
};

interface PendingType {
	url?: string;
	method?: Method;
	params: any;
	data: any;
	cancel: any;
}
// 取消重复请求
const pendingTypes: PendingType[] = [];
const CancelToken = axios.CancelToken;

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
	for (const key in pendingTypes) {
		const itemIndex: number = +key;
		const list: PendingType = pendingTypes[key];

		// 当前请求在数组中存在 则取消请求
		if (
			list.url === config.url &&
			list.method === config.method &&
			JSON.stringify(list.params) === JSON.stringify(config.params) &&
			JSON.stringify(list.data) === JSON.stringify(config.data)
		) {
			// 执行取消操作
			list.cancel("操作太频繁，请稍后再试");
			// 从数组中移除记录
			pendingTypes.splice(itemIndex, 1);
		}
	}
};

/** 实例化请求配置 */
const instance = axios.create({
	timeout: 1000 * 30,
	// 跨域请求时是否需要使用凭证
	withCredentials: false,
});

/** 请求拦截器 */
instance.interceptors.request.use(
	(config) => {
		removePending(config);
		config.cancelToken = new CancelToken((c) => {
			pendingTypes.push({
				url: config.url,
				method: config.method as Method,
				params: config.params,
				data: config.data,
				cancel: c,
			});
		});
		return config;
	},
	(error) => {
		Toast(error.data.error.message);
		return Promise.reject(error.data.error.message);
	},
);

/** 响应拦截器 */
instance.interceptors.response.use(
	(config) => {
		removePending(config.config);
		// 请求成功
		if (config.status === 200 || config.status === 204)
			// 成功操作
			return Promise.resolve(config);

		return Promise.reject(config);
	},
	(error) => {
		const { response } = error;
		if (response) {
			errorHandle(response.status, response.data.message);

			// 超时重新请求
			const config = error.config;
			//全局的请求次数，请求间隙
			const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];

			if (config && RETRY_COUNT) {
				// 设置 用于跟踪重试计数的变量
				config.__retryCount = config.__retryCount || 0;
				if (config.__retryCount >= RETRY_COUNT) {
					return Promise.reject(
						response || { message: error.message },
					);
				}

				//增加重试计数
				config.__retryCount++;
				const backoff = new Promise<void>((resolve) => {
					setTimeout(() => {
						resolve();
					}, RETRY_DELAY || 1);
				});
				// instance 重试请求的Promise
				return backoff.then(() => {
					return instance(config);
				});
			}
			return Promise.reject(response);
		} else {
			// TODO 处理断网情况
		}
	},
);

export default instance;
