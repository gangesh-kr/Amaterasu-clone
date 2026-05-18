import React from 'react'

export default function Footer() {
  return (
    <footer className="w-full bg-[#00040A] text-white pt-20 pb-10 px-6 md:px-16 lg:px-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
        
        {/* Left Links */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <a href="https://amaterasu.ai/" className="text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors">Vision</a>
            <a href="https://amaterasu.ai/aleph" className="text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors">Aleph</a>
          </div>
          
          <div className="flex flex-col gap-4">
            <a href="https://x.com/Amaterasu_mind" target="_blank" rel="noopener noreferrer" className="text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors">Twitter</a>
            <a href="https://www.linkedin.com/company/amaterasu-quantum" target="_blank" rel="noopener noreferrer" className="text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors">LinkedIn</a>
            <a href="mailto:info@amaterasu.ai" className="text-sm tracking-[0.1em] uppercase text-white/60 hover:text-white transition-colors">Email</a>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex flex-col items-start md:items-end gap-6">
          <div className="text-[11px] tracking-[0.3em] uppercase text-white/40">
            AMATERASU © 2026
          </div>
          <a 
            href="https://www.exoape.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white/80 transition-colors"
          >
            Crafted by Exo Ape
          </a>
        </div>

      </div>
    </footer>
  )
}
