<template>
	<div class="spread">
		<img class="bg" src="../../../../common/assets/images/spread/bg2.jpg" alt="">
        <div class="block">
            <div class="cnt">
                <div class="title row">
                    <div class="col"><i></i></div>
                    <div class="lb">一分钟急速申请</div>
                    <div class="col"><i></i></div>
                </div>
                <div class="tip row">
                    <div class="col">
                        <i class="icon1"></i>
                        <div class="name">门槛低</div>
                        <div class="lb">无视黑白户</div>
                        <div class="lb">90%通过率</div>
                    </div>
                    <div class="col">
                        <i class="icon2"></i>
                        <div class="name">额度高</div>
                        <div class="lb">最高额度</div>
                        <div class="lb">100000</div>
                    </div>
                    <div class="col">
                        <i class="icon3"></i>
                        <div class="name">放款快</div>
                        <div class="lb">三秒钟申请</div>
                        <div class="lb">秒放款</div>
                    </div>
                </div>
                <div class="ipt row">
                    <i class="phone"></i>
                    <input class="col" type="number" v-model="params.account" placeholder="请输入手机号" />
                </div>
                <div class="btn" @click="getCode"><label>立即拿钱</label></div>
                <div class="xieyi">点击"立即拿钱"视为同意<span @click="agreement">《用户注册协议》</span></div>
            </div>
        </div>

        <div class="modal" v-if="modal.skip1">
            <div class="modal-cnt">
                <div class="modal-close" @click.stop="modal.skip1=false"></div>
                <div class="modal-title">请输入短信验证码</div>
                <div class="modal-ipt row">
                    <input type="text" maxlength="4" class="col" v-model="params.validCode" placeholder="请输入短信验证码" v-on:input="submit"/>
                    <div class="code">
                        <span v-if="!code.is" @click="getCode">获取验证码</span>
                        <span v-else><label>{{code.time}}秒</label>后重发</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" v-if="modal.skip2">
            <div class="modal-cnt">
                <div class="modal-close" @click.stop="modal.skip2=false"></div>
                
                <div class="modal-lb">
                    <p>恭喜您注册成功，</p>
                    <p>限时活动马上领取5000元现金！</p>
                </div>
                <a v-if="url" class="modal-btn" :href="url">立即下载</a>
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
                url:"",
                params:{
                    account:"",
                    validCode:"",
                    inviteCode: ""
                },
                code:{
                    is: false,
                    time: 60
                },
                modal:{
                    skip1: false,
                    skip2: false
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
                var appName = this.info.name;
                var website = this.info.website;
                if(!this.params.account){
                    Toast('请输入手机号');
                    return false;
                }
                // this.modal = {
                //     skip1: true,
                //     skip2: false,
                // }
                // this.code.is = true;
                this.params.validCode = "";
                if(this.code.is){
                    this.modal = {
                        skip1: true,
                        skip2: false,
                    }
                    return false;
                }
                getCode({
                    account: this.params.account,
                    type: 2
                }).then(res=>{
                    var code = res.code;
                    if(code === 200){
                        this.modal = {
                            skip1: true,
                            skip2: false,
                        }
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
            submit(){
                var apkURL  = this.info.apkURL;
                var appName = this.info.name;
                var website = this.info.website;
                var validCode = this.params.validCode;
                var versions = this.globalFun.browserCheck.versions;
                if(validCode.length == 4){
                    register({
                        account: this.params.account,
                        validCode: this.params.validCode,
                        inviteCode: this.params.inviteCode
                    }).then(res=>{
                        if(res.code === 200){
                            if(versions.ios){
                                this.modal = {
                                    skip1: false,
                                    skip2: false,
                                }
                                Toast({message: "注册成功，即将前往" + appName});
                                var tel = res.data.account;
                                tel = tel.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
                                localStorage.setItem("p", tel);
                                localStorage.setItem("token", res.data.token);
                                localStorage.setItem("token-data", new Date().getTime());
                                setTimeout(()=>{
                                    location.href = website;
                                }, 1000);
                            }else{
                                this.modal = {
                                    skip1: false,
                                    skip2: true,
                                }
                                this.url = apkURL;
                            }
                        }else if(res.code == 103){
                            Toast({message: "您已注册，即将前往" + appName});
                            setTimeout(()=>{
                                location.href = website;
                            },1500)
                        }else{
                            Toast({
                                message: res.desc
                            });
                        }
                    })
                }
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
@import "./index.less";
</style>
<style>
html, body{
    background-color: transparent !important;
}
</style>


