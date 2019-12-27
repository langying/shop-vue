import axios from "axios"
import qs from "qs"
import utils from '@common/utils'
import { Toast,Indicator } from 'mint-ui'


// 根据域名判断请求的接口
// const baseUrl = location.href.includes('localhost')? '': 'http://120.77.148.55:8080';
const baseUrl = utils.constant.contact('apiURL');

// 允许带上cookie
axios.defaults.withCredentials = true;

const instance = axios.create({
    timeout: 1000,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    withCredentials:true
});


// 添加响应拦截器
axios.interceptors.response.use((res) => {
    // 拦截回传的数据，判断是否合法
    var code = res.data.code;
    if(code != 200){
        if(code == 304){
            Toast('登录失效，请重新登录');
            location.href = "/#/login";
            
            return false;
        }
        // else{
        //     Toast(returnErrorStr(code));
        //     return {
        //         success: false,
        //         data: res.data.data
        //     };
        // }
        
    }
    return res.data;
}, (error) => {
    if (error.response) {
        Toast('系统繁忙');
        Indicator.close();
        return {
            success: false
        };
    } else {
        Toast('网络不稳定，请稍后再试！');
        Indicator.close();
        return {
            success: false
        };
    }
    
    // 对响应错误做处理
    return Promise.reject(error);
});
function compareDate(target){
    var curr = new Date();
    var curr_month = curr.getMonth();
    var curr_date = curr.getDate();

    var target_month = target.getMonth();
    var target_date = target.getDate();
    if(curr_month != target_month || curr_date!=target_date){
        return true;
    }
    return false;

}
// data的数据格式如：
// data = {method:"",params:{}}   method：string 请求的方式  params:Obj  请求的数据参数
function http(data = {url: '', method: '', params: {}}, withQs = true ) {
    var token = null;
    // var d = localStorage.getItem("token-data");
    // if (compareDate(new Date(Number(d)))){
    //     localStorage.clear();
    //     // 
    // }
    token = localStorage.getItem("token");
    if(token){
        data.params.token = token;
    }
    var udid = localStorage.getItem("udid");
    if (!udid) {
        udid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        localStorage.setItem("udid", udid);
    } 
    data.params.udid = udid;
    if (data.method === "post") {
        const fParams = withQs? qs.stringify(data.params):data.params;
        return axios.post(baseUrl + data.url + `?t=${Math.random()}`, fParams);
        // get
    } else if (data.method === "get") {
        return axios.get(baseUrl + data.url + `?t=${Math.random()}`, {
            params: data.params
        })
    }
}
function returnErrorStr(errCode){
    switch(errCode) {
        case 101:
        return '帐号或者密码有误！';

        default:
        break;
    }
}
export default http;