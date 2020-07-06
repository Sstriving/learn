/*******
 * 数据结构 bitmap
 * 
 * 
 * 
 */

//  时间复杂度都是O（n） 普通实现
 function FindClass () {
    let data = []; 

    // 添加一个数
    this.addMember = member => {
      data.push(member);
    }
    //判断是否存在
    this.isExist = menubar => {
      return data.includes(menubar);
    }
 }

 // 时间复杂度是 O(1) 空间复杂度提升到100
 function FindClass1 () {
    let datas = new Array(100); 
    for(let i = 0; i < datas.length; i++) {
      datas[i] = 0;
    }
    this.addMember = menubar => {
      datas[menubar] = 1;
    }
    this.isExist = menubar => {
      return datas[menubar];
    }
 }
let a = new FindClass1();
a.addMember(1)
a.addMember(2)
a.addMember(3)
a.addMember(4)
console.log(a.isExist(1))
console.log(a.isExist(5));

