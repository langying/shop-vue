<template>
	<div class="strategy-detail">
        <mt-header fixed title="攻略">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div>
            <div class="title">{{info.title}}</div>
            <div class="content">{{info.content}}</div>
        </div>
	</div>
</template>

<script>
	import { queryStrategyDetail } from '@api/api_strategy';
	
	export default {        
		data() {
			return {
                info: {}
			}
		},
		created() {
			this.getDetail();
		},
		methods: {
			getDetail(){
                queryStrategyDetail({
                    id: this.$route.params.id
                }).then(res=>{
                    if(res.code == 200){
                        this.info = res.data;
                    }
                })
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import "./detail.less";
</style>