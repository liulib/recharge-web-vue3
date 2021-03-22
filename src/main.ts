import { createApp } from 'vue';
import App from './App.vue';
import setupRouter from './router';
import store from './store';
import { setupAntd } from '@/plugins';

const app = createApp(App);

// 注册全局常用的ant-design-vue组件
setupAntd(app);
// 注册路由
setupRouter(app);

app.use(store).mount('#app');
