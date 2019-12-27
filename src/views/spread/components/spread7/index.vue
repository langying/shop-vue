<template>
	<div class="spread">
		<img class="bg" src="../../../../common/assets/images/spread/bg3.jpg" alt="">
        <div class="block">
            <div class="cnt">
                <div class="ipt">
                    <div class="phone row">
                        <i class="icon"></i>
                        <input class="col" type="number" v-model="params.account" placeholder="请输入您的手机号" />
                        <div class="code" v-if="!code.is" @click="getCode">获取验证码</div>
                        <div class="code disabled" v-else>{{code.time}}s 后重发</div>
                    </div>
                    <div class="validCode row">
                        <input class="col" type="text" v-model="params.validCode" maxlength="4" placeholder="请输入验证码"/>
                    </div>
                </div>
                <div class="btn"><img src="../../../../common/assets/images/spread/spread3-btn.png" alt="" @click="submit"></div>
                <div class="xieyi">点击"查看我的额度"视为同意<span @click="agreement">《用户注册协议》</span></div>
                <div class="record">
                    <p>{{info.company}}</p>
                    <p>{{info.copyright}}</p>
                    <p>{{info.title}}</p>
                </div>
            </div>
        </div>

        
	</div>
</template>

<script>
	import { getCode,register } from '@api/api_user';
	import {Toast,MessageBox} from 'mint-ui';
	
	export default {        
		data() {
			return {
                params:{
                    account:"",
                    validCode:"",
                    inviteCode: ""
                },
                code:{
                    is: false,
                    time: 60
                }
			}
		},
		created() {
            this.info = this.globalFun.constant.contactAll();
            this.params.inviteCode = this.$route.query.uid || '';
            window.addEventListener("resize", function() {
                if(document.activeElement.tagName == "INPUT") {
                    window.setTimeout(function() {
                        document.activeElement.scrollIntoViewIfNeeded();
                    }, 0);
                }
            })

        },
        mounted(){
            
           
        },
		methods: {
            getCode(){
                if(!this.params.account){
                    Toast('请输入手机号');
                    return false;
                }
                var appName = this.info.name;
                var website = this.info.website;
                getCode({
                    account: this.params.account,
                    type: 2
                }).then(res=>{
                    var code = res.code;
                    if(code === 200){
                        this.countdown();
                    }else if(code == 103){
                        Toast({message: "您已注册，即将前往" + appName});
                        setTimeout(()=>{
                            location.href = website;
                        }, 1000);
                    }else{
                        Toast({message: res.desc});
                    }
                })
            },
            countdown(){
                let _this = this;
                this.code.is = true;
                this.code.time = 60;
				var interval = setInterval(function(){
					if(_this.code.time<1){
                        _this.code.is = false;
                        clearInterval(interval);
						return false;
					}
					_this.code.time -= 1; 
				},1000);
            },
            submit(){
               
                if(!this.params.account){
                    Toast('请输入手机号');
                    return false;
                }
                if(!this.params.validCode){
                    Toast('请输入短信验证码');
                    return false;
                }
                var appURL  = this.info.appURL;
                var appName = this.info.name;
                var website = this.info.website;
                var versions = this.globalFun.browserCheck.versions;
                register({
                    account: this.params.account,
                    validCode: this.params.validCode,
                    inviteCode: this.params.inviteCode
                }).then(res=>{
                    if(res.code === 200){
                        location.href = appURL;
                    }else if(res.code == 103){
                        Toast({message: "您已注册，即将前往" + appName});
                        setTimeout(()=>{
                            location.href = website;
                        }, 1000);
                    }else{
                        Toast({
                            message: res.desc
                        });
                    }
                })
            },
            agreement(){
                this.$router.push({
                    path:"/agreement",
                })
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import "../spread3/index.less";

</style>
<style>
html, body{
    background-color: transparent !important;
}
</style>


