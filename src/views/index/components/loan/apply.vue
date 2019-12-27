<template>
	<div class="iframe page-wrap">
        <mt-header class="myHeader" fixed :title="title">
            <mt-button icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
		<div class="modal" v-if="modal.is" @click.stop="modal.is=false">
			<div class="modal-block" @click.stop="fun">
				<div class="modal-cnt">
					<div class="title">这一次，为什么要离开我</div>
					<div class="radiolist">
						<div class="mint-radiolist" >
							<a class="mint-cell" v-for="(item,index) of options" :key="index">
								<div class="mint-cell-wrapper">
									<div class="mint-cell-title">
										<label class="mint-radiolist-label">
											<span class="mint-radio">
												<input type="radio" name="radio" v-model="type" class="mint-radio-input" :value="item.val">
												<span class="mint-radio-core"></span>
											</span>
											<span class="mint-radio-label">{{item.lb}}</span>
											<span v-if="item.val == 3"><input ref="remark" v-model="remark" class="remark" placeholder="原因" type="text"/></span>
										</label>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
				<div class="modal-btn row">
					<a class="col cancel" @click="confirm">确定</a>
					<a class="col confirm" @click.stop="modal.is=false">继续申请</a>
				</div>
			</div>
		</div>
        <iframe ref="myFrame" id="myFrame" target='_blank' :src="src" frameborder="0" ></iframe>

	</div>
</template>

<script>
	import {Toast,Indicator} from 'mint-ui';
	import { loanRecord } from '@api/api_loan';
	export default {      
		// props: {
        //     info: {
        //         type: Object,
        //         default() {
        //             return {
		// 				src: "",
		// 				show: false
		// 			};
        //         }
		// 	}
		// },
		
		data() {
			return {
				type: '',
				remark:"",
				src: "",
				title:"",
				modal: {
					is: false
				},
				options:[{
					val: 1,
					lb:"我已提交"
				},{
					val: 2,
					lb: "没有提交，我要离开"
				},{
					val: 3,
					lb: "我要倾诉：",
				}],
				timer: null,
				count: 0,
				maxCount: 30
			}
		},
		created() {
			
			var _this = this;
			this.title = this.$route.query.name;
			this.productId = this.$route.query.id;
			this.src = this.$route.query.url;
			this.timer = setInterval(function(){
				_this.count = ++_this.count;
				if(_this.count >= _this.maxCount){
					clearInterval(_this.timer);
					console.log("自动申请")
				}
			},1000);  
		},
		
		beforeDestroy() {
			if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
				clearInterval(this.timer); //关闭
			}
		},
		mounted(){
			
		},
		methods: {
			confirm(){
				if(!this.type){
					Toast({
						message: '请选择',
						position: 'bottom',
						duration: 2500
					})
					return false;
				}
				if(this.type == 3 && !this.remark){
					Toast({
						message: '请输入原因',
						position: 'bottom',
						duration: 2500
					})
					return false;
				}
				this.modal.is = false;

				var params = {
					productId: this.productId,
					type: this.type
				}
				if(this.type == 3){
					params.content = this.remark;
				}
				loanRecord(params).then(res=>{
					if(res.code == 200){
						
					}
				})
				this.$router.push({
					path:"/tabs/home",
				})
				
			},
			back(){
				// this.info.show = false;
				if(this.count>=this.maxCount){
					this.modal.is = true;
					return false;
				}
				this.$router.push({
					path:"/tabs/home",
				})
				// this.$router.go(-1);
			},
			fun(){
				
			}
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
.iframe{
	background: #F3F3F3;
}
iframe{
	width: 100%;
	height: 94vh;
	margin-top: 40px
}
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
		padding: 0.5rem 0 0.4rem 0;
		.modal-cnt{
			@include font-dpr(14px);
			margin-bottom: 0.5rem;			
			.title{
				text-align: center;
				color: #F04440;
				@include font-dpr(16px);
				padding: 0 0 0.3rem 0;
				
			}
			.radiolist{
				padding: 0.3rem 0.4rem;
				border-top: 1px solid #eee;
				border-bottom: 1px solid #eee;
			}
		}
		.modal-btn{
			padding: 0 0.4rem;
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
.mint-radiolist-label{
	display: flex;
	align-items: center;
}
.mint-cell{
	min-height: 1rem;
}
.mint-radiolist-label .remark{
	width: 3rem;
	margin-left: 0.2rem;
	border: 0;
	border-bottom:1px solid #eee;
	line-height: 0.8rem;
}
.mint-cell-wrapper,.mint-cell:last-child{
	background-image: initial
}
.mint-cell-wrapper,.mint-radiolist-label{
	padding: 0;
}
.mint-radio-core{
    border: 1px solid #eee;
}
</style>
