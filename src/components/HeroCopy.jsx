import React from 'react'

export default function HeroCopy({ style }) {
  return (
    <div
      className="absolute right-6 md:right-9 w-[200px] md:w-[210px] text-white/80 text-[12px] md:text-[14px] leading-[1.45] font-light"
      style={{
        fontFamily: "'Inter', sans-serif",
        top: '50%',
        transform: 'translateY(-50%)',
        letterSpacing: '0.02em',
        ...style,
      }}
    >
      Amaterasu is a physics cognition lab working at the intersection of
      technology and nature to transform mental health.
    </div>
  )
}
