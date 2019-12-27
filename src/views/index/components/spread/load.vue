<template>
	<div class="spread">
        <div class="load">
            <div class="logo">
                <img src="../../../../common/assets/images/logo.png" alt="">
                <div>{{info.name}}</div>
            </div>
            <div>
                <button class="load-btn" @click="load">下载APP</button>
            </div>
            
        </div>
	</div>
</template>

<script>
    import {Toast,MessageBox} from 'mint-ui';
    
	
	export default {        
		data() {
			return {
                
			}
		},
		created() {
            this.info = this.globalFun.constant.contactAll();
		},
		methods: {
            load(){
                var versions = this.globalFun.browserCheck.versions;
                if(versions.ios){
                    Toast("ios即将上线")
                    //location.href = "http://www.baidu.com";
                }else{
                    location.href = this.info.apkURL;
                }
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";

.load{
    width: 100%;
    height: 100vh;
    text-align: center;
    background: #fff;
    .logo{
        @include font-dpr(18px);
        font-weight: 600;
        color: #999;
        padding: 4rem 0 5rem 0;
        img{
            width: 2.3rem;
            height: 2.3rem;
            margin-bottom: 0.1rem;
        }
    }
    .load-btn{
        border: 0;
        width: 3rem;
        height: 1rem;
        background:linear-gradient(to bottom,#99DC1A,#2AB832);
        box-shadow: 0px 2px 5px #999;
        color: #fff;
        border-radius: 6px;
        @include font-dpr(16px);
    }
}
</style>