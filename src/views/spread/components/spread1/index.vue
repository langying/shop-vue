<template>
	<div class="spread">
        <div class="cnt">
            <div class="logo row">
                <img src="../../../../common/assets/images/logo.png" alt="">
                <label>{{info.name}}</label>
            </div>
            <div>
                <canvas ref="canvas" id="canvas" width="300" height="250" data-score='50000'></canvas>
            </div>
            <div class="title">急用钱<span>来{{info.name}}</span>当天拿钱</div>
            <div class="tip row">
                <div class="col"><i></i>通过率高</div>
                <div class="col"><i></i>一键借款</div>
                <div class="col"><i></i>极速放款</div>
            </div>
            <div class="ipt">
                <div class="row">
                    <input class="col" v-model="params.account" type="number"  maxlength="11" placeholder="请输入手机号"/>
                    <div class="line"></div>
                    <div class="code" v-if="!code.is" @click="getCode">获取验证码</div>
                    <div class="code" v-if="code.is">{{code.time}}s</div>
                </div>
                <div class="row">
                    <input class="col" v-model="params.validCode" type="text" maxlength="6" placeholder="请输入短信验证码"/>
                </div>
                <div class="btn" @click="submit"></div>
                <div class="lb">点击"马上领钱"表示阅读并同意<span @click="agreement">《{{info.name}}服务协议》</span></div>
            </div>
            <p class="mark">{{info.title1}}</p>
            <p class="mark" style="text-align:center;">{{info.title2}}</p>
            <p class="mark" style="text-align:center;">{{info.icp}}</p>
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
                },
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
            
            window.requestAnimFrame = (function() {
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    function(callback) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();
                
            var canvas = this.$refs.canvas,
                ctx = canvas.getContext('2d'),
                cWidth = canvas.width,
                cHeight = canvas.height,
                score = canvas.attributes['data-score'].value,
                radius = 115, //圆的半径
                deg0 = Math.PI / 9, //每一格20度
                mum = 500, //数字步长
                /*
                    * 要求：圆弧走完，数字得自加完，就得确定圆弧走的次数和数字走的次数相等！
                    数字最大50000，对应的度数是11*PI/9,那每个步长mum对应的度数如下：
                    */
                deg1 = mum * Math.PI * 11 / 9 / 50000; // 每mum对应的度数
        
            var angle = 0, //初始角度
                credit = 0; //数字默认值开始数

            var drawFrame = function() {
                if(score < 0 || score > 50000) {
                    alert('额度只能是0--50000')
                    score = 50000;
                }
                ctx.save();
                ctx.clearRect(0, 0, cWidth, cHeight);
                ctx.translate(cWidth / 2, cHeight / 2);
                ctx.rotate(7.5 * deg0); //160度

                var aim = score * deg1 / mum; //数字对应的弧度数,先确定要走几次,除以mum,然后计算对应的弧度数
                if(angle < aim) {
                    angle += deg1;
                }

                if(credit < score) {
                    credit += mum; //默认数字间隔是mum
                } else if(credit >= 50000) {
                    credit = 50000;
                }
                //信用额度
                ctx.save();
                ctx.rotate(10.5 * deg0);
                ctx.fillStyle = 'white';
                ctx.font = '26px Microsoft yahei';
                ctx.textAlign = 'center';
                ctx.fillText('最高可借款(元)', 0, -35);
                ctx.restore();
                //
                text(credit);

                ctx.save();
                ctx.beginPath();
                ctx.lineWidth = 10;
                ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
                // ctx.arc(0, 0, radius, 0, angle, false); //动画圆环
                ctx.arc(0,0,radius,0,1.078*angle,false);
                ctx.stroke();
                ctx.restore();
                ctx.save();
                
                ctx.restore();
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
                ctx.lineWidth = 10;
                // ctx.arc(0, 0, radius, 0, 11.1 * deg0, false); //设置外圆环220度
                ctx.arc(0,0,radius,0,12 * deg0,false);
                ctx.stroke();
                ctx.restore();

                window.requestAnimFrame(drawFrame);

            }

            function text(process) {
                ctx.save();
                ctx.rotate(10.5 * deg0); //200度
                ctx.fillStyle = '#fff';
                ctx.font = '48px Microsoft yahei';
                ctx.textAlign = 'center';
                ctx.textBaseLine = 'top';
                ctx.fillText(process, 0, 40);
                ctx.restore();
            }

            setTimeout(function() {
                document.getElementById("canvas").style.display = "block";
                drawFrame();
            }, 10)
        },
		methods: {
            getHome(){
                return this.info.website + "/#/tabs/home"
            },
            getCode(){
                var appName = this.info.name;
                if(!this.params.account){
                    Toast('请输入手机号');
                    return false;
                }
                getCode({
                    account: this.params.account,
                    type: 2
                }).then(res=>{
                    var code = res.code;
                    if (code === 200) {
                        Toast({message: "发送成功"});
                        this.countdown();
                    } else if (code == 103) {
                        Toast({message: "您已注册，即将前往" + appName});
                        setTimeout(()=>{
                            // this.$router.push({ path : "/load" });
                            location.href = this.info.appURL;
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
                if(!this.params.account){
                    Toast('请输入手机号');
                    return false;
                }
                if(!this.params.validCode){
                    Toast('请输入短信验证码');
                    return false;
                }
                var appName = this.info.name;
                var versions = this.globalFun.browserCheck.versions;
                register({
                    account: this.params.account,
                    validCode: this.params.validCode,
                    inviteCode: this.params.inviteCode
                }).then(res=>{
                    if(res.code === 200){
                        Toast({message: "注册成功，即将前往" + appName});
                        setTimeout(()=>{
                            // this.$router.push({ path : "/load" });
                            location.href = this.info.appURL;
                        }, 1000);
                        // if (versions.ios) {
                        //     Toast({message: "注册成功，即将前往" + appName});
                        //     setTimeout(()=>{
                        //         location.href = this.getHome();
                        //     }, 1000);
                        // } else {
                        //     this.$router.push({
                        //         path:"/spread/load",
                        //     });
                        // }
                    } else if (res.code == 103) {
                        Toast({message: "您已注册，即将前往" + appName});
                        setTimeout(()=>{
                            // this.$router.push({ path : "/load" });
                            location.href = this.info.appURL;
                        }, 1000);
                    } else {
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
@import "./index.less";

#canvas{
    margin: -0.7rem auto 0 auto;
}
</style>
<style>
body, html{
    
    background: linear-gradient(180deg,#ef7d1d,#ead5bc);
}
</style>

