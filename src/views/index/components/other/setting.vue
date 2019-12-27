<template>
	<div class="setting">
        <mt-header fixed title="设置">
            <mt-button icon="back" slot="left" @click="goBack"></mt-button>
        </mt-header>
        <div class="page-wrap">
            <div class="list">
                <!-- <div class="item row border0">
                    <div class="col">版本更新</div>
                    <i class="mintui mintui-back right"></i> 
                </div> -->
                <router-link to="/pwd">
                <div class="item row border0 mint-cell">
                    <span class="mint-cell-mask"></span>
                    <div class="col">修改密码</div>
                    <i class="mintui mintui-back right"></i> 
                </div>
                </router-link>
                <router-link to="/aboutUs">
                <div class="item row mint-cell">
                    <span class="mint-cell-mask"></span>
                    <div class="col">关于我们</div>
                    <i class="mintui mintui-back right"></i> 
                </div>
                </router-link>
                <router-link to="/feedback">
                <div class="item row mint-cell">
                    <span class="mint-cell-mask"></span>
                    <div class="col">意见反馈</div>
                    <i class="mintui mintui-back right"></i> 
                </div>
                </router-link>

                <!-- <div class="item row mint-cell" @click="evaluate">
                    <span class="mint-cell-mask"></span>
                    <div class="col">给个好评</div>
                    <i class="mintui mintui-back right"></i> 
                </div> -->
                <div class="item row mint-cell" @click="share">
                    <span class="mint-cell-mask"></span>
                    <div class="col">分享给好友</div>
                    <i class="mintui mintui-back right"></i> 
                </div>
            </div>
            <div class="btn" @click="loginOut">
                <a class="btn-gradient">退出登录</a>
            </div>
        </div>
		
		<div class="modal" v-if="modal.is" @click.stop="modal.is=false">
            <div class="modal-cnt row">
                <div class="col" @click.stop="share_wx">
                    <div class="wx"></div>
                    <div class="lb">微信好友</div>
                </div>
                <div class="col" @click.stop="share_pyq">
                    <div class="pyq"></div>
                    <div class="lb">朋友圈</div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
    import {Toast,MessageBox,Indicator} from 'mint-ui';
    import { queryUpInfo } from '@api/api_user';
    
	
	export default {        
		data() {
			return {
                info: {},
                modal: {
                    is: false
                },
                token: null
			}
		},
		created() {
            this.info = this.globalFun.constant.contactAll();
            this.token = this.$route.query.token;
            if(this.token){
                localStorage.setItem("token",this.token)
            }
           
		},
		methods: {
            queryUpInfo(){
                queryUpInfo().then(res=>{
                    if(res.code == 200){
                        this.info = res.data;
                    }
                })
            },
			loginOut(){
                MessageBox.confirm('', { 
                    message: '您是否要退出当前账户？', 
                    title: '退出登录提示', 
                }).then(action => { 
                    localStorage.clear();
                    if(this.token){
                        window.android.loginOut();
                    }else{
                        this.$router.push({
                            path:"/tabs/home",
                        })
                    }
                    
                }).catch(err => { 
                    
                });
            },
            hotline(){
                var phone = this.info.phone;
                MessageBox.confirm('', { 
                    message: '<div class="num">'+phone+'</div><div class="tip">服务时间：工作日9:00-17:00</div>', 
                    title: '客服咨询热线',
                    confirmButtonText: '呼叫'
                }).then(action => { 
                    if(this.token){
                        window.android.callNativeTelPhone(phone);
                    }else{
                        window.plugins.CallNumber.callNumber(function onSuccess(result){
                        
                        },
                        function onError(result) {
                            
                        },
                        phone,false);
                    }
                }).catch(err => { 
                    
                });
            },
            cooperation(){
               MessageBox('商务合作方式',this.info.email+'<br>QQ:'+this.info.qq);
            },
            evaluate(){
                location.href = "http://www.baidu.com";
            },
            share_wx(){
                this.share(Wechat.Scene.SESSION);
                this.modal.is = false;
            },
            share_pyq(){
                this.share(Wechat.Scene.TIMELIN);
                this.modal.is = false;
            },
            share(){
                try{
                    window.android.onShareClick();
                }catch(e){

                }

                // var website = this.info.website;// langying
                // var appName = this.info.name;   // langying
                // var appTitle = this.info.title; // langying

                // Indicator.open();
                // setTimeout(()=>{
                //     Indicator.close();
                // },3000)
                // Wechat.share({
                //     message: {
                //         title: appName,
                //         description: appTitle,
                //         mediaTagName: appName,
                //         thumb : "data:image/png;base64,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",
                //         media: {
                //             type: Wechat.Type.WEBPAGE,   // webpage
                //             webpageUrl: website + "/spread.html#/spread/load"    // webpage
                //         }
                //     },
                //     scene: scene //Wechat.Scene.TIMELINE   // share to TIMELINE SESSION
                // }, function () {
                //     Toast("分享成功");
                // }, function (reason) {
                //     Toast("Failed: " + reason);
                // });
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
@import "./setting.less";
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
	
    .modal-cnt{
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        background: #fff;
        .col{
            padding: 0.3rem 0 0.3rem 0;
        }
        .wx{
            width: 1.3rem;
            height: 1.3rem;
            background: url('../../../../common/assets/images/wx.png') no-repeat;
            background-size: cover;
            margin: 0 auto;
        }
        .pyq{
            width: 1.3rem;
            height: 1.3rem;
            background: url('../../../../common/assets/images/pyq.png') no-repeat;
            background-size: cover;
            margin: 0 auto;
        }
        .lb{
            @include font-dpr(15px);
            margin-top: 0.3rem;
        }
    }
    
	
}
</style>



