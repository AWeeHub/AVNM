// Intercept in-page anchor links so Lenis handles scrolling instead of native jump
export function initAnchorNav(lenis) {
  if (!lenis) return

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href')
      if (!id || id === '#') return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -80, duration: 1.4 })
    })
  })
}
