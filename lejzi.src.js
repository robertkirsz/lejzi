const isElementInViewport = element => {
  const rect = element.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const onVisibilityChange = (element, callback) => {
  let oldVisible = false

  return () => {
    const visible = isElementInViewport(element)

    if (visible !== oldVisible) {
      oldVisible = visible

      if (typeof callback == 'function') callback()
    }
  }
}

const lejzi = (className = '.lejzi') => {
  if (!className) return

  const elements = [...document.querySelectorAll(className)]

  if (elements.length === 0) return

  elements.forEach(element => {
    const handler = onVisibilityChange(element, () => {
      const image = new Image()

      image.src = element.dataset.src

      image.onload = () => {
        element.style.backgroundImage = 'url(' + element.dataset.src + ')'
        element.classList.remove(className.split('.').pop())

        if (window.removeEventListener) {
          removeEventListener('DOMContentLoaded', handler, false)
          removeEventListener('load', handler, false)
          removeEventListener('scroll', handler, false)
          removeEventListener('resize', handler, false)
        } else if (window.detachEvent) {
          detachEvent('onDOMContentLoaded', handler) // IE9+ :(
          detachEvent('onload', handler)
          detachEvent('onscroll', handler)
          detachEvent('onresize', handler)
        }
      }
    })

    if (window.addEventListener) {
      addEventListener('DOMContentLoaded', handler, false)
      addEventListener('load', handler, false)
      addEventListener('scroll', handler, false)
      addEventListener('resize', handler, false)
    } else if (window.attachEvent) {
      attachEvent('onDOMContentLoaded', handler) // IE9+ :(
      attachEvent('onload', handler)
      attachEvent('onscroll', handler)
      attachEvent('onresize', handler)
    }
  })
}
