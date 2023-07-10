export default (src, attrs, parentNode) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')

    self._initBaiduMap = function () {
      resolve(true)
      self.document.head.removeChild(script)
      self.BMap._preloader = null
      self._initBaiduMap = null
    }

    script.async = true
    script.src = src

    for (const [k, v] of Object.entries(attrs || {})) {
      script.setAttribute(k, v)
    }

    script.onload = () => {
      script.onerror = script.onload = null
    }

    script.onerror = () => {
      script.onerror = script.onload = null
      reject(new Error(`Failed to load ${src}`))
    }

    const node = parentNode || document.head || document.getElementsByTagName('head')[0]
    node.appendChild(script)
  })
}
