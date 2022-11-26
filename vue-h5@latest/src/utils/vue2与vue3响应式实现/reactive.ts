/**
 * Vue2 使用Object.defineProperty()实现对象的响应式
 *
 * 存在的问题：
 * 对对象删除或者新增属性，无法劫持到  这个操作在数组中经常会做
 */
let app = { innerText: "" };
const obj = { foo: "" };

const notifyUpdate = () => {
	app.innerText = obj.foo;
};

/**
 * 对象存在多个key需要遍历
 */
const observe = (obj: any) => {
	if (typeof obj !== "object" || !obj) return;

	Object.keys(obj).forEach((key) => {
		defineReactive(obj, key, obj[key]);
	});
};

/**
 * 定义对象响应式
 */
const defineReactive = (obj: any, key: PropertyKey, val: any) => {
	//对象嵌套的情况下需要找defineProperty中进行递归
	observe(obj);

	Object.defineProperty(obj, key, {
		get() {
			return val;
		},
		set(newval) {
			if (newval !== val) {
				val = newval;
				// 对象属性的新值为对象时
				observe(newval);
				notifyUpdate();
			}
		},
	});
};

defineReactive(obj, "foo", "");
setInterval(() => {
	obj.foo = new Date().getSeconds().toString();
}, 1000);


/**
 * --------------------------------------------------------------------------------------------------------------
 */

/**
 * Vue3 使用Proxy实现响应式
 * 
 * Vue2中的缺点：新增和删除对象属性
 */

