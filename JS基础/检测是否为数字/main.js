function isNumber1(obj){
    
    return typeof obj === 'number' && !isNaN(obj);
}
function isNumber2(obj){
    let patt = /^[0-9]+.?[0-9]*$/;
    if(patt.test(obj)){
        return true
    }
    return false;
}
let flag = isNumber1(23.33);
console.log(flag);