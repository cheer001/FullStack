import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";

import "amfe-flexible/index.js";

createApp(App).use(router).mount("#app");
