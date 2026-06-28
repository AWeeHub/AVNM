import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initNavbar() {
  const navbar = document.querySelector('.navbar')
  if (!navbar) return

  ScrollTrigger.create({
    trigger: '.hero',
    start: 'bottom 90%',
    onEnter: () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled'),
  })
}
