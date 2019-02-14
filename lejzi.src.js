function lejzi(tag = 'lejzi', { root = null, rootMargin = '0px', threshold = 1 } = {}) {
  const observer = new IntersectionObserver(
    entries =>
      entries
        .filter(entry => entry.isIntersecting)
        .forEach(({ target }) => {
          observer.unobserve(target)
          const image = new Image()
          image.onload = () => {
            if (target.tagName === 'IMG') target.src = target.dataset.lejzi
            else target.style.backgroundImage = `url(${target.dataset.lejzi})`
            target.removeAttribute(`data-${tag}`)
          }
          image.src = target.dataset.lejzi
        }),
    { root, rootMargin, threshold }
  )

  Array.from(document.querySelectorAll(`[data-${tag}]`)).forEach(element => observer.observe(element))
}
