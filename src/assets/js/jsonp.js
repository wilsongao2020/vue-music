import orientation from 'jsonp'
import { reject } from 'q';

export default function jsonp(url,data,option) {
    // 如果url里面包含 ? 则把?拼接到url
    // 在拼接上param函数过来的数据
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    // 返回Promise对象
    return new Promise((resolve, reject)=>{
        // 使用jsonp插件远程获取数据
        orientation(url,option, (err, data) => {
            // 没有错误返回数据
            if(!err) {
                resolve(data)
            } else {
                // 有错误返回错误
                reject(err)
            }
        })
    })
}
// 对URL进行拼接
export function param(data) {
    let url = ''
    for(var k in data ) {
        // 如果data[k]不是undefined就会返回data[k]
        // 如果是undefined就返回空
        let value = data[k] !== undefined ? data[k] : ''
        // encodeURIComponent方法对url进行编码
        // 返回的是url的一个副本
        // 该方法不会对ASCII字母和数字进行编码
        // 也不会对ASCII的标点符号进行编码
        //  - _ . ! ~ * ' ( ) 。
        // 其他字符（比如 ：;/?:@&=+$,# 这些用于分隔 
        // URI 组件的标点符号），都是由一个或多个十六
        // 进制的转义序列替换的
        url += '&' + k + '=' + encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''
}

