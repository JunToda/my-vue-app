import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import * as VueGtag from "vue-gtag";

createApp(App)
  .use(
    VueGtag,
    {
      config: {
        id: "G-5KEJP2C142",
      },
    },
    router,
  )
  .use(router)
  .mount("#app");
