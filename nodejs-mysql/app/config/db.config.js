module.exports = {
	HOST: "loaclhost",
	USER: "root",
	PASSWORD: "QWEqwe123!@#",
	DB: "todos",
	port: 3306,
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
