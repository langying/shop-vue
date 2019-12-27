<template>
	<div class="spread">
        <div class="load">
            <div class="logo">
                <img src="../../../../common/assets/images/logo.png" alt="">
                <div>{{info.name}}</div>
            </div>
            <div>
                <a :href="url" class="load-btn" >下载APP</a>
            </div>
            
        </div>
	</div>
</template>

<script>
    import {Toast,MessageBox} from 'mint-ui';
    
	
	export default {        
		data() {
			return {
                url: ""
			}
		},
		created() {
            this.info = this.globalFun.constant.contactAll();
            var versions = this.globalFun.browserCheck.versions;
            if(versions.ios){
                this.url = this.info.ipaURL;
            }else{
                this.url = this.info.apkURL;
            }
		},
		methods: {
         
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
        padding: 4rem 0 1.5rem 0;
        img{
            width: 2.0rem;
            height: 2.0rem;
            margin-bottom: 0.3rem;
        }
    }
    .load-btn{
        border: 0;
        width: 3rem;
        height: 1rem;
        line-height: 1rem;
        display: block;
        text-align: center;
        margin: 0 auto;
        background:linear-gradient(to bottom,#99DC1A,#2AB832);
        box-shadow: 0px 2px 5px #999;
        color: #fff;
        border-radius: 6px;
        @include font-dpr(16px);
    }
}
</style>