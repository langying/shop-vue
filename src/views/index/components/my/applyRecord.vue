<template>
	<div class="apply" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <mt-header class="myHeader" fixed title="申请记录">
           <mt-button icon="back" slot="left" @click="goBack"></mt-button>
        </mt-header>
		<div class="page-wrap">
			<pull-to :top-load-method="refresh" :bottom-load-method="loadmore" :is-bottom-bounce="isMore">
			
			<div class="list">
				<div class="item row mint-cell" v-for="(item,index) of list" :key="index" @click.stop="openLink(item)">
					<span class="mint-cell-mask"></span>
					<div class="img">
						<img :src="item.imgUrl">
					</div>
					<div class="col">
						<div class="name">{{item.name}}</div>
						<div class="tip">{{item.describe}}</div>
						<div class="num"><label>{{globalFun.numAbbreviate(item.applyTotal,10000)}}</label>人申请</div>
					</div>
					<div>
						<div class="lb">申请时间</div>
						<div class="data">{{globalFun.dateFormat(item.applyTime, 'yyyy年MM月dd日')}}</div>
					</div>
				</div>
				<div v-if="!isMore && total>0" class="more-end">没有更多数据</div>
				<div class="no-data" v-if="list.length == 0">
					<img class="apply-icon" src="../../../../common/assets/images/no-data1.png">
					<label>你还没有贷款申请记录</label>
					<div class="link" @click="guide">赶紧去申请贷款吧>></div>
				</div>
			</div>
			
			</pull-to>
		</div>
	</div>
</template>

<script>
	import { loanApply } from '@api/api_loan';
	import { queryApplyList } from '@api/api_user';
	import {Toast,Loadmore,Indicator} from 'mint-ui';
	import PullTo  from 'vue-pull-to';
	import webwiew from '../webwiew.js';
	export default {        
		data() {
			return {
				list: [],
				topStatus: '',
				bottomStatus:'',
				allLoaded:false,
				scrollMode:"auto",
				searchParmas: {
					page: 1,
					pageSize: 100
				},
				isMore: true,
				token: null,
			}
		},
		components: {
			PullTo
		},
		created() {
			this.token = this.$route.query.token;
            if(this.token){
                localStorage.setItem("token",this.token)
            }
			Indicator.open();
            this.getList(res=>{
				this.list = res.data.list;
				Indicator.close();
			});
		},
		mounted(){},
		methods: {
			refresh(loaded) {
				this.searchParmas.page = 1;
				this.getList(res=>{
					if(res.code == 200){
						this.loanList = res.data.list;
						loaded('done');
					}
				})
			},
			loadmore(loaded) {
				if(this.total>this.searchParmas.page * this.searchParmas.pageSize){
					this.searchParmas.page += 1;
					this.getList(res=>{
						this.list = this.list.concat(res.data.list);
						loaded('done');
					})
				}else{
					loaded('done')
					return false;
				}
			},
			getList(callback){
				this.isMore = true;
				queryApplyList(this.searchParmas).then(res=>{
					if(res.code === 200){	
						this.total = res.data.total;
						this.isMore = this.total>this.searchParmas.page * this.searchParmas.pageSize;
						if(callback){
							callback(res);
						}
					
					}					
				})
				
			},
			loadTop(){
				setTimeout(res=>{
					this.searchParmas.page = 1;
					this.list = [];
					this.allLoaded = false;
					this.$refs.loadmore.onTopLoaded();
					this.getList();
				},1000)
			},
			handleBottomChange(status){
				this.bottomStatus = status;
			},
			handleTopChange(status){
				this.topStatus = status;
			},
			loadBottom (){  
				setTimeout(() => {
					var bottomStatus = this.bottomStatus
					if(bottomStatus == 'loading' && this.total>this.searchParmas.page * this.searchParmas.pageSize){
						this.searchParmas.page += 1;
						this.getList();
					}
					
				}, 1000);
			},
			detail(id){
				this.$router.push({
					path:"/loanDetail?id="+id,
				})
			},
			guide(){
				this.$router.push({
					path:"/guide"
				})	
			},
			goBack(){
                if(this.token){
                    try{
                        window.android.onPlayBack();
                    }catch(e){

                    }
                }else{
                    this.$router.go(-1);
                }
            },
			openLink(item) {
				try{
                    webwiew(item.linkUrl, item.title, item.productId);
                }
                catch(e) {
                	setTimeout(function() {
                		location.href = item.linkUrl;
                	}, 100);
				}
				loanApply({ productId: item.productId }).then(res=>{});
			}
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import "./applyRecord.less";

</style>



