<template>
	<div class="guide">
        <mt-header class="myHeader" fixed title="分类引导">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
        </mt-header>
        <div class="guide-list">
            <div class="guide-item row" :class="`item`+(index%4)" v-for="(item,index) of list" :key="index" @click="checkItem(item)">
                <div class="left">
                    <div class="img"><img :src="item.imgUrl"/></div>
                    <div class="name">{{item.name}}</div>
                </div>
                <div class="col right">
                    <div class="name">{{item.amountScope}}</div>
                    <div class="lb" v-for="(item1,index1) of item.describe.split('&')" :key="index1"><label>▲</label>{{item1}}</div>
                </div>
            </div>

        </div>
	</div>
</template>

<script>
	import { queryColumnList } from '@api/api_loan';
	import {Toast,Indicator} from 'mint-ui';
	
	export default {        
		data() {
			return {
                list:[]
            }
		},
		mounted() {
			this.getList();
		},
		methods: {
			getList(){
                Indicator.open();
                queryColumnList({
                    type: 1
                }).then(res=>{
                    if(res.code == 200){
                        this.list = res.data || [];
                    }
                    Indicator.close();
                })
            },
            checkItem(item){
                this.$router.push({
                    path:"/loanList?columnId="+item.id+"&name="+item.name,
				})
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
.guide{
    padding: 40px 0 0 0;
    .guide-list{
        padding:0.4rem 0.3rem;
        .guide-item{
            color: #fff;
            -moz-box-shadow:2px 2px 5px #999; -webkit-box-shadow:2px 2px 5px #999; box-shadow:2px 2px 5px #999;
            padding: 0.4rem 0.5rem 0.3rem 0.5rem;
            margin-bottom: 0.3rem;
            border-radius: 20px;
            .left{
                text-align: center;
                margin-right: 0.5rem;
                img{
                    width: auto;
                    height: 1rem;
                    margin: 0.2rem 0;
                }
                .name{
                    @include font-dpr(16px);
                }
            }
            .right{
                .name{
                    @include font-dpr(16px);
                    margin-bottom: 0.45rem;
                }
                .lb{
                    line-height: 0.56rem;
                    @include font-dpr(14px);
                    display: flex;
                    align-items: center;
                    label{
                        @include font-dpr(10px);
                        transform:rotate(90deg);
                        display: inline-block;
                        margin-right: 0.1rem;
                    }
                }
            }
            
        }
        .item0{
            background: #3D99FF;
            border-bottom: 5px solid #3182DD;
        }
        .item1{
            background: #FD5064;
            border-bottom: 5px solid #E23B4D;
        }
        .item2{
            background: #4FC82F;
            border-bottom: 5px solid #37A51C;
        }
        .item3{
            background: #B47BD9;
            border-bottom: 5px solid #A26AC3;
        }
    }
}

</style>