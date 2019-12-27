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
	TabContainerItem,Swipe,SwipeItem,Loadmore,InfiniteScroll,MessageBox,Popup,Picker,Radio } from 'mint-ui';
import VueClipboard from 'vue-clipboard2';

import uweb from 'vue-uweb';
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

 
Vue.use(VueClipboard)
Vue.use(InfiniteScroll);
Vue.use(uweb, utils.constant.contact('umeng'));
// Vue.use(MintUI)
Vue.prototype.globalFun = utils;

new Vue({
	el: '#app',
	router: router.routerGroup,
	render: h => h(App)
})

function initJPush() {
    if ('JPush' in window) {
        try {
            window.JPush.init();
            window.JPush.setDebugMode(true);
            window.setTimeout(() => {
                window.JPush.getRegistrationID((data) => {
                    // Toast("id:"+data);
                });
            }, 2000);
            if (device.platform != "Android") {
                window.JPush.setApplicationIconBadgeNumber(0);
            }
        } catch (exception) {
            console.log(exception);
        }
    } else {
        console.error('JPush is not exist...');
    }
}
document.addEventListener('deviceready', function() {
	
	document.addEventListener("backbutton", function(){
        if(window.location.href.search("tabs")>=0){
            navigator.Backbutton.goHome(function() {
				console.log('go home success');
			}, function() {
				console.log('go home fail');
			})
        }else{
            history.back();
        }
	}, false);
	
	document.addEventListener("jpush.receiveRegistrationId", function(event){
		
    },false);
    document.addEventListener("jpush.openNotification", function(){
        var extras;
    	if(device.platform == "Android") {
            extras = event.extras;
            if(extras.type==1){
                location.href = "#/loanDetail?id="+extras.productId+"&mesId="+extras.messageId;
            }else if(extras.type==2){
                var url = extras.linkUrl.search("http://") >= 0 ? extras.linkUrl: "http://"+extras.linkUrl;
                url += url.indexOf("\?")<0?"?":"&";
                url += "mesId="+extras.messageId;
                var token = localStorage.getItem("token");
                if(token){
                    url += "&" + token;
                }
                sessionStorage.setItem("applyUrl",url)
                // location.href = "http://"+window.location.host+"#/apply?id="+extras.productId + "&name="+extras.name+"&url="+url;
                location.href = url;
                
            }
    	} else {
    	    extras = event.aps.alert;
        }
        // var s = JSON.stringify(extras);
    	// Toast({
        //     message: s,
        //    duration: 50000
        // });
    }, false);
	initJPush();
	window.navigator.splashscreen.hide();
}, false);
