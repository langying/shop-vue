<template>
	<div class="help">
        <mt-header class="myHeader" fixed title="帮助中心">
           <mt-button icon="back" slot="left" @click="goBack"></mt-button>
        </mt-header>
		<div class="page-wrap">
            <div class="helpList">
                <div class="helpItem">
                    <div class="title row">
                        <span class="col">一、贷款申请问题</span>
                        <span>客服热线：{{info.phone}}</span>
                    </div>
                    <div class="content">
                        <div class="subItem" @click="checkItem('1-q1')" :class="currIndex == '1-q1'?'open':''">
                            <div class="subTitle row">
                                <label class="q">Q1</label>
                                <label class="col">贷款产品信息</label>
                                <i class="mintui mintui-back"></i> 
                            </div>
                            <div class="subCnt">
                                <div class="block">
                                    <p>如果您在申请贷款产品中遇到问题，您可查看贷款攻略，请点击-攻略大全</p>
                                    <p>如果您对贷款流程有疑问，请查看详情操作，请点击-操作流程图</p>
                                </div>
                            </div>
                        </div>

                        <div class="subItem" @click="checkItem('1-q2')" :class="currIndex == '1-q2'?'open':''">
                            <div class="subTitle row">
                                <label class="q">Q2</label>
                                <label class="col">运营商认证</label>
                                <i class="mintui mintui-back"></i> 
                            </div>
                            <div class="subCnt">
                                <div class="block">
                                    <p>1.如果提示姓名不符，请您联系您申请使用的手机号运营商进行手机号实名认证，且实名认证姓名要和申请贷款时在基本信息里填写的姓名一致。</p>
                                    <p>2.如果你忘记服务密码，请拨打手机运营商客服电话找回密码。</p>
                                    <p>运营商联系方式：抵用10086，联调10010，电信10000</p>
                                    <p>或登录运营商官网/运营商当地营业厅进行修改</p>
                                    <p>3.如果您无法提供运营商服务密码，您可申请融360、好贷等产品。</p>
                                </div>
                            </div>
                        </div>

                        <div class="subItem" @click="checkItem('1-q3')" :class="currIndex == '1-q3'?'open':''">
                            <div class="subTitle row">
                                <label class="q">Q3</label>
                                <label class="col">芝麻信用认证</label>
                                <i class="mintui mintui-back"></i> 
                            </div>
                            <div class="subCnt">
                                <div class="block">
                                    <p>芝麻信用认证要求您绑定本人的支付宝账号，授权芝麻信用分。</p>
                                    <p>1.如果提示支付宝账号不存在，请确认支付宝姓名和基本信息中填写的一致，身份证号码为您本人身份证号码，然后重试。</p>
                                    <p>2.如果提示密码错误，请注意填写支付宝登录密码而非支付密码，若您忘记密码，请联系支付宝客服找回。</p>
                                    <p>3.如果提示资质不符，则是您的芝麻信用认证资料不符合产品要求，请尝试申请不需要芝麻信用的产品，列如现金借款，平安普惠。</p>
                                </div>
                            </div>
                        </div>

                        <div class="subItem" @click="checkItem('1-q4')" :class="currIndex == '1-q4'?'open':''">
                            <div class="subTitle row">
                                <label class="q">Q4</label>
                                <label class="col">邮箱认证</label>
                                <i class="mintui mintui-back"></i> 
                            </div>
                            <div class="subCnt">
                                <div class="block">
                                    <p>1.如果您没有邮箱，建议您可使用qq邮箱尝试（例如1314888@qq.com），或者尝试申请其他不需要填写邮箱的产品，列如现金借款，简单贷。</p>
                                    <p>2.如果授权失败，有可能是您的邮箱处于停用状态，或者是由于您邮箱内无信用卡账单，或者信用卡账单非本人，请转换用接收本人信用卡账单的邮箱，并清理邮箱内的垃圾邮件。</p>
                                </div>
                            </div>
                        </div>

                        <div class="subItem" @click="checkItem('1-q5')" :class="currIndex == '1-q5'?'open':''">
                            <div class="subTitle row">
                                <label class="q">Q5</label>
                                <label class="col">填写联系人</label>
                                <i class="mintui mintui-back"></i> 
                            </div>
                            <div class="subCnt">
                                <div class="block">
                                    <p>1.如果无法识别联系人，建议您填写近三个月内常联系且信用良好的亲友。</p>
                                    <p>2.如果联系人页面空白，不全，一直在加载，无法添加，请您在“设置”或手机管理软件内授权，然后重试。</p>
                                    <p>2.如果您填写的联系人较随意，手机号不真实，系统将无法识别，请认真填写。</p>
                                </div>
                            </div>
                        </div>

                        <div class="subItem" @click="checkItem('1-q6')" :class="currIndex == '1-q6'?'open':''">
                            <div class="subTitle row">
                                <label class="q">Q6</label>
                                <label class="col">绑定银行卡</label>
                                <i class="mintui mintui-back"></i> 
                            </div>
                            <div class="subCnt">
                                <div class="block">
                                    <p>【绑定要求】您填写的姓名、身份证号、手机号码和您所填写银行卡号都属于您本人才可以成功，请联系银行开户行确认这些信息后，重试。</p>
                                    <p>【银行卡不支持】由于您目前绑定的银行卡是贷款机构不支持的银行，建议您使用常见的银行卡进行绑定（列如：中国银行、工商银行、建设银行、农业银行等等）。</p>
                                    <p>【绑卡失败】如果您不记得银行预留手机号，建议您去银行及时更新手机号。</p>
                                </div>
                            </div>
                        </div>

                        <div class="subItem" @click="checkItem('1-q7')" :class="currIndex == '1-q7'?'open':''">
                            <div class="subTitle row">
                                <label class="q">Q7</label>
                                <label class="col">验证码收不到</label>
                                <i class="mintui mintui-back"></i> 
                            </div>
                            <div class="subCnt">
                                <div class="block">
                                    <p>如果您是2分钟内没有收到验证码，请您输入产品名称，借小妹尽快帮您处理，或者您可申请其他产品试试哦~</p>
                                </div>
                            </div>
                        </div>

                        <div class="subItem" @click="checkItem('1-q8')" :class="currIndex == '1-q8'?'open':''">
                            <div class="subTitle row">
                                <label class="q">Q8</label>
                                <label class="col">邀请码</label>
                                <i class="mintui mintui-back"></i> 
                            </div>
                            <div class="subCnt">
                                <div class="block">
                                    <p>邀请码是选填的，没有则无须填（请留意填写密码的额位数、大小写字母的要求）。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="helpItem">
                    <div class="title row">
                        <span class="col">二、贷款审核问题</span>
                    </div>
                    <div class="content">
                        <div class="subItem" @click="checkItem('2-q1')" :class="currIndex == '2-q1'?'open':''">
                            <div class="subTitle row">
                                <label class="q">Q1</label>
                                <label class="col">咨询审核进度</label>
                                <i class="mintui mintui-back"></i> 
                            </div>
                            <div class="subCnt">
                                <div class="block">
                                    <p>1.请在"我的申请",点击已申请的产品，登录后即可查询产品申请状态。</p>
                                    <p>2.正常情况下，小额极速产品最快2小时可出审批结果，大额产品最快当天可查看审批结果。</p>
                                </div>
                            </div>
                        </div>

                        <div class="subItem" @click="checkItem('2-q2')" :class="currIndex == '2-q2'?'open':''">
                            <div class="subTitle row">
                                <label class="q">Q2</label>
                                <label class="col">咨询审批不通过原因</label>
                                <i class="mintui mintui-back"></i> 
                            </div>
                            <div class="subCnt">
                                <div class="block">
                                    <p>您的审核结果是由系统综合您的资质评定的，未通过是因为您的资质未满足产品需求，不同产品审核条件是不一样的，您可申请多款产品以满足您资金的需求。</p>
                                </div>
                            </div>
                        </div>

                        <div class="subItem" @click="checkItem('2-q3')" :class="currIndex == '2-q3'?'open':''">
                            <div class="subTitle row">
                                <label class="q">Q3</label>
                                <label class="col">审核通过，等待放款中</label>
                                <i class="mintui mintui-back"></i> 
                            </div>
                            <div class="subCnt">
                                <div class="block">
                                    <p>1.如您已提现，等待放款，通常情况下当天可到账，具体转账时间以银行为准（如遇节假日转账可能出现延迟情况）。</p>
                                    <p>2.如遇银行卡绑定不成功，请查看攻略详情或拨打相关产品的客服电话进行咨询</p>
                                    <p>3.如果提示资质不符，则是您的芝麻信用认证资料不符合产品要求，请尝试申请不需要芝麻信用的产品，列如现金借款，平安普惠。</p>
                                </div>
                            </div>
                        </div>

                        <div class="subItem" @click="checkItem('2-q4')" :class="currIndex == '2-q4'?'open':''">
                            <div class="subTitle row">
                                <label class="q">Q4</label>
                                <label class="col">已放款，正在还款/结清/逾期</label>
                                <i class="mintui mintui-back"></i> 
                            </div>
                            <div class="subCnt">
                                <div class="block">
                                    <p>1.【无法还款】如已进行还款操作，系统未显示，有可能是系统显示延误，可在24小时之后再进行查看，如果疑问可拨打相关产品客服咨询</p>
                                    <p>2.【提前还款】部分贷款机构是不支持提前还款的，您可查看贷款攻略或拨打相关客服电话进行咨询。</p>
                                    <p>3.【逾期还款】部分贷款机构是需要收取相关费用的，您可查看贷款攻略或者拨打相关客服电话进行咨询。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
		
	</div>
</template>

<script>
	import { queryLoanList } from '@api/api_loan';
	import {Toast,Indicator} from 'mint-ui';
	
	export default {        
		data() {
			return {
                currIndex: '',
                info: {},
                token: null
			}
		},
		created() {
            this.info = this.globalFun.constant.contactAll();
            this.token = this.$route.query.token;
            if(this.token){
                localStorage.setItem("token",this.token)
            }
        },
		methods: {
			checkItem(index){
                if(this.currIndex == index){
                    this.currIndex = '';
                    return false;
                }
                this.currIndex = index;
            },
            goBack(){
                if(this.token){
                    try{
                        window.android.onPlayBack();
                    }catch(e){

                    }
                }else{
                    this.$router.go(-1);
                }
            }
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
@import './index.less';
</style>