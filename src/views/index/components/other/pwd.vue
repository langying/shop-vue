<template>
	<div class="register">
        <mt-header fixed title="设置密码">
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
                <a class="btn-gradient" @click="confirm">确定</a>
            </div>
        </div>
	</div>
	
</template>

<script>
    import { getCode, editPwd } from '@api/api_user';
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
            getCode(){
                if(!this.params.account){
                    Toast('请输入手机号');
                    return false;
                }
                getCode({
                    account: this.params.account,
                    type: 3
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
                        clearInterval(interval);
						return false;
					}
					_this.code.time -= 1; 
				},1000);
			},
            changeEye(){
                this.is = !this.is;
            },
            confirm(){
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
                editPwd({
                    account: this.params.account,
                    passWord: md5(this.params.passWord),
                    validCode: this.params.validCode
                }).then(res=>{
                    if(res.code === 200){
                        Toast({message: "设置成功"});
                        setTimeout(res=>{   
                            this.$router.go(-1);
                        },1000)
                    }else{
                        Toast({
                            message: res.desc
                        });
                    }
                })
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import "./register.less";
</style>



