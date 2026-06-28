import { gsap } from 'gsap'

export function initCursor() {
  // Mirror the CSS: only show custom cursor for fine-pointer (mouse) users
  if (!window.matchMedia('(pointer: fine)').matches) return

  const cursorEl = document.querySelector('.cursor')
  if (!cursorEl) return

  // quickTo for smooth lag behind the real pointer
  const xTo = gsap.quickTo(cursorEl, 'x', { duration: 0.28, ease: 'power2.out' })
  const yTo = gsap.quickTo(cursorEl, 'y', { duration: 0.28, ease: 'power2.out' })

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX)
    yTo(e.clientY)
  })

  // Expand on interactive elements
  const hoverEls = document.querySelectorAll('a, button, [data-magnetic], .gallery__item')
  hoverEls.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor--expanded'))
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor--expanded'))
  })
}
