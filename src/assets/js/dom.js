// 判断Dom上是否有某个class
export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
  }

// 在Dom上添加class
export function addClass(el, className) {
    // 判断是否有某个class
    if( hasClass(el, className)){
        // 如果有返回
        return
    }
    // 把className用空格分开,放进数组,把新的className
    // 添加进数组,然后再用空格连接
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}