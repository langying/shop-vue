<template >

	<section class="home">
		
		<pull-to :top-load-method="refresh"  :bottom-load-method="loadmore"  :is-bottom-bounce="isMore">
		
		<div class="swipe-wrapper">
			<mt-swipe :auto="5000" ref="swipeWrapper">
				<mt-swipe-item class="item" v-for="(item,index) of bannerList" :key="index">
					<a @click="linkUrl(item)">
						<img :src="item.imgUrl">
					</a>
				</mt-swipe-item>
			</mt-swipe>
		</div>
		
		<div class="icon-list row" style="display:none">
			<div class="icon-item col mint-cell" v-for="(item,index) of iconList" :key="index" @click="checkIcon(item)">
				<div class="img"><i :class="item.icon"></i></div>
				<div class="lb">{{item.lb}}</div>
			</div>
		</div>

		<div class="home-block">
			<div class="row row-wrap">
				<div class="item " v-for="(item,index) of recommendList"  :key="index" @click="checkItem(item)">
					<div class="block row mint-cell">
						<span class="mint-cell-mask"></span>
						<div class="img">
							<img :src="item.imgUrl">
						</div>
						<div class="info">
							<div class="name">{{item.name}}</div>
							<div class="lb">{{item.describe}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		
		<div class="loan-list">
			<div class="title row" style="margin-bottom:0.1rem">
				<i class="hot"></i><label>申请3个以上产品，通过率可达99%</label>
			</div>
			<div class="loan-item mint-cell" v-for="(item,index) of loanList" :key="index" @click.stop="openLink(item)">
				<span class="mint-cell-mask"></span>
				<div class="row loan-top">
					<div class="img">
						<img :src="item.imgUrl">
					</div>
					<div class="info col">
						<div class="name"><label>{{item.name}}</label></div>
						<div class="tip">{{item.describe || ''}}</div>
						<div class="num"><span>{{item.loanAmountMin}}~{{item.loanAmountMax}}元</span></div>
					</div>
					<div class="rate">
						<div class="apply"><label>{{globalFun.numAbbreviate(item.applyTotal,10000)}}</label>人已申请</div>
						<div class="btn">去拿钱</div>
						<div class="lb">{{item.rateUnit}}息低至<label>{{item.rateScope||0}}%</label></div>
					</div>
				</div>
			</div>
			<div v-if="!isMore && total>0" class="more-end">没有更多数据</div>
		</div>	
		
		</pull-to>
		
		
	</section>
	
</template>

<script>
	import { queryBannerList,queryPromoteList } from '@api/api_home';
	import { queryLoanList,loanApply } from '@api/api_loan';
	import {Toast,Indicator} from 'mint-ui';
	import PullTo from 'vue-pull-to';
	import webwiew from '../webwiew.js';
	export default {        
		data() {
			return {
			   currType: 1,
			   allLoaded:false,
			   bottomStatus:"",
			   topStatus: '',
			   bannerList:[],
			   loanList: [],
			   recommendList:[],
			   iocnList:[],
			   searchParmas:{
				   recommendFlag: 1,
				   loanType: 0,
				   hotFlag: 0,
				   page: 1,
				   pageSize: 100
			   },
			   iconList:[{
				   icon:"home-icon1",
				   lb:"0-2千",
				   type: 1
			   },{
				   icon:"home-icon2",
				   lb:"2千-5千",
				   type: 2
			   },{
				   icon:"home-icon3",
				   lb:"5千-1万",
				   type: 3
			   },{
				   icon:"home-icon4",
				   lb:"1万-3万",
				   type: 4
			   },{
				   icon:"home-icon5",
				   lb:"秒批口子",
				   type: 5
			   }],
			   total: 0,
			   count: 0,
			   isMore: true
			}
		},
		components: {
			PullTo
		},
		created() {
			Indicator.open();
			this.getBannerList();
			this.getRecommend();
			this.getLoanList(res=>{
				this.loanList = res.data.list;
				this.close();
			});
			window.scrollTo(0,0);			
		},
		methods: {
			refresh(loaded) {
				this.getBannerList();
				this.getRecommend();
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
			close(){
				this.count += 1; 
				if(this.count == 2){
					this.count = 0;
					Indicator.close();
				}
			},
			getRecommend(){
				queryPromoteList().then(res=>{
					if(res.code === 200){
						this.recommendList = res.data || [];
					}
				})
			},
			getBannerList(){
				queryBannerList().then(res=>{
					if(res.code === 200){
						this.bannerList = res.data.list;
						
					}
					this.close();
				})
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
					}
				})
			},
			linkUrl(item) {
				if (item.type === 1) {
					//try{
					// 	  console.log(cordova);
					//    this.$parent.$parent.umengIframe(this.info.website+"/#/applyUmeng?name="+item.title+"&type=banner");
					//}
					//catch(e){
					// 	  this.$uweb.trackEvent("banner",item.title);
					//}
					
					//this.$uweb.trackEvent("banner",item.title);
					//this.$router.push({ path:"/loanDetail?id="+item.productId });
					this.openLink(item);
				}
				else if (item.type === 2) {
					this.openItem(item);
				}
			},
			checkIcon(item){
				var type = item.type;
				if(type == 5){
					
					this.$router.push({
						path:"/loanList?hotFlag=1&name="+item.lb,
					})
				}else{
					this.$router.push({
						path:"/loanList?loanType="+item.type+"&name="+item.lb,
					})
				}
				
			},
			checkItem(item){
				switch(item.type){
					case 1:
						this.$router.push({ path:"/guide" });
						break;
					case 2:
						this.$router.push({ path:"/loanList?columnId="+item.columnId+"&name="+item.name });
						break;
					case 3:
						//this.$router.push({ path:"/loanDetail?id="+item.productId });
						this.openLink(item);
						break;
				}
			},
			detail(item){
				// try{
				// 	console.log(cordova);
				//  this.$parent.$parent.umengIframe(this.website+"/#/applyUmeng?name="+item.name+"&type=home");
				// }catch(e){
				// 	this.$uweb.trackEvent("首页", "产品列表",item.name);
				// }

				this.$uweb.trackEvent("首页", "产品列表",item.name);
				this.$router.push({ path:"/loanDetail?id="+item.productId });
			},
			openItem(item) {
				try{
                    webwiew(item.itemUrl, item.title, item.productId);
                }
                catch(e) {
                	setTimeout(function() {
                		location.href = item.itemUrl;
                	}, 100);
				}
				loanApply({ productId: item.productId }).then(res=>{});
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
@import './index.less';
@import '../loan/index.less';	

</style>

