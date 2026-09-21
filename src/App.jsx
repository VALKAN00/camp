import './App.css'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useEffect } from 'react'
import HeroSection from './landing_page/heroSection'
import Pointer from './landing_page/pointer'
import Rules from './landing_page/Rules'
import Header from './landing_page/header'
import Safety from './landing_page/Safety'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollToPlugin)

function App() {
  useEffect(() => {
    const handleAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return

      const target = document.querySelector(link.getAttribute('href'))
      if (!target) return

      event.preventDefault()

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        target.scrollIntoView()
        return
      }

      gsap.to(window, {
        duration: 1.15,
        ease: 'power3.inOut',
        scrollTo: {
          y: target,
          offsetY: 76,
        },
      })
    }

    document.addEventListener('click', handleAnchorClick)

    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  return (
    <>
      <Pointer />
      <Header />
      <div className="App">
        <HeroSection />
        <Rules />
        <Safety />
        <Contact />
      </div>
    </>
  )
}

export default App
