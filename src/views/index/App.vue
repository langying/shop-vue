<template>
	<div id="app" class="f-pr">
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		<iframe v-if="umengSrc" :src="umengSrc" frameborder="0" style="height:1px"></iframe>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui';
	export default {
       
		data() {
			return {
				umengSrc:"",
				load: false
			}
		},
		created() {
		
		},
		methods: {
			umengIframe(src){
				var _this = this;
				_this.umengSrc = src;
				setTimeout(function(){
					_this.umengSrc = "";
				},1000)
			}
        },
       
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../common/styles/mixin.scss";
</style>

