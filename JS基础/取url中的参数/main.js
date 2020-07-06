
function getUrlQuery(url){
    let args = url.split("?");
    if(args[0] === url){
        return '';
    }
    let obj = {};
    let arr = args[1].split('&');
    for(let i = 0; i < arr.length; i++){
        let  arg = arr[i].split('=');
 
        obj[arg[0]] = arg[1];
    }
    return obj;
}
console.log(getUrlQuery('http://wiki.youex.io/pages/viewpage.action?pageId=3737193'))
