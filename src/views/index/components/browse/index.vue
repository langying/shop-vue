<template>
	<div class="browse">
        <mt-header class="myHeader" fixed title="浏览记录">
           <mt-button icon="back" slot="left" @click="goBack"></mt-button>
        </mt-header>
		<div class="page-wrap">
			<pull-to :top-load-method="refresh"  :bottom-load-method="loadmore"  :is-bottom-bounce="isMore">
            <div class="browseList">
                <div v-for="(item,index) of browseList" :key="index" @click="openLink(item)">
					<div class="data" v-if="a!=item.days">{{item.days}}</div>
					<a v-bind="a=item.days"></a>
										
					<div class="browseItem mint-cell">
						<span class="mint-cell-mask"></span>
						<div class="itemTop row">
							<img :src="item.imgUrl" />
							<div class="col">
								<div class="name">{{item.name}}</div>
								<div class="lb">{{item.describe || ''}}</div>
							</div>
							<i class="mintui mintui-back right"></i> 
						</div>
						<div class="itemBottom row">
							<div class="col">额度范围 <label>{{item.loanAmountMin}}~{{item.loanAmountMax}}元</label></div>
							<div>{{item.rateUnit}}利率 <label>{{item.rateScope}}%</label></div>
						</div>
					</div>
                </div>
				<div v-if="!isMore && total>0" class="more-end">没有更多数据</div>
				<div class="no-data" v-if="browseList.length == 0">
					<img class="browse-icon" src="../../../../common/assets/images/no-data1.png">
					<label>你还没有浏览记录</label>
				</div>
            </div>
			</pull-to>
		</div>
		
	</div>
</template>

<script>
	import { queryLoanList,loanApply } from '@api/api_loan';
	import { queryBrowseList } from '@api/api_user';
	import {Toast,Indicator} from 'mint-ui';
	import PullTo from 'vue-pull-to';
	import webwiew from '../webwiew.js';
	export default {        
		data() {
			return {
			   browseList: [],
			   searchParmas:{
				   page: 1,
				   pageSize: 100
			   },
			   total: 0,
			   isMore: true,
			   token: null
			}
		},
		created() {
			this.token = this.$route.query.token;
            if(this.token){
                localStorage.setItem("token",this.token)
            }
			Indicator.open();
			this.queryBrowseList(res=>{
				this.browseList = res.data.list;
				Indicator.close();
			});
		},
		components: {
			PullTo
		},
		methods: {
			refresh(loaded) {
				this.searchParmas.page = 1;
				this.queryBrowseList(res=>{
					if(res.code == 200){
						this.browseList = res.data.list;
						loaded('done');
					}
				})
			},
			loadmore(loaded) {
				if(this.total>this.searchParmas.page * this.searchParmas.pageSize){
					this.searchParmas.page += 1;
					this.queryBrowseList(res=>{
						this.browseList = this.browseList.concat(res.data.list);
						loaded('done');
					})
				}else{
					loaded('done')
					return false;
				}
			},
			queryBrowseList(callback){
				this.isMore = true;
				queryBrowseList(this.searchParmas).then(res=>{
					if(res.code == 200){
						this.total = res.data.total;
						this.isMore = this.total>this.searchParmas.page * this.searchParmas.pageSize;
						if(callback){
							callback(res)
						}
					}
				})
			},
			checkItem(item){
				var path = "/loanDetail?id="+item.productId;
				if(this.token){
                   path += "&token=" + this.token;
                }
				this.$router.push({
					path: path,
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
@import './index.less';
</style>