import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initParallax() {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Hero video parallax
    gsap.to('.hero__video', {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Generic parallax layers with configurable speed via data-speed
    document.querySelectorAll('.parallax-layer').forEach((el) => {
      const speed = parseFloat(el.dataset.speed) || 0.2
      gsap.to(el, {
        y: `${speed * 150}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  })
}
