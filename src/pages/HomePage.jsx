import { useEffect } from 'react'
import HeroHome from '../components/home/HeroHome'
import StatementHome from '../components/home/StatementHome'
import ChiffresHome from '../components/home/ChiffresHome'
import ProgrammesHome from '../components/home/ProgrammesHome'
import DispositifsHome from '../components/home/DispositifsHome'
import CtaHome from '../components/home/CtaHome'

export default function HomePage() {
  // Custom cursor
  useEffect(() => {
    if ('ontouchstart' in window) return
    const cursor = document.createElement('div')
    cursor.id = 'viveo-cursor'
    cursor.style.cssText = 'position:fixed;width:12px;height:12px;background:#A67C52;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform 0.15s ease,width 0.3s ease,height 0.3s ease,opacity 0.3s ease;mix-blend-mode:normal;'
    document.body.appendChild(cursor)
    document.body.style.cursor = 'none'
    const follower = document.createElement('div')
    follower.id = 'viveo-cursor-follower'
    follower.style.cssText = 'position:fixed;width:36px;height:36px;border:1px solid rgba(166,124,82,0.40);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:transform 0.4s ease,width 0.3s ease,height 0.3s ease;'
    document.body.appendChild(follower)
    let mx = 0, my = 0, fx = 0, fy = 0
    const move = e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + 'px'; cursor.style.top = my + 'px' }
    const anim = () => { fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12; follower.style.left = fx + 'px'; follower.style.top = fy + 'px'; requestAnimationFrame(anim) }
    anim()
    const hIn = () => { cursor.style.width = '6px'; cursor.style.height = '6px'; follower.style.width = '56px'; follower.style.height = '56px'; follower.style.borderColor = 'rgba(166,124,82,0.70)' }
    const hOut = () => { cursor.style.width = '12px'; cursor.style.height = '12px'; follower.style.width = '36px'; follower.style.height = '36px'; follower.style.borderColor = 'rgba(166,124,82,0.40)' }
    document.addEventListener('mousemove', move)
    const addHovers = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', hIn)
        el.addEventListener('mouseleave', hOut)
      })
    }
    addHovers()
    const mo = new MutationObserver(addHovers)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      document.removeEventListener('mousemove', move)
      mo.disconnect()
      cursor.remove()
      follower.remove()
      document.body.style.cursor = 'auto'
    }
  }, [])

  // Background transitions between sections
  useEffect(() => {
    const sections = document.querySelectorAll('[data-bg]')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.body.style.transition = 'background-color 0.6s ease'
          document.body.style.backgroundColor = entry.target.dataset.bg
        }
      })
    }, { threshold: 0.5 })
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <HeroHome />
      <StatementHome />
      <ChiffresHome />
      <ProgrammesHome />
      <DispositifsHome />
      <CtaHome />
    </>
  )
}
