<template>
	<div class="my">
		<mt-header class="myHeader" fixed title="我的"></mt-header>
        <div class="top">
			<div class="head row">
				<img src="../../../../common/assets/images/head.png">
				<span class="col phone">{{login.phone}}</span>
				<!-- <i class="mintui mintui-back right"></i>  -->
			</div>
		</div>
		<div class="list">
			<router-link to="/applyRecord">
			<div class="item apply row border0 mint-cell">
				<span class="mint-cell-mask"></span>
				<i class="icon my-icon1"></i>
				<div class="col">我的申请</div>
				<i class="mintui mintui-back right"></i> 
			</div>
			</router-link>
			<router-link to="/browse">
			<div class="item share row mint-cell">
				<span class="mint-cell-mask"></span>
				<i class="icon my-icon2"></i>
				<div class="col">浏览记录</div>
				<i class="mintui mintui-back right"></i> 
			</div>
			</router-link>
			<router-link to="/notice">
			<div class="item setting row mint-cell">
				<span class="mint-cell-mask"></span>
				<i class="icon my-icon3"></i>
				<div class="col">我的消息</div>
				<!-- <div class="dot"><i></i></div> -->
				<i class="mintui mintui-back right"></i> 
			</div>
			</router-link>
			<div class="item setting row mint-cell" @click="modal.is = true">
				<span class="mint-cell-mask"></span>
				<i class="icon my-icon4"></i>
				<div class="col">关注公众号</div>
				<i class="mintui mintui-back right"></i> 
			</div>
			<router-link to="/help">
			<div class="item setting row mint-cell">
				<span class="mint-cell-mask"></span>
				<i class="icon my-icon5"></i>
				<div class="col">帮助中心</div>
				<i class="mintui mintui-back right"></i> 
			</div>
			</router-link>
			
			<div class="item setting row mint-cell" @click="setting">
				<span class="mint-cell-mask"></span>
				<i class="icon my-icon6"></i>
				<div class="col">设置</div>
				<i class="mintui mintui-back right"></i> 
			</div>
		</div>
		<div class="share-block" :class="share?'open':''">
			<div class="cnt">
				<div class="title">分享至</div>
				<ul class="row">
					<li class="col" v-for="(item,index) of shareList" :key="index" @click="checkItem(item)"><i :class="item.name"></i></li>
				</ul>
				<div class="btn" @click="share=false">取消</div>
			</div>
		</div>
		<div class="modal" v-if="modal.is" @click.stop="modal.is=false">
			<div class="modal-block" @click.stop="fun">
				<div class="modal-cnt">
					搜索并关注"{{copy}}"获取最新贷款信息和放款攻略，随时随地一键申请！点击[去微信]
				</div>
				<div class="modal-btn row">
					<a class="col cancel" @click.stop="modal.is=false">取消</a>
					<a class="col confirm" 
					v-clipboard:copy="copy"
            		v-clipboard:success="onCopy"
            		v-clipboard:error="onError">去微信</a>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import {  } from '@api/api_user';
	import {Toast,MessageBox} from 'mint-ui';
	
	export default {        
		data() {
			return {
				copy: "",
				share: false,
				login:{
					is: false,
					phone: ''
				},
				shareList:[{
					name:"wx"
				},{
					name:"pyq"
				},{
					name:"qq"
				},{
					name:"zq"
				},{
					name:"wb"
				}],
				modal:{
					is: false
				},
				flag: null
			}
		},
		created() {
			this.flag = this.$route.query.flag;
            if(this.flag){
                localStorage.setItem("flag",this.flag)
            }
			var token = localStorage.getItem("token");
			if(token){
				this.login = {
					is: true,
					phone: localStorage.getItem("p")
				}
			}else{
				var url = "#/login";
				if(this.flag){
					url += "?flag="+this.flag
				}
				location.href = url;
			}
			
			this.copy = this.globalFun.constant.contact("weixin");
		},
		methods: {
			
			setting(){
				var path = "/setting"
				if(this.flag){
					path += "?flag=" + this.flag
				}
				this.$router.push({
					path: path,
				})
			},
			applyRecord(){
				this.$router.push({
					path:"/applyRecord",
				})
			},
			notice(){
				this.$router.push({
					path:"/notice",
				})
			},
			browse(){
				this.$router.push({
					path:"/browse",
				})
			},
			fun(){

			},

			onCopy: function (e) {
				this.modal.is = false;
				location.href = "weixin://";
				Toast("复制成功，进入微信粘贴即可！")
			},
			onError: function (e) {
				console.log(e)
			},
			checkItem(){
				console.log()
			}
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import "./index.less";
.modal{
	position: fixed;
	z-index: 999;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0,0.5);
	display: flex;
    justify-content: center;
    align-items: center;
	.modal-block{
		width: 75%;
		background: #fff;
		border-radius: 6px;
		display: initial;
		padding: 0.5rem 0.4rem 0.4rem 0.4rem;
		.modal-cnt{
			@include font-dpr(14px);
			margin-bottom: 1rem;
		}
		.modal-btn{
			a{
				border: 1px solid #44B5ED;
				text-align: center;
				padding: 0.2rem 0;
				border-radius: 6px;
				@include font-dpr(15px);
			}
			.cancel{
				margin-right: 0.5rem;
				color: #44B5ED;
			}
			.confirm{
				background: #44B5ED;
				margin-left: 0.5rem;
				color: #ffffff;
			}
		}
	}
}
</style>
<style>







