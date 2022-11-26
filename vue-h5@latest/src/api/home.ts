import request from "../utils/request";

/** 获取所有教程 */
export const getTutorials = () =>
	request.get<ITutorial[]>("/api/tutorials/getTutorialList");
