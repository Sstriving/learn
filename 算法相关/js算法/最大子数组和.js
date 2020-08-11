/**
 *  求一个数组的最大子数组和
 *  const arr = [1,2,-3,-4,10]
 * 
 */

 function maxSubArr(arr) {
    let max = arr[0]
    let sum = 0

    for(let i = 0; i < arr.length; i++) {
        sum += arr[i]
        max = Math.max(max,sum)
        if(sum < 0) {
            sum = 0
        }
    }
    return max;
 }

 // 动态规划

 function maxSubArr(arr) {
    // dp[i] 定义为数组arr 中已arr[i] 结尾的最大连续子串和
    let dp = [arr[0]]
    max = dp[0]
    for(let i = 1; i < arr.length; i++) {
        // 如果之前数组的最大值小于 0 ，则代表需要舍弃，从当前位开始再计算
        dp[i] = Math.max(dp[i-1]+arr[i],arr[i])
        if(max < dp[i]){
            max = dp[i]
        }
    }
    console.log(dp)
    return max
    // dp为所有子数组的最大和,找到最大的子数组和
 }
 const arr = [1,2,3,12,-1,10,-20]
 console.log(maxSubArr(arr))