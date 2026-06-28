import { gsap } from 'gsap'

export function initHero() {
  const mm = gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // Set starting y for elements that CSS only sets to opacity:0
    gsap.set(['.hero__label', '.hero__subline', '.hero__ctas', '.hero__scroll-indicator'], {
      y: 24,
    })

    const tl = gsap.timeline({ delay: 0.15 })

    // Mask-reveal: each .word rises from below its clip (.word-wrap overflow:hidden)
    tl.to('.hero__headline .word', {
      y: '0%',
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.12,
    })
    .to('.hero__label',             { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
    .to('.hero__subline',           { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45')
    .to('.hero__ctas',              { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.35')
    .to('.hero__scroll-indicator',  { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
  })

  mm.add('(prefers-reduced-motion: reduce)', () => {
    gsap.set(
      ['.hero__headline .word', '.hero__label', '.hero__subline', '.hero__ctas', '.hero__scroll-indicator'],
      { y: 0, opacity: 1 }
    )
  })
}
