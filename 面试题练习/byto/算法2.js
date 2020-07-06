

// 输入一个字符串 str = 'avaasdc',找出这个字符串中出现最多次的字符和出现的次数
// 返回 {maxStr,maxNum};



function serchMaxStr(str) {
    let flag = {};
    let res = {
        maxStr: '',
        maxNum: 0,
    };
    for (let i = 0; i < str.length; i++) {
        let item = str[i];
        if (flag[item]) {
            flag[item]++;
        } else {
            flag[item] = 1;
        }
        res = res.maxNum > flag[item] ? res : {
            maxStr: item,
            maxNum: flag[item]
        }
    }
    return res;
}
console.log(serchMaxStr('aaaccggabb'));