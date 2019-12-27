<template>
	<div class="loan loan-index">
		<mt-header class="myHeader" fixed title="贷款"></mt-header>
		<div class="search" :class="curr.name !=''?'open':''" @click.stop="curr.name =''">
			<div class="type row">
				<div class="col" @click.stop="searchItem('loanType')" :class="curr.name === 'loanType'?'active':''">
					<span class="title">{{loanType.val}}</span>
					<span class="row"><i class="mintui mintui-back"></i> </span>
				</div>
				<div class="line"></div>
				<div class="col" @click.stop="searchItem('columnId')" :class="curr.name === 'columnId'?'active':''">
					<span class="title">{{columnId.val}}</span>
					<span class="row"><i class="mintui mintui-back"></i></span>
				</div>
			</div>

			<ul class="searchList row row-wrap">
				<li class="col" v-for="(value,key) of curr.list" :key="key">
					<span :class="curr.key == key?'active':''" @click.stop="checkItem(value,key)">{{value}}</span>
				</li>
			</ul>
		</div>		
		
		<pull-to :top-load-method="refresh"  :bottom-load-method="loadmore"  :is-bottom-bounce="isMore">
        <div class="loan-list">
			<div class="loan-item mint-cell" v-for="(item,index) of loanList" :key="index" @click.stop="openLink(item)">
				<span class="mint-cell-mask"></span>
				<div class="row loan-top">
					<div class="img">
						<img :src="item.imgUrl">
					</div>
					<div class="info col">
						<div class="name">
							<label>{{item.name}}</label>
						</div>
						<div class="tip">{{item.describe || ''}}</div>
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
	import { queryLoanList,queryColumnList,loanApply } from '@api/api_loan';
	import {Toast,Indicator} from 'mint-ui';
	import PullTo  from 'vue-pull-to';
	import webwiew from '../webwiew.js';
	export default {        
		data() {
			return {
			   	loanList: [],
				topStatus: '',
				bottomStatus:'',
				loanType:{
					open: false,
					curr: 0,
					val: "贷款金额",
					list:{"0":"所有金额","1":"2000元以下","2":"2000-5000元","3":"5000-10000元","4":"10000-30000元","5":"30000元以上"}
				},
				columnId:{
					open: false,
					curr: 0,
					val: "贷款分类",
					list:[]
				},
				curr:{
					list: null,
					name: "",
					key: ""
				},
				searchParmas: {
					type: 0,
					recommendFlag: 0,
					loanType: 0,
					columnId: 0,
					hotFlag: 0,
					page: 1,
					pageSize: 100
				},
				total: 0,
				isMore: true
			}
		},
		components: {
			PullTo
		},
		mounted() {
			Indicator.open();
			this.getLoanList(res=>{
				this.loanList = res.data.list;
				Indicator.close();
			});
			this.loanClassify();
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
			loanClassify(){
				this.columnId.list = {};
				queryColumnList({
					type: 0
				}).then(res=>{
					if(res.code == 200){
						var data = res.data || [];
						var map = {
							"0": "所有分类"
						};
						data.forEach(item => {
							map[item.id] = item.name
						});
						this.columnId.list = map;
					}
				})
			},
			
			searchItem(name){
				if(this.curr.name == name){
					this.curr.name = "";
					this.curr.list = null;
					this.curr.key = "";
					
				}else{
					this.curr.name = name;
					this.curr.list = this[name].list;
					this.curr.key = this[name].curr;
				}	
				if(name == "columnId"){
					this.loanClassify();
				}
			},
			checkItem(value,key){
				this[this.curr.name].curr = key;
				this[this.curr.name].val = value;
				this.curr.key = key;
				this.searchParmas[this.curr.name] = key;
				this.searchParmas.page = 1;
				
				Indicator.open();
				setTimeout(res=>{
					this.curr.name = '';
					this.loanList = [];
					this.getLoanList(res=>{
						this.loanList = res.data.list;
						Indicator.close();
					});
				},200)
			},
			detail(item){
				// try{
				// 	console.log(cordova);
				// 	this.$parent.$parent.umengIframe(this.info.website+"/#/applyUmeng?name="+item.name+"&type=loan");
				// }catch(e){
				// 	this.$uweb.trackEvent("全部贷款", "产品列表",item.name);
				// }
				this.$uweb.trackEvent("全部贷款", "产品列表",item.name);
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
	&.loan-index{
		padding:40px 0 0 0;
	}
	height:85vh;
	
	.search{
		position: fixed;
		width: 100%;
		z-index: 999;
		background: #fff;
		text-align: center;
		max-width: 750px;
    	margin: 0 auto;
		
		.type{
			// height: 1.3rem;
			line-height: 40px;
			background: #fff;
			border-bottom: 1px solid #eee;
			.line{
				width: 1px;
				height: 0.5rem;
				margin: 0.25rem 0;
				background: #eee;
			}
			.mintui-back{
				@include font-dpr(15px);
			}
		}
		.col{
			display: flex;
			align-items: center;
			justify-content: center;
			@include font-dpr(14px);
			i{
				color: #999;
				transform:rotate(-90deg);
				margin-left: 0.15rem;
				transition: all 0.2s ease 0s;
			}
			&.active{				
				i{
					transform:rotate(90deg);
					margin-left: 0.15rem;
					color: #44B5ED
				}
				.title{
					color: #44B5ED
				}
			}
		}
		// border-bottom: 2px solid #E7E7E7;
		&.open{
			height: 100%;
			background: rgba(0,0,0,.2);
			.searchList{
				display: flex;
			}
			
		}
	}
	.searchList{
		position: absolute;
		width: 100%;
		top:41px;
		background: #fff;
		padding: 0.1rem 0 0.4rem 0;
		display: none;
		z-index: 998;
		li{
			text-align: center;
			margin-top: 0.3rem;
			span{
				color: #999;
				width: 2.9rem;
				padding: 0.3rem 0;
				border: 1px solid #eee;
				border-radius: 6px;
				display: block;
				margin: 0 auto;
				@include font-dpr(13px);
				&.active{
					color: #44B5ED;
					border: 1px solid #44B5ED;
				}	
			}
		}
	}
	
	.loan-list{
		margin-top: -2px;
	}
}

</style>
<style>
.loan-index .action-block{
	margin-top: -10px !important;
}
</style>
