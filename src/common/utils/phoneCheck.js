function phoneCheck(val){
    var check = /^[1][3-8]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/;
    if(!check.test(val)){
        return false
    }else{
        return true
    }
}
export default phoneCheck;