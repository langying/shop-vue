import Vue from 'vue'
import '@common/filter'
import App from './App'
import router from './router'
import utils from '@common/utils'
// import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@common/assets/js/flexible'
// 样式引入
import '@common/assets/styles/flexible.css'
import '@common/styles/global.scss'
Vue.config.productionTip = false;
import {Header,Button,Toast, Tabbar, TabItem, TabContainer,
	TabContainerItem,Swipe,SwipeItem,Loadmore,InfiniteScroll,MessageBox,Popup,Picker,Radio,Cell } from 'mint-ui';
import VueClipboard from 'vue-clipboard2';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Radio.name, Radio);
Vue.component(Cell.name, Cell);

 
Vue.use(VueClipboard)
Vue.use(InfiniteScroll);

// Vue.use(MintUI)
Vue.prototype.globalFun = utils;

new Vue({
	el: '#app',
	router: router.routerGroup,
	render: h => h(App)
})

