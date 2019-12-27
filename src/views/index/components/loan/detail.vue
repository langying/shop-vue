<template>
	<div class="detail">
        <div class="black" @click="$router.go(-1)" v-if="!flag && !token"><i class="mintui mintui-back"></i> </div>
        <div class="page-wrap">
            <div class="detail-top">
                <div class="banner">
                    <div class="row num">
                        <div class="col">
                            <div class="line"><span></span></div>
                            <div class="val">{{compute.repayment}}元</div>
                            <div class="lb">总还款</div>
                        </div>
                        <div class="col">
                            <div class="line"><span></span></div>
                            <div class="val">{{compute.interest}}元</div>
                            <div class="lb">总利息</div>
                        </div>
                        <div class="col">
                            <div class="line"><span></span></div>
                            <div class="val">{{info.rateScope || 0}}%</div>
                            <div class="lb">{{info.rateUnit}}利率</div>
                        </div>
                    </div>
                    <div class="name">
                        <img v-if="info.imgUrl" :src="info.imgUrl">
                        <span>{{info.name}}</span>
                    </div>  
                </div>
                <div class="info">
                    <div class="row">
                        <div class="col">申请人数：{{info.applyTotal || 0}}人</div>
                        <div class="col">利率范围：{{info.rateScope}}%</div> 
                    </div>
                    <div class="row">
                        <div class="col">贷款范围：{{info.loanAmountMin}}-{{info.loanAmountMax}}元</div>
                        <div class="col">期限范围：{{info.borrowMin}}-{{info.borrowMax}}{{globalFun.constant.borrowUnit(info.borrowUnit)}}</div> 
                    </div>
                </div>
               
            </div>
            <div class="select">
                <div class="row">
                    <div class="lb col">金额</div>
                    <div class="val amount"><input type="number" v-model="compute.amount" @blur="amountInput">元</div>
                </div>
                <div class="row" @click="modal.is=true;modal.title='期限'">
                    <div class="lb col">期限</div>
                    <div class="val">{{compute.term}} {{globalFun.constant.borrowUnit(info.borrowUnit)}}</div>
                    <i class="mintui mintui-back right"></i> 
                </div>
            </div>      
                
                    
            <div class="block ">
                <div class="title">申请流程</div>
                <div class="cnt row flow">
                    <div class="col">
                        <div><i class="flow1"></i></div>
                        <div>身份证</div>
                    </div>
                    <div class="line"></div>
                    <div class="col">
                        <div><i class="flow2"></i></div>
                        <div>手机号认证</div>
                    </div>
                    <div class="line"></div>
                    <div class="col">
                        <div><i class="flow3"></i></div>
                        <div>基本信息</div>
                    </div>
                    <div class="line"></div>
                    <div class="col">
                        <div><i class="flow4"></i></div>
                        <div>等待放款</div>
                    </div>
                </div>
            </div>
            <div class="block" v-if="info.applyData">
                <div class="title">申请条件</div>
                <div class="cnt">
                    <div v-for="(item,index) of info.applyData.split(/[\s\n]/)" :key="index">{{item}}</div>
                </div>
            </div>
            <div class="block" v-if="info.featuresData">
                <div class="title">审核说明</div>
                <div class="cnt">
                    <div v-for="(item,index) of info.featuresData.split(/[\s\n]/)" :key="index">{{item}}</div>
                </div>
            </div>
            <div class="block" v-if="info.introduce">
                <div class="title">产品说明</div>
                <div class="cnt">
                    <div v-for="(item,index) of info.introduce.split(/[\s\n]/)" :key="index">{{item}}</div>
                </div>
                
            </div>
        </div>
        <div class="bottom">
            
            <div class="btn-gradient" @click="apply(info.linkUrl)">
                <div>立即申请</div>
            </div>
        </div>
        <a id='links' href="#" v-show="link" target="_blank"></a>
        <mt-popup v-model="modal.is" position="bottom" class="mint-popup">
            <div class="row top">
                <div><button @click.stop="modal.is=false">取消</button></div>
                <div class="title col">{{modal.title}}</div>
                <div><button @click.stop="confirm">确定</button></div>
            </div>
            <mt-picker :slots="dataList" @change="dataChange"  :visibleItemCount="3"  ref="picker" value-key="name"></mt-picker>
        </mt-popup>
        
        <iframe v-if="umengSrc" :src="umengSrc" frameborder="0" style="height:1px"></iframe>
	</div>
</template>

<script>
    import apply from './apply';
	import { loanDetail,loanApply } from '@api/api_loan';
    import {Toast,MessageBox,Indicator} from 'mint-ui';
    import webwiew from '../webwiew.js';
	
	export default {        
		data() {
			return {         
                link: false,       
                info:{
                    labels:"",
                    featuresData:"",
                    applyData:""
                },
                applyInfo:{
                    url: "www.baidu.com",
                    show: false
                },
                modal:{
                    is: false,
                    title: ""
                },
                tt: false,
                compute:{
                    term: 0,//期限
                    amount: 0,//金额
                    repayment: 0,//还款
                    interest: 0//利息
                },
                url: "",
                dataList:[{values: []}],
                umengSrc:"", //用户友盟统计
                token: null,
                flag: null
			}
        },
        components: {
            apply
        },
		created() {
            this.token = this.$route.query.token;
            this.info = this.globalFun.constant.contactAll();
            if(this.token){
                localStorage.setItem("token",this.token)
            }
            this.flag = this.$route.query.flag;
            if(this.flag){
                localStorage.setItem("flag",this.flag)
            }
            this.loanDetail();
           
		},
		methods: {
            amountInput(e){
                var _this = this;
                var amount = Number(this.compute.amount);
                var min = Number(this.info.loanAmountMin);
                var max = Number(this.info.loanAmountMax);
                
                if(amount< min){
                    this.compute.amount = min;
                }
                if(amount>max){
                    this.compute.amount = max;
                }
                this.jisuan();
            
            },
            confirm(){
                this.compute.term = this.modal.value;
                this.modal.is = false;
                this.jisuan();
            },
            dataChange(picker, values){
                if(values[0]){
                    this.modal.value = values[0];
                }
                
            },
			loanDetail(){
                var params = {
                    productId: this.$route.query.id
                }
                var messageId = this.$route.query.mesId;
                if(messageId){
                    params.messageId = messageId;
                }
                loanDetail(params).then(res=>{
                    if(res.code === 200){
                        this.info = res.data;
                        this.compute = {
                            term: this.info.borrowMax,
                            amount: this.info.loanAmountMax,
                        }
                        this.dataList[0].values.push(this.info.borrowMax);
                        this.dataList[0].values.push(this.info.borrowMin);
                        this.jisuan();
                    }
                })
            },
            jisuan(){
                var interest = (this.compute.amount * this.info.rateScope/100 * this.compute.term).toFixed(2);
                this.$set(this.compute,"repayment", (Number(this.compute.amount) + Number(interest)).toFixed(2) );
                this.$set(this.compute,"interest", interest);
            },
            apply(url){
                var token = localStorage.getItem("token");
                
                if(token){
                    var versions = this.globalFun.browserCheck.versions;
                    // url = url.search("http://") >= 0 ? url: "http://"+ url;
					// url += url.indexOf("\?")<0?"?":"&";
                    // url += "token="+localStorage.getItem("token");
                    var _this = this;
                    
                    // 打开第三方链接
                    try{
                        console.log(cordova);
                        _this.umengSrc = this.info.website+"/#/applyUmeng?name="+_this.info.name+"&type=detail";
                        Indicator.open();
                        setTimeout(() => {
                            _this.umengSrc = "";
                            Indicator.close();
                            webwiew(url,_this.info.name,_this.info.productId);  
                        }, 100);
                        
                    }catch(e){
                        // location.href = "http://"+window.location.host+"#/apply?id="+this.info.productId + "&name="+this.info.name+"&url="+url;
                        // if(versions.ios){
                        //     // this.$router.push({
                        //     //     path:"/apply?name="+_this.info.name+"&id="+_this.info.productId+"&url="+encodeURI(url),
                        //     // })
                        //     var obj = document.getElementById('links');
                        //     obj.href = url;
                        //     obj.click();
                        // }else{
                            try{
                                console.log(_this.info.name)
                                window.android.downAppName(_this.info.name,_this.info.productId);
                            }catch(e){}
                            _this.$uweb.trackEvent("产品详情", "立即申请",_this.info.name);
                            Indicator.open();
                            setTimeout(() => {
                                Indicator.close();
                                location.href = url;    
                            }, 100);
                            
                        // }
                    }
                    // 申请
                    loanApply({
                        productId: this.info.productId
                    }).then(res=>{
                       
                    })    
                    return false;
                }
                MessageBox.confirm('', { 
                    message: '你还未登录，是否立即登录？', 
                    title: '登录提示', 
                }).then(action => { 
                    var path = "/login?productId="+this.info.productId;
                    if(this.flag){
                        path += "&flag=" + this.flag;
                    }
                    this.$router.push({
                        path: path
                    })
                }).catch(err => { 
                    
                });
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import 'index.less';
@import 'detail.less';
.mint-popup{
    width: 101%;
    .top{
        line-height: 1rem;
        text-align: center;
        background: #44B5ED;
        color: #fff;
        .title{
            @include font-dpr(16px);
        }
        button{
            @include font-dpr(14px);
            border: 0;
            line-height: 1rem;
            width: 2rem;
            background: transparent;
            color: #fff;
        }
    }
}

.modal{
	position: fixed;
	z-index: 999999;
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
.picker-center-highlight:before, .picker-center-highlight:after{
    background-color: #44B5ED !important;
}

</style>
