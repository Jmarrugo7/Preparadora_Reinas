import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const links = [
        { label: 'Nosotros', href: '#nosotros' },
        { label: 'Servicios', href: '#servicios' },
        { label: 'Paquetes', href: '#paquetes' },
        { label: 'Ubicacion', href: '#ubicacion' },
        { label: 'Experiencias', href: '#experiencias' },
    ]

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#2D1533]/95 backdrop-blur-md border-b border-oro/10 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                <Link to="/" className="font-display text-xl font-bold tracking-wide">
                    <span className="text-oro">✦</span> Barbería
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map(l => (
                        <a key={l.label} href={l.href}
                            className="text-crema/70 hover:text-oro text-sm font-medium tracking-wide transition-colors">
                            {l.label}
                        </a>
                    ))}
                    <Link to="/reservar" className="btn-primary text-sm py-2 px-5">
                        Reservar cita
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button onClick={() => setMenuOpen(o => !o)} className="md:hidden text-crema p-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                        {menuOpen
                            ? <path d="M6 18L18 6M6 6l12 12" />
                            : <path d="M4 6h16M4 12h16M4 18h16" />}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#2D1533]/95 backdrop-blur-md border-t border-oro/10 px-4 py-6 space-y-4">
                    {links.map(l => (
                        <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                            className="block text-crema/70 hover:text-oro text-sm font-medium tracking-wide transition-colors">
                            {l.label}
                        </a>
                    ))}
                    <Link to="/reservar" onClick={() => setMenuOpen(false)} className="btn-primary text-sm py-2 px-5 block text-center mt-4">
                        Reservar cita
                    </Link>
                </div>
            )}
        </nav>
    )
}