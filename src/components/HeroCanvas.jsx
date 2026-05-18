import React, { useRef, useEffect, useCallback } from 'react'
import heroBg from '../assets/man.png'

/**
 * HeroCanvas — Full-viewport hero image renderer with mouse parallax.
 *
 * The image is drawn purely bright and clear, letting the natural
 * darks of the image provide the contrast for the text.
 */
export default function HeroCanvas({ scrollProgressRef, mouseRef }) {
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const rafIdRef = useRef(null)
  const dimensionsRef = useRef({ w: 0, h: 0 })

  const getCoverDimensions = useCallback((imgW, imgH, canvasW, canvasH, parallaxPadding = 60) => {
    const imgRatio = imgW / imgH
    const canvasRatio = canvasW / canvasH

    let drawW, drawH
    if (canvasRatio > imgRatio) {
      drawW = canvasW + parallaxPadding * 2
      drawH = drawW / imgRatio
    } else {
      drawH = canvasH + parallaxPadding * 2
      drawW = drawH * imgRatio
    }

    const drawX = (canvasW - drawW) / 2
    const drawY = (canvasH - drawH) / 2

    return { drawX, drawY, drawW, drawH }
  }, [])

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img || !img.complete) {
      rafIdRef.current = requestAnimationFrame(renderFrame)
      return
    }

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const { w, h } = dimensionsRef.current
    if (w === 0 || h === 0) {
      rafIdRef.current = requestAnimationFrame(renderFrame)
      return
    }

    const scaledW = w * dpr
    const scaledH = h * dpr

    if (canvas.width !== scaledW || canvas.height !== scaledH) {
      canvas.width = scaledW
      canvas.height = scaledH
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // --- Mouse parallax offset ---
    const mx = mouseRef?.current?.x || 0
    const my = mouseRef?.current?.y || 0
    const parallaxStrength = 15 // Subtler parallax as requested
    const offsetX = mx * parallaxStrength
    const offsetY = my * parallaxStrength

    const cover = getCoverDimensions(img.naturalWidth, img.naturalHeight, w, h, parallaxStrength + 10)
    const progress = scrollProgressRef?.current || 0

    // --- Draw pure image with enhanced crispness ---
    ctx.clearRect(0, 0, w, h)

    // Boost contrast and saturation slightly to make skin texture crisp and pop like the reference
    ctx.filter = 'contrast(1.15) saturate(1.1)'

    ctx.drawImage(
      img,
      cover.drawX + offsetX,
      cover.drawY + offsetY,
      cover.drawW,
      cover.drawH
    )

    ctx.filter = 'none'

    // --- Add Point Light (Sun Shine Effect) ---
    // Positioned on the right side where the light hits the face
    const lightX = w * 0.75 + offsetX * 0.4
    const lightY = h * 0.35 + offsetY * 0.4
    const lightRadius = Math.max(w, h) * 0.6

    ctx.globalCompositeOperation = 'screen'
    const lightGrad = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, lightRadius)
    lightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)')      // Bright white/sun core
    lightGrad.addColorStop(0.15, 'rgba(120, 240, 255, 0.15)')   // Cyan glare
    lightGrad.addColorStop(0.5, 'rgba(0, 150, 255, 0.05)')      // Soft blue falloff
    lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')

    ctx.fillStyle = lightGrad
    ctx.fillRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'source-over'

    // --- Subtle overall dim on scroll (fade out) ---
    if (progress > 0.3) {
      const dimAlpha = Math.min(1, (progress - 0.3) * 1.5)
      ctx.fillStyle = `rgba(0, 4, 10, ${dimAlpha})`
      ctx.fillRect(0, 0, w, h)
    }

    rafIdRef.current = requestAnimationFrame(renderFrame)
  }, [scrollProgressRef, mouseRef, getCoverDimensions])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    dimensionsRef.current = { w: parent.clientWidth, h: parent.clientHeight }
    canvas.style.width = `${parent.clientWidth}px`
    canvas.style.height = `${parent.clientHeight}px`
  }, [])

  useEffect(() => {
    const img = new Image()
    img.src = heroBg
    img.onload = () => { imageRef.current = img }
    imageRef.current = img

    handleResize()
    const observer = new ResizeObserver(handleResize)
    if (canvasRef.current?.parentElement) observer.observe(canvasRef.current.parentElement)

    rafIdRef.current = requestAnimationFrame(renderFrame)
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      observer.disconnect()
    }
  }, [handleResize, renderFrame])

  return <canvas ref={canvasRef} className="canvas-fill" style={{ zIndex: 0 }} aria-hidden="true" />
}
