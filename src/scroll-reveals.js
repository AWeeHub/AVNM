import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initScrollReveals() {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Batch all .reveal-item elements for staggered reveal
    ScrollTrigger.batch('.reveal-item', {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
        })
      },
      start: 'top 88%',
      once: true,
    })

    // Gallery items scale-reveal with stagger
    ScrollTrigger.batch('.gallery__item', {
      onEnter: (batch) => {
        gsap.from(batch, {
          scale: 0.94,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        })
      },
      start: 'top 85%',
      once: true,
    })
  })

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('.reveal-item', { opacity: 1, y: 0 })
  })
}
