import Vue from 'vue';
import App from './App';
import router from './router';
/* common存放公用变量，函数和初始化操作 */
import '@/assets/js/common';
import './assets/js/filter';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import '@/assets/css/index.css';
import '@/assets/css/wjStyle.css';

Vue.use(MintUI);
Vue.config.productionTip = false;
Vue.prototype.slideName = 'slide-left';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
