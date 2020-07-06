
/******
 * fs.readdir
 * readdir 方法用于读取目录，返回一个包含文件和目录的数组
 * 
 * fs.stat
 * stat 方法的参数是一个文件或目录，它产生一个对象，
 * 该对象包含了该文件或目录的具体信息。此外，
 * 该对象还有一个 isFile() 方法可以判断正在处理的到底是一个文件，还是一个目录。
 * 
 * 
 *  */ 


var fs = require('fs');
var path = require('path');



// 读指定路径下的文件
let readDir = function (dir) {
    return new Promise((resolve,reject) => {
        fs.readdir(dir,(err,files) => {
            if(err) reject(err)
            resolve(files)
        })
    })
}


// 读指定目录下的文件信息
let stat = function(path) {
    return new Promise((resolve,reject) => {
        fs.stat(path,(err,stat) => {
            if(err) reject(err)
            resolve(stat)
        })
    })
}

// 查找指定目录下的最大文件
const findLargest = function (dir) {
    return readDir(dir).then(files => {
        const promises = files.map(file => stat(path.join(dir,file)))
        return Promise.all(promises).then(stats => {
            return {stats,files}   
        })
    }).then(data => {
        const {stats,files } = data;
        const largest = stats.filter(stat => stat.isFile())
        .reduce((prev,next) => {
            if(prev.size > next.size) return prev
            return next
        })
        return files[stats.indexOf(largest)]
    })
}

findLargest('./').then(res => {
    console.log('内容最大的文件是:',res)
})


