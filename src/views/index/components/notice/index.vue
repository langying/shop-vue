<template>
	<div class="notice">
		<mt-header fixed title="消息">
            <mt-button icon="back" slot="left" @click="goBack"></mt-button>
        </mt-header>
		<pull-to :top-load-method="refresh"  :bottom-load-method="loadmore"  :is-bottom-bounce="isMore">
        <div class="notice-list">
			<div class="notice-item" v-for="(item,index) of list" :key="index">
				<div class="row info">
					<div class="col title">{{item.title}}</div>
					<div :class="item.lookFlag == '0'?'unread':''"><i></i>{{readMap[item.lookFlag+""]}}</div>
				</div>
				<div class="row tip">
					<div class="col">{{item.content}}</div>
					<div>{{globalFun.dateFormat(item.createTime, 'MM月dd日')}}</div>
				</div>
				<div class="row btn mint-cell" @click="linkUrl(item)">
					<span class="mint-cell-mask"></span>
					<div class="col">点此立即申请借款</div>
					<i class="mintui mintui-back right"></i> 
				</div>
			</div>
			<div class="no-data" v-if="list.length==0">
				<img class="notice-icon" src="../../../../common/assets/images/no-notice1.png">
				<label>暂无数据</label>
			</div>
		</div>
		</pull-to>
	</div>
</template>

<script>
	import { queryNoticeList } from '@api/api_notice';
	import {Toast,Indicator} from 'mint-ui';
	import PullTo from 'vue-pull-to'
	export default {        
		data() {
			return {
				readMap:{"0":"未读","1":"已读"},
				list:[],
				searchParmas: {
					page: 1,
					pageSize: 20
				},
				total: 0,
				isMore: true,
				token: null
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
            this.getNoticeList(res=>{
				this.list = res.data.list;
				Indicator.close();
			});
		},
		methods: {
			refresh(loaded) {
				this.searchParmas.page = 1;
				this.getNoticeList(res=>{
					if(res.code == 200){
						this.list = res.data.list;
						loaded('done');
					}
				})
			},
			loadmore(loaded) {
				if(this.total>this.searchParmas.page * this.searchParmas.pageSize){
					this.searchParmas.page += 1;
					this.getNoticeList(res=>{
						this.list = this.list.concat(res.data.list);
						loaded('done');
					})
				}else{
					loaded('done')
					return false;
				}
			},
			getNoticeList(callback){
				this.isMore = true;
				queryNoticeList(this.searchParmas).then(res=>{
					if(res.code === 200){
						this.total = res.data.total;
						this.isMore = this.total>this.searchParmas.page * this.searchParmas.pageSize;
						if(callback){
							callback(res);
						}
					}
					
				})
			},
			linkUrl(item){
				var type = item.type;
				if(type === 1){
					this.$router.push({
						path:"/loanDetail?id="+item.productId+"&mesId="+item.id,
					})
				}else if(type === 2){
					var url = item.linkUrl.search("http://") >= 0 ? item.linkUrl: "http://"+item.linkUrl;
					url += url.indexOf("\?")<0?"?":"&";
					url += "mesId="+item.id + "&token="+localStorage.getItem("token")
					location.href = url;
				}
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
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import "./index.less";

</style>



