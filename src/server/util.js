import PY from '../server/pinyin'
const util = {
  API_BASE_URL: 'http://192.168.1.198:8080/x6', // 请求基路径
  
  compileStr (code) {
    var c = String.fromCharCode(code.charCodeAt(0) + code.length)
    for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i-1))
    }     
    return escape(c)
  },

  uncompileStr (code) {
    code = unescape(code)  
    var c = String.fromCharCode(code.charCodeAt(0) - code.length)
    for(var i = 1; i < code.length; i++){  
        c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i-1))     
    }        
    return c
  },

  /**
   *
   * 保存所有缓存数据
   * @param {*} caches
   */
  saveAllCache (caches) {
    for (let key in caches) {
      let s_key = this.compileStr(key)
      sessionStorage.setItem(s_key, this.compileStr(JSON.stringify(caches[key])))
    }
  },

  /**
   * 获取缓存
   *
   * @param {*} name
   * @param {string} [lx='']
   * @returns 缓存数据
   */
  getCache (name, lx = '') {
    let key = this.compileStr(name)
    let res = sessionStorage.getItem(key)
    if (!!res) {
      res = JSON.parse(this.uncompileStr(res))
      if (lx !== '') {
        res = res.filter(item => item.lx === lx)
      }
      return res
    } else {
      return undefined
    }
  },

  /**
   *
   * 添加缓存
   * @param {*} name
   * @param {*} val
   */
  addCache (name, data) {
    let val
    if (typeof val === 'object') {
      val = JSON.stringify(data)
    }
    sessionStorage.setItem(this.compileStr(name), this.compileStr(val))
  },
  /**
   *
   *  格式化
   * @param {*} lx currency-金额
   * @param {*} val 值
   */
  format (lx, val) {
    if (!lx) {
      return val
    } else {
      switch (lx) {
        case 'currency':
          val = parseFloat(val)
          return isNaN(val) ? NaN : `￥${val.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.|$))/g, '$&,')}`
        case 'date':
          return `${val[0]}-${val[1] < 10 ? '0' + val[1] : val[1]}-${val[2] < 10 ? '0' + val[2] : val[2]}`
        default:
          return val
      }
    }
  },

  /**
   *
   *  节流函数
   * @param {*} fn
   * @param {*} delay ms
   */
  throttle (fn, delay = 200) {
    let timeout = null
    return function () {
      let context = this
      let args = arguments
      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(_ => {
        fn.call(context, ...args)
        timeout = null
      }, delay)
    }
  },

  /**
   *
   * 标记目标字符串中的关键词
   * @param {*} target 目标字符串
   * @param {*} query 关键词
   * @returns 返回
   */
  splitKeyWordsForQuery (target, query) {
    if (!query) {
      return [{
        isred: false,
        txt: target
      }]
    }
    let str1
    let str2
    if (/.*[\u4e00-\u9fa5]+.*$/.test(query)) {
      str1 = target
      str2 = query
    } else {
      str1 = PY.GetPY(target).toLowerCase()
      str2 = PY.GetPY(query).toLowerCase()
    }
    let temp = []
    if (str1.includes(str2)) {
      let point = str1.indexOf(str2)
      if (target.substring(0, point)) {
        temp.push({
          isred: false,
          txt: target.substring(0, point)
        })
      }
      temp.push({
        isred: true,
        txt: target.substring(point, point + query.length)
      })
      if (target.substring(point + query.length)) {
        temp.push({
          isred: false,
          txt: target.substring(point + query.length)
        })
      }
      return temp
    } else {
      str2 = str2.split('')
      let startIndex = 0
      let endIndex = 0
      for (let c of str2) {
        let point = str1.indexOf(c)
        temp.push({
          isred: false,
          txt: target.substring(startIndex + endIndex, point + endIndex)
        })
        temp.push({
          isred: true,
          txt: target.substring(point + endIndex, point + 1 + endIndex)
        })
        str1 = str1.substring(point + 1)
        endIndex = point + 1 + endIndex
        startIndex = 0
      }
      temp.push({
        isred: false,
        txt: target.substring(endIndex)
      })
      return temp
    }
  },

  /**
   *
   *  检查是否存在目标是否包含字符串，非连续匹配
   * @param {*} target
   * @param {*} val
   */
  checkIsIncludes (target, val) {
    if (typeof target !== 'string' || target === '' || typeof val !== 'string' || val === '') {
      return false
    }
    let temp
    let str1
    let str2
    if (/.*[\u4e00-\u9fa5]+.*$/.test(val)) {
      str1 = target
      str2 = val
    } else {
      str1 = PY.GetPY(target) && PY.GetPY(target).toLowerCase()
      str2 = PY.GetPY(val) && PY.GetPY(val).toLowerCase()
    }
    temp = str2.split('')
    for (let c of temp) {
      if (str1.indexOf(c) > -1) {
        str1 = str1.substring(str1.indexOf(c) + 1)
        continue
      } else {
        return false
      }
    }
    return true
  },

  /**
   *
   * 获取缓存的树形数据
   * @param {*} cache_name
   * @param {number} [fw=0]
   * @returns
   */
  getCacheTreeData (cache_name, isOpen = true, fw = 0,) {
    if (!cache_name) {
      return undefined
    }
    let datas = this.getCache(cache_name)
    if (datas) {
      // 取出所有根节点
      let rootNode = datas.filter(item => item.cj == 1)
      let recursionNode = function (array) {
        for (let node of array) {
          for (let item of datas) {
            node.label = node.name
            node.value = node.id
            node.open = isOpen
            node.checked = false
            if (item.pbm == node.bm) {
              if (!node.children) {
                node.children = []
              }
              node.children.push(item)
            }
          }
          if (node.children) {
            recursionNode(node.children)
          }
        }
      }
      recursionNode(rootNode)
      return rootNode
    } else {
      return null
    }
  },
}

export {
  util
}
