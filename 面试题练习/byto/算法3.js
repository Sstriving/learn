// 给定一个字符串，请你找出其中不含有重复字符的 最长连续子串 的长度。
// abcdeafghc

let str = 'abcdeafghca'
function searhMaxNoRepaitStr (str) {

    let obj = new Map()
    let max = 0
    let cur = 0 // 无重复子串的开始下标 
    for(let i = 0; i < str.length; i++) {
        if(obj.has(str[i])){
            cur = Math.max(obj.get(str[i])+1,cur)
        }
        max = Math.max(max,i - cur + 1)
        obj.set(str[i],i)
    }
    return max;


}

console.log(searhMaxNoRepaitStr(str))