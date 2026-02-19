import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const GA_ID = "G-5KEJP2C142";

// --- GA4 初期化スクリプトの動的挿入 ---
if (typeof window !== 'undefined') {
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function() { dataLayer.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

// --- 画面遷移（利用頻度）の計測 ---
router.afterEach((to) => {
  if (window.gtag) {
    // 1. まずは設定を更新（必須ではない場合もありますが、念のため）
    window.gtag('set', 'page_path', to.fullPath);
    window.gtag('set', 'page_title', to.name || document.title);

    // 2. 明示的に page_view イベントを送信する（ここが重要！）
    window.gtag('event', 'page_view', {
      page_path: to.fullPath,
      page_location: window.location.origin + to.fullPath,
      page_title: to.name || document.title
    });

    console.log('GA4 Tracked (Event Sent):', to.fullPath);
  }
});

app.use(router);

app.mount("#app");
