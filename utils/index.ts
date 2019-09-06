// 节流工具类

const throtting = (callback: () => void, delay: number = 200) => {
  let timeoutId: number = 0
  return (function() {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = window.setTimeout(callback, delay)
  })()
}


const debounce = (callback: () => void, delay: number = 200, _isImmediate: boolean = true) => {
  let lastTime:number = 0
  return (function() {
    const nowTime = new Date().getTime()
    const delta = nowTime - lastTime
    lastTime = nowTime
    if (delta < delay) return
    callback()
  })()
}

// 生成全局唯一id
// generate global unique id
const uuid: () => string = () => {
  const S4: () => string = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  const guid: () => string = () => {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }
  const id = 'cms' + guid()
  return id
}

export default {
  throtting,
  debounce,
  uuid
}
