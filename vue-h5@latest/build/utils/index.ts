import path from "path";

/**
 * 获取项目根目录
 * @returns
 */
export const getRootPath = () => {
	return path.resolve(process.cwd());
};

/**
 * 获取项目src路径
 * @param srcName - src目录名称(默认："src")
 * @returns
 */
export const getSrcPath = (srcName = "src") => {
	const rooePath = getRootPath();

	return `${rooePath}/${srcName}`;
};
