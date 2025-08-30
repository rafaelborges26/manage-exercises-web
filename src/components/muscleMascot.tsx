import { useEffect, useRef } from 'react'

export const MuscleMascot = () => {
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const movePupil = (eye: HTMLDivElement | null) => {
        if (!eye) return

        const pupil = eye.querySelector('.pupil') as HTMLDivElement
        const rect = eye.getBoundingClientRect()

        const eyeCenterX = rect.left + rect.width / 2
        const eyeCenterY = rect.top + rect.height / 2

        const dx = e.clientX - eyeCenterX
        const dy = e.clientY - eyeCenterY

        const angle = Math.atan2(dy, dx)
        const radius = 6

        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        pupil.style.transform = `translate(${x}px, ${y}px)`
      }

      movePupil(leftEyeRef.current)
      movePupil(rightEyeRef.current)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative mx-auto mb-8 mt-4 flex h-[300px] w-[200px] flex-col items-center justify-start">
      <div className="relative h-[100px] w-[100px] rounded-full bg-[#ffe0bd]">
        <div
          ref={leftEyeRef}
          className="eye absolute left-[10px] top-[30px] h-[30px] w-[30px] rounded-full bg-white"
        >
          <div className="pupil absolute left-[9px] top-[9px] h-[12px] w-[12px] rounded-full bg-black transition-all duration-75" />
        </div>

        <div
          ref={rightEyeRef}
          className="eye absolute right-[10px] top-[30px] h-[30px] w-[30px] rounded-full bg-white"
        >
          <div className="pupil absolute left-[9px] top-[9px] h-[12px] w-[12px] rounded-full bg-black transition-all duration-75" />
        </div>
      </div>

      <div className="mt-2 h-[120px] w-[120px] rounded-xl bg-[#ffe0bd]" />
      <div className="absolute left-[-40px] top-[100px] h-[80px] w-[60px] rotate-[20deg] rounded-xl bg-[#ffe0bd]" />
      <div className="absolute right-[-40px] top-[100px] h-[80px] w-[60px] -rotate-[20deg] rounded-xl bg-[#ffe0bd]" />
    </div>
  )
}
