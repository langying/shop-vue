function numAbbreviate(num,flag) {
    
    if(num>=flag){
        return Number(num/flag).toFixed(1) + "万";
    }
    return num;
}
export default numAbbreviate;