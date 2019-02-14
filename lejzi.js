function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance')
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === '[object Arguments]')
    return Array.from(iter)
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  }
}

var isElementInViewport = function isElementInViewport(element) {
  var rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

var onVisibilityChange = function onVisibilityChange(element, callback) {
  var oldVisible = false
  return function() {
    var visible = isElementInViewport(element)

    if (visible !== oldVisible) {
      oldVisible = visible
      if (typeof callback == 'function') callback()
    }
  }
}

var lejzi = function lejzi() {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.lejzi'
  if (!className) return

  var elements = _toConsumableArray(document.querySelectorAll(className))

  if (elements.length === 0) return
  elements.forEach(function(element) {
    var handler = onVisibilityChange(element, function() {
      var image = new Image()
      image.src = element.dataset.src

      image.onload = function() {
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
