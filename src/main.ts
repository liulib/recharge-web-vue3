import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from './store';
import { setupAntd } from '@/plugins';

const app = createApp(App);

// 注册全局常用的ant-design-vue组件
setupAntd(app);
// 注册路由
setupRouter(app);
// 注册vuex
setupStore(app);

// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'));
