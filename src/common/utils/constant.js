var constant = {}
const BORROWUNIT = {
	"1" : "日",
	"2" : "月",
	"3" : "年"
}
const CONTACT = {
	"name"   : "分期借呗",
	"nick"   : "本平台",
	"icp"    : "粤ICP备19019936号",
	"company": "广州浪花网络科技有限公司",
	"version": "1.0.0",
	"copyright" : "Copyright @2019 分期借呗 All Rights Reserved",
	"qq"     : "2047719295",
	"phone"  : "2047719295",
	"email"  : "2047719295@qq.com",
	"weixin" : "分期借呗",
	"umeng"  : "1277478025",
	"website": "https://h5.qicaiqianbao.vip",
	"apiURL" : "https://h5.qicaiqianbao.vip",
	"appURL" : "https://7w2.cn/fqjb",
	"apkURL" : "https://uukd.oss-cn-shanghai.aliyuncs.com/qicaiqianbao.apk",
	"ipaURL" : "itms-services://?action=download-manifest&url=https://uukd.oss-cn-shanghai.aliyuncs.com/qicaiqianbao.plist",
	"title"  : "极速下款，轻松易借",
	"title1" : "广州浪花网络科技有限公司保证严格遵守金融相关法律法规，合法合规经营，提供的借贷及借贷撮合业务未违反国家利率规定、未包含国家禁止金融产品或服务等。并通过合理有效的信息安全技术和管理流程，合法收集和使用用户个人信息，防止泄露、损毁、丢失。",
	"title2" : "合作放款机构：重庆市分众小额贷款有限公司"
}
constant.borrowUnit = function(val) {
	return BORROWUNIT[val] || '';
}
// 联系方式
constant.contact = function(name) {
	return CONTACT[name] || '';
}
constant.contactAll = function() {
	return CONTACT;
}
module.exports = constant;