<template>
	<div></div>
</template>

<script>
	export default {      		
		data() {
			return {
				
			}
		},
		created() {
			var type = this.$route.query.type;
			var name = this.$route.query.name || '';
			var _this = this;
			
			switch(type){
				case 'detail':
					console.log("detail");
					_this.$uweb.trackEvent("产品详情", "立即申请",name);
					break;
				case 'home':
					console.log("home");
					_this.$uweb.trackEvent("首页", "产品列表",name);
					break;
				case 'banner':
					console.log("banner");
					_this.$uweb.trackEvent("banner",name);
					break;
				case 'loan':
					console.log("loan");
					_this.$uweb.trackEvent("全部贷款", "产品列表",name);
					break;
				case 'canborrow':
					console.log("canborrow");
					_this.$uweb.trackEvent("能借到", "产品列表",name);
					break;
				case 'loanList':
					console.log("loanList");
					_this.$uweb.trackEvent("快捷入口", "产品列表",name);
					break;	
				case 'spread':
					console.log("spread");
					_this.$uweb.trackEvent("推广", "产品列表",name);
					break;
			}
           
		},
		
		mounted(){
			
		},
		methods: {
        }
	}
</script>

<style lang="scss"  scoped="scoped">

</style>