import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initNavbar() {
  const navbar = document.querySelector('.navbar')
  if (!navbar) return

  ScrollTrigger.create({
    start: 80,
    onEnter: () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled'),
  })
}
