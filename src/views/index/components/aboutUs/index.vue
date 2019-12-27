<template>
	<div class="aboutUs">
        <mt-header class="myHeader" fixed title="关于我们">
           <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
		<div class="page-wrap">
            <div class="aboutUs-top">
                <div class="logo"></div>
                <div class="name"><span></span></div>
                <div class="version">{{info.version}}</div>
            </div>
            <div class="aboutUs-bottom">
                <div class="row">
                    <i class="website"></i><label class="lb">官方网站：</label><label>{{info.website}}</label>
                </div>
                <div class="row">
                    <i class="phone"></i><label class="lb">客服电话：</label><label>{{info.phone}}</label>
                </div>
                <div class="row">
                    <i class="weixin"></i><label class="lb">微信公众号：</label><label>{{info.weixin}}</label>
                </div>
                <div class="copyright">{{info.copyright}}</div>
            </div>
		</div>
	</div>
</template>

<script>
	import { addFeedback } from '@api/api_user';
	import {Toast,Indicator} from 'mint-ui';
	
	export default {        
		data() {
			return {
                info:{}
			}
		},
		created() {
            this.info = this.globalFun.constant.contactAll();
		},
		methods: {
			
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import './index.less';
</style>