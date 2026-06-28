import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initParallaxProduct() {
  const section = document.querySelector('.pscene-section')
  if (!section) return

  const mm = gsap.matchMedia()

  mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
    const stage = section.querySelector('.pscene__product-stage')
    if (!stage) return

    // Vertically center the stage
    gsap.set(stage, { yPercent: -50 })
    // Horizontally center pill 1 above cup
    gsap.set('.pscene__pill--1', { xPercent: -50 })
    // Vertically center pills 2 and 3 beside cup
    gsap.set(['.pscene__pill--2', '.pscene__pill--3'], { yPercent: -50 })
    // Vertically center caption beside cup
    gsap.set('.pscene__caption', { yPercent: -50 })

    // Offset to slide stage from right to viewport center
    const stageRect = stage.getBoundingClientRect()
    const stageCenterX = stageRect.left + stageRect.width / 2
    const centerX = window.innerWidth / 2 - stageCenterX  // negative = move left

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 2.2,           // smoother, more lag
        start: 'top top',
        end: '+=3800',        // more scroll distance = slower overall feel
        anticipatePin: 1,
      },
    })

    tl
      // ── Hero overlay fades first — cup stays on right ──
      .to('.pscene__hero-overlay', { opacity: 0, y: -30, ease: 'power2.in', duration: 0.22 }, 0)

      // ── Background layers — parallax throughout ──
      .to('.pscene__bg', { y: -70, ease: 'none' }, 0)
      .to('.pscene__mid', { y: -150, ease: 'none' }, 0)
      .to('.pscene__steam', { y: -200, opacity: 0, ease: 'none' }, 0)
      .to('.pscene__fg', { y: -310, ease: 'none' }, 0)

      // ── Phase 1 (0.22 → 0.44): Cup slides from right to center AFTER hero clears ──
      .fromTo(stage,
        { x: 0 },
        { x: centerX, ease: 'power2.out', duration: 0.22 },
        0.22
      )

      // ── Phase 2 (0.48 → 0.82): Pills build up one by one and ALL STAY ──

      // Pill 1 — TOP: drops down, stays
      .fromTo('.pscene__pill--1',
        { opacity: 0, y: -36, scale: 0.75 },
        { opacity: 1, y: 0, scale: 1, ease: 'back.out(1.8)', duration: 0.12 },
        0.48
      )
      // Pill 2 — RIGHT: slides from cup outward, stays (pill 1 still showing)
      .fromTo('.pscene__pill--2',
        { opacity: 0, x: -36, scale: 0.75 },
        { opacity: 1, x: 0, scale: 1, ease: 'back.out(1.8)', duration: 0.12 },
        0.60
      )
      // Pill 3 — LEFT: slides from cup outward, stays (pills 1+2 still showing)
      .fromTo('.pscene__pill--3',
        { opacity: 0, x: 36, scale: 0.75 },
        { opacity: 1, x: 0, scale: 1, ease: 'back.out(1.8)', duration: 0.12 },
        0.71
      )
      // All three visible together (0.83 → 0.90) — then exit as one
      .to(['.pscene__pill--1', '.pscene__pill--2', '.pscene__pill--3'],
        { opacity: 0, scale: 0.86, ease: 'power2.in', duration: 0.08 },
        0.90
      )

      // ── Phase 3 (0.94 → 1.10): Cup slides back to right ──
      .to(stage,
        { x: 0, ease: 'power2.inOut', duration: 0.16 },
        0.94
      )

      // ── Phase 4 (1.00 → 1.14): Caption fades in beside cup on right ──
      .fromTo('.pscene__caption',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, ease: 'power2.out', duration: 0.14 },
        1.00
      )

    // ── Story section: cup descends from above (visual continuity from parallax) ──
    const storyImg = document.querySelector('.story__product-img')
    if (storyImg) {
      gsap.fromTo(storyImg,
        { y: -window.innerHeight, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '.story',
            start: 'top bottom',
            end: 'top 35%',
            scrub: 2,
          }
        }
      )
    }
  })

  mm.add('(prefers-reduced-motion: reduce)', () => {
    const stage = section.querySelector('.pscene__product-stage')
    if (stage) gsap.set(stage, { yPercent: -50 })
    gsap.set('.pscene__caption', { opacity: 1, x: 0 })
    gsap.set('.pscene__product-inner', { opacity: 1 })
    gsap.set('.story__product-img', { y: 0, opacity: 1 })
  })

  mm.add('(max-width: 768px)', () => {
    const stage = section.querySelector('.pscene__product-stage')
    if (stage) gsap.set(stage, { xPercent: -50, yPercent: -50 })
    gsap.set('.pscene__caption', { opacity: 1, x: 0, y: 0, yPercent: 0 })
    gsap.set('.pscene__product-inner', { opacity: 1 })
  })
}
