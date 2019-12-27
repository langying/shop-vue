<template>
	<div class="feedback">
        <mt-header class="myHeader" fixed title="意见反馈">
           <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
		<div class="page-wrap">
            <div class="row row-wrap feedbackList">
                <div class="feedbackItem" :class="item.checked?'active':''"  v-for="(item,index) of list" :key="index" @click="checkItem(item)">
                    <label>{{item.name}}</label>
                </div>
            </div>
            <div class="row">
                <textarea class="remark col" maxlength="200" v-model="params.content" placeholder="问题描述的越详细，我们就越快解决哦"></textarea>
            </div>
            <div class="btn">
                <a class="btn-gradient" @click="submit">提交</a>
            </div>
		</div>
		<div class="hotline">客服热线：{{hotline}}</div>
	</div>
</template>

<script>
	import { addFeedback } from '@api/api_user';
	import {Toast,Indicator} from 'mint-ui';
	
	export default {        
		data() {
			return {
                hotline:"",
                tagList: [],
                list:[{
                    "name":"审核进度"
                },{
                    "name":"流程繁琐"
                },{
                    "name":"产品难选"
                },{
                    "name":"使用体验"
                },{
                    "name":"界面太丑"
                },{
                    "name":"其他"
                }],
                params:{
                    tags: '',
                    content: ''
                }
			}
		},
		created() {
            this.hotline = this.globalFun.constant.contact("phone");
		},
		methods: {
			submit(){
                if(!this.params.content){
                    Toast('请填写反馈内容');
                    return false;
                }
                var arr = [];
                this.list.forEach(item => {
                    if(item.checked){
                        arr.push(item.name)
                    }
                });
                this.params.tags = arr.join(',');
                addFeedback(this.params).then(res=>{
                    if(res.code == 200){
                        Toast('提交成功，我们会尽快处理您的反馈！');
                        history.go(-1);
                    }
                })
            },
            checkItem(item){
                this.$set(item,'checked',!item.checked)
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import './index.less';
</style>