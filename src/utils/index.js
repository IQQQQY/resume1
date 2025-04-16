// 防抖函数
export function fd (fn, t) {
  let timer = null
  return function (...args) {
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn.apply(context, args), t)
  }
}
// 节流函数
export function jl (fn, t) {
  let timer = null
  return function (...args) {
    const context = this
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, t)
    }
  }
}
