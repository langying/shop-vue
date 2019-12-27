<template>
	<div class="agreement">
		<mt-header class="myHeader" fixed title="注册协议">
			<mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
		</mt-header>
	<p class="MsoNormal" align="center" style="text-align:center;">
		<b>《{{info.name}}用户注册协议》<span></span></b>
	</p>
	<p class="MsoNormal" align="center" style="text-align:center;">
		<b><br /></b>
	</p>
	<p class="MsoNormal">
		提示条款：{{info.name}}手机软件的各项电子服务的所有权和运作权归{{info.nick}}。{{info.name}}用户协议（以下简称“本协议”）由{{info.name}}用户（以下简称“用户”和“您”）和{{info.nick}}共同缔结。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		【审慎阅读】您在申请注册流程中点击同意本协议之前，请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。在您阅读本协议的过程中，如果不同意本协议或其中任何条款的约定，您应立即停止申请手续。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		一、服务内容
	</p>
	<p class="MsoNormal">
		借贷申请信息发布服务：{{info.name}}根据您的授权将您的贷款需求发送至您选择的网络借贷信息中介机构或贷款机构（以下统称“借款平台或机构”），为您和借款平台或机构“牵线搭桥”，可以为您提供便捷的贷款流程和定制化的借贷申请信息发布服务。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		{{info.name}}可以根据需要对上述服务进行补充或删减。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		二、用户权利
	</p>
	<p class="MsoNormal">
		<span>1</span>、您有权修改您个人账号中各项可修改信息，自行选择昵称，自行决定是否提供非必填项的内容。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>2</span>、您有权根据本协议的规定，向您选择的借款平台或机构进行贷款。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>3</span>、您有权参加{{info.name}}以及贷款机构组织的各项活动，包括但不限于：积分兑换活动、抽取流量活动等，并依据积分兑换规则、流量抽取规则等，获得相应的奖励。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>4</span>、您有权参加{{info.name}}论坛，并发表符合国家法律法规、政策等规范性法律文件的观点。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>5</span>、您有权根据本协议的规定，享受{{info.name}}提供的其他各类服务。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		三、用户义务
	</p>
	<p class="MsoNormal">
		<span>1</span>、您保证并确认：您提供的信息包括但不限于个人信息真实、准确、完整和有效，符合中华人民共和国有关法律法规的规定，不存在侵犯第三人知识产权或肖像权的侵权行为。因信息不真实、不准确、不完整或失效而引起的任何问题及其后果，由您自行承担，且您保证{{info.name}}免受由此而产生的任何损害或责任。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>2</span>、您保证并确认：若通过借款平台或机构的授信，您将严格按照您与借款平台或机构或者出借人的约定按时履行还款义务，如因您的原因给{{info.name}}造成损失的，您将赔偿{{info.name}}由此产生的一切实际损失。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>3</span>、您充分授权{{info.name}}将您相关信息包括但不限于个人信息、借贷需求、账户、购买等数据发送至您选择的借款平台或机构。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>4</span>、您保证不得利用{{info.name}}提供的服务从事任何违法犯罪或可能侵害{{info.name}}合法权益的活动，因您的原因，产生法律争议的，您应向{{info.name}}承担赔偿费用以及为处理该争议产生的合理费用，包括但不限于律师费、诉讼费、差旅费等。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		四、用户隐私制度
	</p>
	<p class="MsoNormal">
		尊重用户个人隐私是{{info.name}}义不容辞的责任，{{info.name}}不会在未经合法用户授权时公开其提交或存储在{{info.name}}的非公开资料，但以下情况除外：
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		根据司法机关、政府部门、行业主管部门或其他管理机关之要求；根据法律法规、规范性文件或相关政策要求；为社会公共目的向相关单位提供个人资料；因用户密码告知他人或与他人共享帐户，由此导致的任何个人资料泄露；由于黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常经营之不可抗力而造成的个人资料泄露、丢失、被盗用或被窜改等；在紧急情况下为维护用户个人和社会公众的安全之目的。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		{{info.name}}仅保证自身履行保密义务，但不保证您选择的借款平台或机构不会泄露您的信息，若您选择的借款平台或机构泄露您的信息，{{info.name}}不承担任何责任。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		五、拒绝提供担保及免责
	</p>
	<p class="MsoNormal">
		{{info.name}}仅限提供技术支持，不提供借贷服务，亦不为借贷行为提供任何形式的担保。对本服务的使用承担风险，{{info.name}}不对您选择的借款平台或机构的信息的真实性、合法性承担任何责任，也不作任何类型的担保，对非{{info.name}}控制的任何网页的内容的真实性、准确性和完整性，{{info.name}}不作任何担保，也不承担任何责任。{{info.name}}不担保服务一定能满足您的要求，也不担保服务不会受中断，对服务的及时性，安全性，出错发生都不作担保。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		六、完整协议
	</p>
	<p class="MsoNormal">
		本协议由《{{info.name}}服务协议》条款与《积分兑换规则》、《返现券<span>---</span>使用说明》《流量抽取规则》、《积分任务规则》、《经纪人规则》等{{info.name}}不时公示的各项规则组成，各项规则有约定，而本协议没有约定的，以各项规则约定为准。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		七、知识产权的保护
	</p>
	<p class="MsoNormal">
		<span>1</span>、{{info.name}}上的所有内容，包括但不限于著作、图片、档案、咨询、资料、资讯、平台架构、平台画面的安排、页面设计，均由{{info.nick}}依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>2</span>、非经{{info.name}}的书面同意，任何人不得擅自使用、修改、反向编译、复制、公开传播、改变、散布、发行或公开发表上述内容及软件。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>3</span>、尊重知识产品是您应尽的义务，如有违反，您应对{{info.name}}各产品方承担损害赔偿等法律责任。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		八、协议的变更
	</p>
	<p class="MsoNormal">
		{{info.name}}有权根据国家法律法规变化以及公司业务发展情况，在必要时修改本协议，本协议一旦发生变动，将会在{{info.name}}上同步提示修改内容。如果您继续享用服务，则视为同意并接受本协议的变动；如果您不同意所改动的内容，您可以停止使用{{info.name}}提供的服务。{{info.name}}保留随时修改或中断服务而不需知会用户的权利。{{info.name}}行使修改或中断服务的权利，不需对用户或第三方负责。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		九、争议管辖与法律适用
	</p>
	<p class="MsoNormal">
		本协议之效力、解释、变更、执行和争议解决均适用中华人民共和国法律。因本协议产生之争议，均应依照中华人民共和国法律予以处理，并由被告所在地人民法院管辖。如果本协议条款与中华人民共和国法律法规相抵触，则发生抵触的条款应按照相关法律规定重新解释，而其他条款仍然有效。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		免责声明
	</p>
	<p class="MsoNormal">
		尊敬的“{{info.name}}”的用户：
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		鉴于：“{{info.name}}”是由{{info.nick}}负责运营的小额借款信息撮合平台（以下简称“本平台”），为有借款需求的个人或小微企业与网络借贷信息中介机构或贷款机构（以下简称“借款平台或机构”）提供信息撮合服务。在您登录成为本平台用户前请务必仔细阅读以下条款。若您选择“登录”平台则视为已知晓并接受本声明中的所有条款；若不接受，请您立即停止登录或主动停止使用本平台的服务。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>1</span>、本平台为您与借款平台或机构提供信息撮合服务，您可根据个人需求选择本平台上的借款平台或机构申请借款，您是否具有借款资质由借款平台或机构根据自身风控要求及规定决定，本平台不承担任何担保责任。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>2</span>、借款平台或机构随时可能由于业务发展等因素对借款人的申请条件或申请材料的种类及数量进行调整，若借款平台或机构未及时申报本平台更新信息，造成本平台与借款平台或机构所公示的信息不同时，以借款平台或机构所示信息为准。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>3</span>、请确保您向借款平台或机构提供的所有信息真实、有效，若您无法完成借款申请提交或不符合借款资质，借款平台或机构可能随时中止或终止您的借款申请，本平台不承担责任。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>4</span>、您在本平台登录成功后，请您妥善保管登录账号；同一手机号码或账号下所进行的所有活动或事件均视为您的行为，所产生的法律后果及责任由您本人承担，前述<span>“</span>行为<span>”</span>包括但不限于：决策失误、操作不当、非本人借款或委托他人借款。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>5</span>、本平台尊重并保护您的个人信息及隐私，除行政、司法、监管等有权机关或机构要求，本平台将不会以任何形式泄露、出售、有偿利用您的个人信息；本平台亦要求合作的借款平台或机构保护您的个人信息，但因第三方平台或机构原因造成个人信息及隐私的不当使用，本平台不承担连带责任。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>6</span>、请您充分了解借款所产生的法律关系及权利义务，审慎选择借款平台或机构。您在借款过程中的任何行为，包括但不限于实名认证、绑定银行卡、芝麻信用分授权、通讯录授权、支付或还款、逾期催收，皆应遵循您与借款平台或机构所订立的协议、合同，由此所产生的任何争议、纠纷、损失、违法处罚等均与本平台无关。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>7</span>、基于本平台运营及安全的需要，本平台可能因为各种原因（包括但不限于平台产品调整或服务升级、系统维护、黑客攻击、网络故障、电力中断、不可抗力事件）暂时停止提供、限制或改变本平台服务的部分功能，或提供新的功能。在任何功能减少、增加或者变化时，若您继续使用本平台的服务，则表示您仍然同意并接受此前或之后所签订的所有文件，包括但不限于：协议、声明、规则等。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		<span>8</span>、本声明未尽事宜或条款调整将会在本平台同步展示修改内容，若您继续使用本平台服务，则视为知晓并接受本声明的变动。本声明的最终解释权归{{info.nick}}所有。
	</p>
	<p class="MsoNormal">
		<span>&nbsp;</span>
	</p>
	<p class="MsoNormal">
		特此声明。
	</p>
	<p class="MsoNormal">
		<br />
	</p>
	<p class="MsoNormal">
		{{info.nick}}
	</p>

	</div>
</template>

<script>
	export default {        
		data() {
			return {
              
			}
		},
		created() {
        	this.info = this.globalFun.constant.contactAll();
        	document.title = this.info.name + "注册协议";
        },
        mounted(){
            
           
        },
		methods: {
           
        }
	}
</script>

<style lang="scss"  scoped="scoped">
@import "../../../../common/styles/mixin.scss";
.agreement{
    @include font-dpr(12px);
    background: #fff;
    padding:.4rem .266667rem;
    
}
</style>



