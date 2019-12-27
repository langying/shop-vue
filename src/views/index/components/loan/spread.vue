<template>
	<div class="loan loan-index1">
        <mt-header class="myHeader" fixed :title="title">
            <mt-button icon="back" slot="left" @click="$router.go(-1)" v-if="!searchParmas.recommendFlag"></mt-button>
        </mt-header>
		
		<pull-to :top-load-method="refresh">
            
        <div class="loan-list">
			<div class="loan-item" v-for="(item,index) of loanList" :key="index" @click.stop="detail(item)">
				<div class="row loan-top">
					<div class="img">
						<img :src="item.imgUrl">
					</div>
					<div class="info col">
						<div class="name">
							<label>{{item.name}}</label>
						</div>
						<div class="tip">{{item.describe}}</div>
						<div class="num">贷款额度<span>{{item.loanAmountMin}}~{{item.loanAmountMax}}元</span></div>
					</div>
					<div class="rate">
						<div class="apply"><label>{{globalFun.numAbbreviate(item.applyTotal,10000)}}</label>人已申请</div>
						<div class="num">{{item.rateScope || 0}}%</div>
						<div class="lb">{{item.rateUnit}}利率</div>
					</div>
				</div>
			</div>
			<div class="no-data" v-if="loanList.length==0">
				<img class="loan-icon" src="../../../../common/assets/images/no-data1.png">
				<label>暂无数据</label>
			</div>
		</div>
		</pull-to>

		<div class="float-load" v-if="floatLoad">
			<div class="row cnt">
				<div class="close" @click.stop="floatLoad=false"></div>
				<div class="logo"></div>
				<div class="col">
					<div class="name">登录{{info.name}}</div>
					<div class="lb">实时查看您的申请进度</div>
				</div>
				<div class="btn" @click.stop="goLoad">去下载</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { queryLoanList } from '@api/api_loan';
	import {Toast,Indicator} from 'mint-ui';
	import PullTo from 'vue-pull-to'
	export default {        
		data() {
			return {
			   	loanList: [],
				searchParmas:{
                    recommendFlag: 1,
                    loanType: 0,
                    hotFlag: 0,
                    page: 1,
                    pageSize: 100
                },
                total: 0,
				title: '',
				isMore: true,
				floatLoad: true
			}
		},
		components: {
			PullTo
		},
		mounted() {
			this.title = this.globalFun.constant.contact("name");
            Indicator.open();
			this.getLoanList(res=>{
				this.loanList = res.data.list;
				Indicator.close();
			});
		},
		created() {
            this.info = this.globalFun.constant.contactAll();
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
					}
				})
			},
		
		
			detail(item){
				// try{
				// 	console.log(cordova);
				// 	this.$parent.umengIframe(this.info.website+"/#/applyUmeng?name="+item.name+"&type=spread");
				// }catch(e){
				// 	this.$uweb.trackEvent("推广", "产品列表",item.name);
				// }
				this.$uweb.trackEvent("推广", "产品列表",item.name);
				this.$router.push({
					path:"/loanDetail?id="+item.productId,
				})
			},
			goLoad(){
				// location.href = "/spread.html#/load";
				location.href = this.info.appURL;
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
		padding: 40px 0 0 0;
    }
    .loan-list{
        padding: 0 0 1.733333rem 0;
    }
}
.float-load{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 55px;
	background: #fff;
	box-shadow:0 -2px 10px -1px rgba(0, 0, 0, 0.2);
	.cnt{
		align-items: center;
		padding: 0 .4rem;
		height: 100%;
		.close{
			width: 25px;
			height: 25px;
			background:url('../../../../common/assets/images/close.png') no-repeat;
			background-size: cover;
		}
		.logo{
			width: 45px;
			height: 45px;
			background:url('../../../../common/assets/images/logo.png') no-repeat;
			background-size: cover;
			margin: 0 10px;
		}
		.name{
			@include font-dpr(16px);
			font-weight: 600;
			color: #333;
		}
		.lb{
			color: #999;
			margin-top: .133333rem;
		}
		.btn{
			background-color: #2AAE25;
			color: #fff;
			@include font-dpr(15px);
			font-weight: 600;
			height: 0.8rem;
			line-height: 0.8rem;
			padding: 0 .266667rem;
			border-radius: .106667rem;
		}
	}
	
}
</style>
