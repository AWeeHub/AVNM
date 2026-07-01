import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initProgressBar() {
  const bar = document.querySelector('.progress-bar')
  if (!bar) return

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      gsap.set(bar, { scaleX: self.progress })
    },
  })
}
