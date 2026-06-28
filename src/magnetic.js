import { gsap } from 'gsap'

export function initMagnetic() {
  if (!window.matchMedia('(pointer: fine)').matches) return

  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    const strength = 0.35

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength

      gsap.to(btn, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: 'power2.out',
      })
    })

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      })
    })
  })
}
