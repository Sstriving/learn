

let url = 'https://api.douban.com/v2/book/1220562'
// window.fetch(url,{
//     method:'get'
// }).then((res) => {
//     console.log(res);
//     return res.json();
// }).then((res) => {
//   console.log(res);  
// });
let d = null;

let script = document.createElement('script');
script.src  = url+'?callback=handleResponse';
document.body.appendChild(script,document.body.firstChild);

var timer = setInterval(() => {
    if (d) {
        console.log('pending')
        clearInterval(timer);
        this.data = d; // 将获取的数据赋值给数据model中
        console.log(this.data);
    }
}, 500);

function handleResponse (res) {
    d = res;
}



