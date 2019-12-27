<template>
	<div class="load">
        <img class="bg" src="../../../../common/assets/images/spread/load-bg.jpg" alt="">
        <div class="cnt">
           
            <div class="btn">
                <div class="item iphone" @click="trust=true"><i></i><span>iPhone版下载</span></div>
                <a class="item android" :href="info.apkURL"><i></i><span>Android版下载</span></a>     
            </div>
            <mt-popup position="bottom" v-model="trust">
                <div class="trust">
                    <div class="close" @click="trust=false">关闭</div>
                    <div class="trust-cnt">
                        <div class="title">苹果手机 "未受信任的企业级开发者" 的解决方法</div>
                        <div class="skip">
                            <div class="lb">1.在手机中打开设置功能，选择"通用"</div>
                            <img src="../../../../common/assets/images/spread/trust1.png" alt="">
                        </div>
                        <div class="skip">
                            <div class="lb">2.在通用中，选择"设备管理"功能</div>
                            <img src="../../../../common/assets/images/spread/trust2.png" alt="">
                        </div>
                        <div class="skip">
                            <div class="lb">3.打开与提示一致的文件名，点击进入，按信任按钮</div>
                            <img src="../../../../common/assets/images/spread/trust3.png" alt="">
                            <img class="trust4" src="../../../../common/assets/images/spread/trust4.png" alt="">
                        </div>
                    </div>
                    <a :href="info.ipaURL" class="bottom-btn">IOS版下载</a>
                </div>
               
            </mt-popup>
        </div>
	</div>
</template>

<script>
    import {Toast,MessageBox} from 'mint-ui';
    
	
	export default {        
		data() {
			return {
                url: "",
                trust: false
			}
		},
		created() {
            this.info = this.globalFun.constant.contactAll();
            var versions = this.globalFun.browserCheck.versions;
		},
		methods: {
           
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
.load{
   
    .bg{
        width: 100%;
    }
    .cnt{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        .btn{
            margin-top: 5.6rem;
            .item{
                margin: 0 1.6rem;
                line-height: 1.2rem;
                justify-content: center;
                align-items: center;
                border-radius: .213333rem;
                margin-bottom: .5rem;
                display: flex;
                i{
                    width: 14px;
                    height: 14px;
                    margin-right: 8px;
                }
                span{
                    @include font-dpr(14px);
                }
            }
            .iphone{
                background-color: #fff;
                span{
                    color: #545857;
                }
                i{
                    background: url('../../../../common/assets/images/spread/iphone.png') no-repeat;
                    background-size: cover;
                }
            }
            .android{
                background-color: #02C88A;
                span{  
                    color: #fff;
                }
                i{
                    background: url('../../../../common/assets/images/spread/android.png') no-repeat;
                    background-size: cover;
                }
                
            }

        }
    }
}
.trust{
    background: #fff;
    width: 100%;
    height: 100%;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    margin-left: -1px;
    overflow: auto;
    
    .close{
        position: fixed;
        width: 100%;
        left: 0;
        background-color: #E31843;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #fff;
        @include font-dpr(14px);
    }
    .trust-cnt{
        padding: 1rem 0 1.466667rem 0;
        .title{
            @include font-dpr(14px);
            color: #000;
            font-weight: 600;
            text-align: center;
            padding-top: .4rem;
            letter-spacing:1px;
        }
        .skip{
            margin: 0 0.8rem;
            .lb{
                @include font-dpr(12px);
                color: #333;
                padding: .4rem 0;
            }
            img{
                width: 100%;
                display: flex
            }
            .trust4{
                margin-top: .266667rem;
            }
        }
    }
    .bottom-btn{
        position: fixed;
        width: 5.866667rem;
        height: 1.1rem;
        line-height: 1.1rem;
        border-radius: .213333rem;
        bottom: .266667rem;
        left: 50%;
        margin-left: -2.933333rem;
        background-color: #0F86F9;
        color: #fff;
        @include font-dpr(16px);
        font-weight: 600;
        text-align: center;
        letter-spacing:2px;
    }
}
.mint-popup{
    width: 100%;
    top: 0;
}
</style>