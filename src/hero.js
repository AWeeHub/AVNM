import { gsap } from 'gsap'

export function initHero() {
  // Intentionally NOT using gsap.matchMedia() — tweens created inside mm contexts
  // are reverted when ScrollTrigger.refresh() fires (GSAP 3 bug), which on mobile
  // happens every time the URL bar shows/hides (resize event). Running animations
  // in the global context ensures they persist and are never reverted.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) {
    gsap.set(
      ['.hero__headline .word', '.hero__label', '.hero__subline', '.hero__ctas', '.hero__scroll-indicator'],
      { y: 0, opacity: 1 }
    )
    return
  }

  gsap.set(['.hero__label', '.hero__subline', '.hero__ctas', '.hero__scroll-indicator'], { y: 24 })

  gsap.timeline({ delay: 0.15 })
    .to('.hero__headline .word', {
      y: '0%',
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.12,
    })
    .to('.hero__label',            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
    .to('.hero__subline',          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45')
    .to('.hero__ctas',             { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.35')
    .to('.hero__scroll-indicator', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
}
