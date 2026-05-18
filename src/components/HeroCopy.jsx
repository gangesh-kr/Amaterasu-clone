import React from 'react'

export default function HeroCopy({ style }) {
  return (
    <div
      className="absolute bottom-10 right-6 md:bottom-20 md:right-9 w-[200px] md:w-[240px] text-white/70 text-[10px] md:text-[11px] leading-[1.6] font-light"
      style={{
        fontFamily: "'Inter', sans-serif",
        ...style,
      }}
    >
      Amaterasu is a physics cognition lab working at the intersection of
      technology and nature to transform mental health.
    </div>
  )
}
