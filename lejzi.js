"use strict";function lejzi(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:"lejzi",b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{},c=b.root,d=void 0===c?null:c,e=b.rootMargin,f=void 0===e?"0px":e,g=b.threshold,h=void 0===g?1:g,i=new IntersectionObserver(function(b){return b.filter(function(a){return a.isIntersecting}).forEach(function(b){var c=b.target;i.unobserve(c);var d=new Image;d.onload=function(){"IMG"===c.tagName?c.src=c.dataset.lejzi:c.style.backgroundImage="url(".concat(c.dataset.lejzi,")"),c.removeAttribute("data-".concat(a))},d.src=c.dataset.lejzi})},{root:d,rootMargin:f,threshold:h});Array.from(document.querySelectorAll("[data-".concat(a,"]"))).forEach(function(a){return i.observe(a)})}
