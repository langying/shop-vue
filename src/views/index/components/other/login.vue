<template>
	<div class="login">
        <mt-header fixed title="登录">
            <mt-button icon="back" slot="left" @click="goHome" v-if="!flag"></mt-button>
            <router-link to="/register" slot="right">
                <mt-button class="register">注册</mt-button>
            </router-link>
        </mt-header>
		<div class="page-wrap">
            <div class="row tab">
                <div class="col" :class="currTab==1?'active':''" @click="changeTab(1)">
                    <span>手机动态登录</span>
                </div>
                <div class="line"></div>
                <div class="col" :class="currTab==2?'active':''" @click="changeTab(2)">
                    <span>账号密码登录</span>
                </div>
            </div>
            <div class="ipt">
                <div class="row">
                    <label class="lb">手机号</label>
                    <input type="tel" class="col" v-model="params.account" placeholder="请输入手机号" maxlength="11"/>
                </div>
                <div class="row"  v-if="currTab==1">
                    <label class="lb">验证码</label>
                    <input class="col" v-model="params.validCode" placeholder="请输入短信验证码" maxlength="6"/>
                    <span class="get">
                        <a class="btn-gradient" v-if="!code.is" @click="getCode">获取</a>
                        <a class="code" v-if="code.is">{{code.time}}s</a>
                    </span>
                </div>
                <div class="row" v-if="currTab==2">
                    <label class="lb">密码</label>
                    <input type="password" v-model="params.passWord" class="col" placeholder="请输入6-22位密码" maxlength="22"/>
                </div>
            </div>
            <div class="forget" >
                <a @click="forget">忘记/设置密码？</a>
            </div>
            <div class="btn">
                <a class="btn-gradient" @click="login">登录</a>
            </div>
            <div class="forget" style="text-align:center">
                注册即表示阅读并同意<span @click="agreement">《用户注册协议》</span>
            </div>
        </div>
	</div>
</template>

<script>
    import { login,getCode } from '@api/api_user';
    import md5 from '@common/assets/js/md5.js';
	import {Toast} from 'mint-ui';
	
	export default {        
		data() {
			return {
                params:{
                    account:"",
                    validCode:"",
                    passWord:""
                },
                code:{
                    is: false,
                    time: 60
                },
                currTab: 1,
                productId: null,
                flag: null
			}
		},
		created() {
            this.productId = this.$route.query.productId;
            this.flag = this.$route.query.flag;
            if(this.flag){
                localStorage.setItem("flag",this.flag)
            }
		},
		methods: {
            login(){
                var params = {};
                if(!this.params.account){
                    Toast('请输入手机号');
                    return false;
                }
                params.account = this.params.account;
                if(this.currTab == 1){
                    if(!this.params.validCode){
                        Toast('请输入短信验证码');
                        return false;
                    }
                    params.validCode = this.params.validCode;
                }else if(this.currTab == 2){
                    if(!this.params.passWord){
                        Toast('请输入密码');
                        return false;
                    }
                    params.passWord = md5(this.params.passWord);
                }
                login(params).then(res=>{
                    if(res.code === 200){
                        Toast({message: "登录成功"});
                        var token = res.data.token;
                        localStorage.setItem("token",token);
                        localStorage.setItem("token-data",new Date().getTime());
                        var tel = res.data.account;
                        tel = tel.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
                        localStorage.setItem("p",tel);
                        

                        setTimeout(res=>{   
                            if(this.productId){
                                if(this.flag){ 
                                    try{
                                        window.android.getLoginMsg(token,tel);
                                    }catch(e){}
                                }
                                this.$router.go(-1);
                            }else{
                                if(this.flag == 1){
                                    this.$router.push({
                                        path:"/my?flag=1",
                                    })
                                    try{
                                        window.android.getLoginMsg(token,tel);
                                    }catch(e){}
                                }else if(this.flag == 2){
                                    try{
                                        window.android.getLoginMsg(token,tel);
                                    }catch(e){}
                                }else{
                                    this.$router.push({
                                        path:"/tabs/my",
                                    })
                                }
                            }
                        },1000)
                    }else{
                        Toast({
                            message: res.desc
                        });
                    }
                })
            },
            getCode(){
                if(!this.params.account){
                    Toast('请输入手机号');
                    return false;
                }
                getCode({
                    account: this.params.account,
                    type: 1
                }).then(res=>{
                    if(res.code === 200){
                        Toast({message: "发送成功"});
                        this.countdown();
                    }else{
                        Toast({message: res.desc});
                    }
                })
            },
            countdown(){
                let _this = this;
                this.code.is = true;
				var interval = setInterval(function(){
					if(_this.code.time<1){
                        _this.code.is = false;
                        _this.code.time = 60;
                        clearInterval(interval);
						return false;
					}
					_this.code.time -= 1; 
				},1000);
			},
			changeTab(type){
                this.currTab = type;
                Object.assign(this.$data.params, this.$options.data().params);
            },
            goHome(){
                this.$router.push({
					path:"/tabs/home",
				})
            },
            agreement(){
                this.$router.push({
					path:"/agreement",
				})
            },
            forget(){
                this.$router.push({
					path:"/pwd",
				})
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import "./login.less";

</style>



