<template>
	<div class="register">
        <mt-header class="myHeader" fixed title="注册">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
		<div class="page-wrap">
            <div class="ipt">
                <div class="row">
                    <label class="lb">手机号</label>
                    <input class="col" type="tel" v-model="params.account" placeholder="请输入手机号" maxlength="11"/>
                </div>
                <div class="row">
                    <label class="lb">验证码</label>
                    <input class="col" v-model="params.validCode" placeholder="请输入短信验证码" maxlength="6"/>
                    <span class="get">
                        <a class="btn-gradient" v-if="!code.is" @click="getCode">获取</a>
                        <a class="code" v-if="code.is">{{code.time}}s</a>
                    </span>
                </div>
                <div class="row">
                    <label class="lb">密码</label>
                    <input :type="is?'text':'password'" v-model="params.passWord" class="col" placeholder="请输入6-22位密码" maxlength="22"/>
                    <i class="eye" :class="is?'open':'close'" @click="changeEye"></i>
                </div>
            </div>
            
            <div class="btn">
                <a class="btn-gradient" @click="register">注册</a>
            </div>
            <div class="tip">
                <router-link to="/login" slot="left">已有账号，请登录</router-link>
            </div>
            <div class="btn tip">
                注册即表示阅读并同意<span @click="agreement">《用户注册协议》</span>
            </div>
        </div>
	</div>
	
</template>

<script>
    import { register,getCode } from '@api/api_user';
    import md5 from '@common/assets/js/md5.js';
	import {Toast} from 'mint-ui';
	
	export default {        
		data() {
			return {
                is: false,
                params: {
                    account: "",
                    passWord: "",
                    validCode: ""
                },
                code:{
                    is: false,
                    time: 60
                }
			}
		},
		created() {
            
		},
		methods: {
			register(){
                if(!this.params.account){
                    Toast('请输入手机号');
                    return false;
                }
                if(!this.params.validCode){
                    Toast('请输入短信验证码');
                    return false;
                }
                if(!this.params.passWord){
                    Toast('请输入密码');
                    return false;
                }
                if(this.params.passWord.length<6){
                    Toast('密码至少6位');
                    return false;
                }
                register({
                    account: this.params.account,
                    passWord: md5(this.params.passWord),
                    validCode: this.params.validCode
                }).then(res=>{
                    if(res.code === 200){
                        Toast({message: "注册成功"});
                        localStorage.setItem("token",res.data.token);
                        localStorage.setItem("token-data",new Date().getTime());
                        var tel = res.data.account;
                        tel = tel.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
                        localStorage.setItem("p",tel);
                        setTimeout(res=>{   
                            this.$router.push({
                                path:"/tabs/my",
                            })
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
                    type: 2
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
            agreement() {
                this.$router.push({
                    path:"/agreement",
                });
            },
            changeEye(){
                this.is = !this.is;
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import "./register.less";
</style>