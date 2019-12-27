<template>
	<div class="loan loan-index1">
        <mt-header class="myHeader" fixed :title="title">
            <mt-button icon="back" slot="left" @click="$router.go(-1)" v-if="!searchParmas.recommendFlag"></mt-button>
        </mt-header>
		
		<pull-to :top-load-method="refresh" >
        <div class="loan-list">
			<div class="loan-item" v-for="(item,index) of loanList" :key="index" @click.stop="openLink(item)">
				<div class="row loan-top">
					<div class="img">
						<img :src="item.imgUrl">
					</div>
					<div class="info col">
						<div class="name">
							<label>{{item.name}}</label>
						</div>
						<div class="tip">{{item.describe}}</div>
						<div class="num"><span>{{item.loanAmountMin}}~{{item.loanAmountMax}}元</span></div>
					</div>
					<div class="rate">
						<div class="apply"><label>{{globalFun.numAbbreviate(item.applyTotal,10000)}}</label>人已申请</div>
						<div class="btn">去拿钱</div>
						<div class="lb">{{item.rateUnit}}息低至<label>{{item.rateScope || 0}}%</label></div>
					</div>
				</div>
			</div>
			<div v-if="!isMore && total>0" class="more-end">没有更多数据</div>
			<div class="no-data" v-if="loanList.length==0">
				<img class="loan-icon" src="../../../../common/assets/images/no-data1.png">
				<label>暂无数据</label>
			</div>
		</div>
		</pull-to>
	</div>
</template>

<script>
	import { queryLoanList,loanApply } from '@api/api_loan';
	import {Toast,Indicator} from 'mint-ui';
	import PullTo  from 'vue-pull-to';
	import webwiew from '../webwiew.js';
	export default {        
		data() {
			return {
			   	loanList: [],
				searchParmas: {
					columnId: 0,
					recommendFlag: 0,
					loanType: 0,
					page: 1,
					pageSize: 100
				},
                total: 0,
				title: '',
				isMore: true
			}
		},
		components: {
			PullTo
		},
		mounted() {
			var params = this.$route.query || {};
			if(params.columnId){
				this.searchParmas.columnId = params.columnId;
			}
			if(params.loanType){
				this.searchParmas.loanType = params.loanType;
			}
			if(params.hotFlag){
				this.searchParmas.hotFlag = params.hotFlag;
			}
			if(params.recommendFlag){
				this.searchParmas.recommendFlag = params.recommendFlag;
			}
            this.title = params.name;
            Indicator.open();
			this.getLoanList(res=>{
				this.loanList = res.data.list;
				Indicator.close();
			});
			
		},
		methods: {
			refresh(loaded) {
				this.searchParmas.page = 1;
				this.getLoanList(res=>{
					if(res.code == 200){
						this.loanList = res.data.list;
						loaded('done');
					}
				})
			},
			loadmore(loaded) {
				if(this.total>this.searchParmas.page * this.searchParmas.pageSize){
					this.searchParmas.page += 1;
					this.getLoanList(res=>{
						this.loanList = this.loanList.concat(res.data.list);
						loaded('done');
					})
				}else{
					loaded('done')
					return false;
				}
			},
			getLoanList(callback){
				this.isMore = true;
				queryLoanList(this.searchParmas).then(res=>{
					if(res.code === 200){
						this.total = res.data.total;
						this.isMore = this.total>this.searchParmas.page * this.searchParmas.pageSize;
						if(callback){
							callback(res);
						}

						// if(this.total>this.searchParmas.page * this.searchParmas.pageSize){
						// 	this.$refs.loadmore.onBottomLoaded();
						// }else{
						// 	this.allLoaded = true;
						// }
					}
					// Indicator.close();
				})
			},
			// handleBottomChange(status){
			// 	this.bottomStatus = status;
			// },
			// loadBottom (){  
			// 	setTimeout(() => {
			// 		var bottomStatus = this.bottomStatus
			// 		if(bottomStatus == 'loading' && this.total>this.searchParmas.page * this.searchParmas.pageSize){
			// 			this.searchParmas.page += 1;
			// 			this.getLoanList();
			// 		}
						
			// 	}, 1000);
			// },
		
			detail(item){
				var params = this.$route.query || {};
				if(params.loanType || params.hotFlag){
					// try{
					// 	console.log(cordova);
					// 	this.$parent.$parent.umengIframe(this.info.website+"/#/applyUmeng?name="+item.name+"&type=loanList");
					// }catch(e){
					// 	this.$uweb.trackEvent("快捷入口", "产品列表",item.name);
					// }
					this.$uweb.trackEvent("快捷入口", "产品列表",item.name);
				}else if(params.recommendFlag){
					// try{
					// 	console.log(cordova);
					// 	this.$parent.$parent.umengIframe(this.info.website+"/#/applyUmeng?name="+item.name+"&type=canborrow");
					// }catch(e){
					// 	this.$uweb.trackEvent("能借到", "产品列表",item.name);
					// }
					this.$uweb.trackEvent("能借到", "产品列表",item.name);
				}
				
				this.$router.push({ path:"/loanDetail?id="+item.productId });
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
@import 'index.less';
.loan{
	
	
	&.loan-index1{
		height:95vh;
		padding-top: 40px;
	}
	
}

</style>