<template>
	<div class="tabs">
		<div class="index">
			
			<div class="page-wrap">
				<keep-alive>
					<router-view ></router-view>
				</keep-alive>
			</div>
			<div class="my-tabs">
				<div class="row">
					<div class="col my-tab-item" :class="currTab==index?'active':''" v-for="(item,index) of tabList" :key="index" @click="checkTab(index)">
						<img slot="icon" :src="currTab==index?item.icon1:item.icon2">
						<div class="lb">{{item.title}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
        name: 'page-tabbar',
		data() {
			return {
				tabList:[{
					title: "首页",
					path: "/tabs/home",
					icon1: require("../../../common/assets/images/tabs/home2.png"),
					icon2: require("../../../common/assets/images/tabs/home1.png")
				},{
					title: "全部贷款",
					path: "/tabs/loan",
					icon1: require("../../../common/assets/images/tabs/loan2.png"),
					icon2: require("../../../common/assets/images/tabs/loan1.png")
				},{
					title: "能借到",
					path: "/tabs/canborrow?recommendFlag=2&name=能借到",
					icon1: require("../../../common/assets/images/tabs/card2.png"),
					icon2: require("../../../common/assets/images/tabs/card1.png")
				},{
					title: "我的",
					path: "/tabs/my",
					icon1: require("../../../common/assets/images/tabs/user2.png"),
					icon2: require("../../../common/assets/images/tabs/user1.png")
				}],
                currTab:-1
			}
		},
		created() {
			this.getCurrTab()

		},
		watch:{
			$route(to,from){
				this.getCurrTab()
			}
		},
		methods: {
			getCurrTab(path){
                for(var index in this.tabList){
                    let item = this.tabList[index];
                    if(item.path === this.$route.path){
                        this.currTab = Number(index);
                        break;
                    }
                }
			},
			checkTab(index){
				this.currTab = index;
				if(index == 3 && !localStorage.getItem("token")){
					this.$router.push({path: "/login"})
					return false;
				}
				this.$router.push({path: this.tabList[index].path})
			}
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../common/styles/mixin.scss";
	// #ap   

	.index{
        overflow: hidden;
        // height: 100vh;
    }
    
    .page-wrap {
        padding-bottom:55px;
    }

	.my-tabs{
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		max-width: 750px;
		margin: 0 auto;
		.row{
			width: 100%;
			background: #F7F7F7;
			border-top:1px solid #eee;
			.my-tab-item{
				text-align: center;
				padding: 0.1735rem 0;
				.lb{
					@include font-dpr(10px);
				}	
				img{
					width: 0.64rem;
					height: 0.64rem;
				}
				&:nth-child(3){
					img{
						width: 0.56rem;
					}
				}
				&.active{
					.lb{
						color: #44B5ED;
					}
				}
			}
		}
	}
</style>

