import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once
gsap.registerPlugin(ScrollTrigger)

import { initLenis }        from './lenis-setup.js'
import { initCursor }       from './cursor.js'
import { initProgressBar }  from './progress.js'
import { initNavbar }       from './navbar.js'
import { initHero }         from './hero.js'
import { initScrollReveals }from './scroll-reveals.js'
import { initParallax }     from './parallax.js'
import { initMagnetic }     from './magnetic.js'
import { initAnchorNav }        from './anchor-nav.js'
import { initParallaxProduct }  from './parallax-product.js'

// Boot order matters: Lenis first (owns scroll), then GSAP-dependent modules
const lenis = initLenis()
initCursor()
initProgressBar()
initNavbar()
initHero()
initScrollReveals()
initParallax()
initMagnetic()
initAnchorNav(lenis)
initParallaxProduct()

// Refresh ScrollTrigger after all images/fonts loaded
window.addEventListener('load', () => {
  ScrollTrigger.refresh()
})

// Recalculate layout-dependent GSAP values on resize/zoom
let _resizeTimer
window.addEventListener('resize', () => {
  clearTimeout(_resizeTimer)
  _resizeTimer = setTimeout(() => ScrollTrigger.refresh(true), 200)
})
