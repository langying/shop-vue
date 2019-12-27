<template>
	<div class="strategy">
		<mt-header class="myHeader" fixed title="攻略"></mt-header>
        <pull-to :top-load-method="refresh" >
        <div class="list">
            <div class="item row mint-cell" v-for="(item,index) of list" :key="index" @click="checkItem(item.id)">
                <span class="mint-cell-mask"></span>
                <div class="icon"><img :src="item.imgUrl" alt=""> </div>
                <div class="col">
                    <div class="title"><label class="hot">[{{item.name}}]</label>{{item.title}}</div>
                    <div class="read"><label class="num">{{item.browseNum}}</label>人阅读</div>
                </div>
            </div>
        </div>
        <div class="strategy-bottom row">
            <div class="icon"></div>
            <div class="col">
                <div class="row tip"><span><label class="red">轻松时刻</label><label>几步就有钱</label></span><i class="up"></i></div>
                <div class="lb">选择适合的产品，简单操作，坐等拿钱</div>
            </div>
        </div>
        </pull-to>
	</div>
</template>

<script>
	import { queryStrategyList } from '@api/api_strategy';
	import {Toast,MessageBox} from 'mint-ui';
	import PullTo from 'vue-pull-to'
	export default {        
		data() {
			return {
                list: []
			}
		},
        components: {
			PullTo
		},
		created() {
			this.getStrategyList();
		},
		methods: {
            refresh(loaded) {
				
                this.getStrategyList(res=>{
                    loaded('done');
                });
			},
			getStrategyList(callback){
                queryStrategyList().then(res=>{
                    if(res.code == 200){
                        this.list = res.data.list || [];
                        if(callback){
                            callback(res);
                        }
                    }
                })
            },
            checkItem(id){
                this.$router.push({
					path:"/strategy/detail/"+id,
				})
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import "./index.less";
</style>