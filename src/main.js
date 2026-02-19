import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);

// 画面遷移を監視して GA4 に通知
router.afterEach((to) => {
  if (window.gtag) {
    window.gtag("config", "G-5KEJP2C142", {
      page_path: to.fullPath,
      page_title: to.name || document.title,
    });
    console.log("GA4 Tracked:", to.fullPath);
  }
});

app.mount("#app");
