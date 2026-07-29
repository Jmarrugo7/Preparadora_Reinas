import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { api } from '../services/api'

// ─── Datos estáticos ─────────────────────────────────────────────────────────
const EMOJIS = {
    Corte: '✂️', Barba: '🪒', Cejas: '👁️',
    'Afeitado clásico': '🧴', 'Coloracion de Cabello': '🎨', 'Mascarilla facial': '💆‍♂️',
}

const DESCRIPCIONES = {
    Corte: 'Corte clásico o moderno adaptado a tu estilo personal.',
    Barba: 'Perfilado, delineado y arreglo profesional con navaja.',
    Cejas: 'Depilación y definición para un look limpio y definido.',
    'Afeitado clásico': 'Rasurado total con navaja caliente y loción.',
    'Coloracion de Cabello': 'Decoloración limpia para un cambio de look radical.',
    'Mascarilla facial': 'Exfoliación, limpieza e hidratación profunda.',
}

const IMAGENES_SERVICIO = {
    Corte: '/images/service-corte.png',
    Barba: '/images/service-barba.png',
}

const PAQUETES = [
    {
        nombre: 'Esencial',
        precio: 25000,
        desc: 'Lo básico para verte bien.',
        servicios: ['Corte', 'Cejas'],
        popular: false,
    },
    {
        nombre: 'Premium',
        precio: 55000,
        desc: 'El favorito de nuestros clientes.',
        servicios: ['Corte', 'Barba', 'Cejas'],
        popular: true,
    },
    {
        nombre: 'Total',
        precio: 90000,
        desc: 'La experiencia completa de barbería.',
        servicios: ['Corte', 'Barba', 'Cejas', 'Mascarilla facial'],
        popular: false,
    },
]

const EXPERIENCIAS = [
    {
        nombre: 'Carlos M.',
        texto: 'La mejor barbería de la ciudad. Siempre salgo satisfecho, el ambiente es increíble y el servicio de primera.',
        rating: 5,
    },
    {
        nombre: 'Andrés R.',
        texto: 'Reservé por la app en 30 segundos. Llegué, me atendieron sin espera, y el corte quedó perfecto. ¡100% recomendado!',
        rating: 5,
    },
    {
        nombre: 'Miguel S.',
        texto: 'El paquete Premium vale cada peso. El arreglo de barba con navaja caliente es toda una experiencia.',
        rating: 5,
    },
]

const STATS = [
    { valor: '500+', label: 'Clientes satisfechos' },
    { valor: '3+', label: 'Años de experiencia' },
    { valor: '6', label: 'Servicios profesionales' },
    { valor: '4.9', label: 'Calificación promedio' },
]

// ─── Componente ──────────────────────────────────────────────────────────────
export default function HomePage() {
    const [servicios, setServicios] = useState([])

    useEffect(() => {
        api.getServicios().then(setServicios).catch(() => { })
    }, [])

    return (
        <div className="min-h-screen bg-morado">
            <Navbar />

            {/* ═══════════════════════════════════════════════════════════════════
                HERO
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Background image */}
                <div className="absolute inset-0">
                    <img src="/images/hero.png" alt="Barbería premium"
                        className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-morado via-morado/90 to-morado/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-morado via-transparent to-morado/30" />
                </div>

                {/* Orb decorativo */}
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-oro/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 max-w-6xl mx-auto px-4 py-32 md:py-0">
                    <div className="max-w-2xl">
                        <p className="text-oro text-sm font-medium tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-oro inline-block" />
                            Estilo &amp; Precisión
                        </p>
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-blanco leading-[1.1] mb-8">
                            El arte del<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-oro to-[#F5D76E]">
                                corte perfecto
                            </span>
                        </h1>
                        <p className="text-crema/60 text-lg max-w-lg mb-10 leading-relaxed">
                            Más que una barbería, una experiencia. Reserva tu cita en segundos
                            y descubre por qué cientos de clientes confían en nosotros.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link to="/reservar" className="btn-primary text-base px-8 py-4 shadow-lg shadow-oro/20">
                                Reservar ahora
                            </Link>
                            <a href="#nosotros" className="btn-secondary text-base px-8 py-4">
                                Conocer más
                            </a>
                        </div>

                        {/* Stats rápidas */}
                        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                            {STATS.map(({ valor, label }) => (
                                <div key={label}>
                                    <p className="text-oro font-display text-2xl font-bold">{valor}</p>
                                    <p className="text-crema/40 text-xs uppercase tracking-widest mt-1">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-crema/30 text-xs tracking-widest uppercase">Scroll</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-crema/30">
                        <path d="M19 14l-7 7m0 0l-7-7" />
                    </svg>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                NOSOTROS
            ═══════════════════════════════════════════════════════════════════ */}
            <section id="nosotros" className="max-w-6xl mx-auto px-4 py-24">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Imagen */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-oro/20 to-magenta/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative overflow-hidden rounded-2xl border border-oro/20">
                            <img src="/images/about.png" alt="Interior de la barbería"
                                className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700" />
                            {/* Overlay sutil */}
                            <div className="absolute inset-0 bg-gradient-to-t from-morado/60 to-transparent" />
                        </div>
                        {/* Floating badge */}
                        <div className="absolute -bottom-6 -right-6 bg-[#2D1533] border border-oro/30 rounded-2xl p-5 shadow-2xl">
                            <p className="text-oro font-display text-3xl font-bold">3+</p>
                            <p className="text-crema/50 text-xs uppercase tracking-widest">Años</p>
                        </div>
                    </div>

                    {/* Texto */}
                    <div>
                        <p className="text-oro text-sm font-medium tracking-[0.3em] uppercase mb-3 flex items-center gap-3">
                            <span className="w-8 h-px bg-oro inline-block" />
                            Quiénes somos
                        </p>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-blanco mb-6 leading-tight">
                            Donde el estilo<br />
                            se encuentra con la <span className="text-oro">tradición</span>
                        </h2>
                        <p className="text-crema/50 leading-relaxed mb-6">
                            Somos más que una barbería — somos un espacio donde cada detalle
                            cuenta. Con más de 3 años de experiencia, combinamos técnicas
                            clásicas con tendencias modernas para ofrecerte un resultado que
                            supere tus expectativas.
                        </p>
                        <p className="text-crema/50 leading-relaxed mb-8">
                            Nuestro compromiso es brindarte una experiencia premium desde el
                            momento en que reservas hasta que sales por la puerta. Sin esperas,
                            sin complicaciones, solo estilo puro.
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: '✂️', text: 'Técnicas profesionales' },
                                { icon: '🪒', text: 'Productos premium' },
                                { icon: '⏱️', text: 'Puntualidad garantizada' },
                                { icon: '💈', text: 'Ambiente exclusivo' },
                            ].map(f => (
                                <div key={f.text} className="flex items-center gap-3 text-sm">
                                    <span className="text-lg">{f.icon}</span>
                                    <span className="text-crema/70">{f.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                SERVICIOS
            ═══════════════════════════════════════════════════════════════════ */}
            <section id="servicios" className="max-w-6xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <p className="text-oro text-sm font-medium tracking-[0.3em] uppercase mb-3 inline-flex items-center gap-3">
                        <span className="w-8 h-px bg-oro inline-block" />
                        Lo que hacemos
                        <span className="w-8 h-px bg-oro inline-block" />
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-blanco mt-4">
                        Nuestros Servicios
                    </h2>
                    <p className="text-crema/40 mt-4 max-w-lg mx-auto">
                        Cada servicio está diseñado para darte la mejor versión de ti mismo.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicios.length > 0 ? (
                        servicios.map((s) => {
                            const hasImage = IMAGENES_SERVICIO[s.nombre]
                            return (
                                <div key={s.id} className="group relative bg-[#2D1533] rounded-2xl border border-oro/10 overflow-hidden hover:border-oro/30 transition-all duration-500 hover:-translate-y-1">
                                    {/* Imagen del servicio (si tiene) */}
                                    {hasImage && (
                                        <div className="h-48 overflow-hidden">
                                            <img src={hasImage} alt={s.nombre}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-t from-[#2D1533] to-transparent" />
                                        </div>
                                    )}

                                    <div className="p-6 relative">
                                        {/* Emoji / icono */}
                                        {!hasImage && (
                                            <div className="w-14 h-14 rounded-xl bg-oro/10 border border-oro/20 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                                                {EMOJIS[s.nombre] || '✦'}
                                            </div>
                                        )}

                                        <h3 className="font-display text-xl font-bold text-crema mb-2 group-hover:text-oro transition-colors">
                                            {s.nombre}
                                        </h3>
                                        <p className="text-crema/40 text-sm mb-5 leading-relaxed">
                                            {DESCRIPCIONES[s.nombre] || 'Servicio profesional de barbería.'}
                                        </p>
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-oro font-display text-2xl font-bold">
                                                    ${s.precio.toLocaleString('es-CO')}
                                                </p>
                                                <p className="text-crema/30 text-xs mt-1">~60 min</p>
                                            </div>
                                            <Link to="/reservar" className="text-xs px-4 py-2 rounded-lg bg-oro/10 border border-oro/20 text-oro hover:bg-oro/20 transition-colors">
                                                Agendar →
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-oro/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </div>
                            )
                        })
                    ) : (
                        [1, 2, 3].map(i => (
                            <div key={i} className="bg-[#2D1533] rounded-2xl border border-oro/10 p-6 animate-pulse">
                                <div className="w-14 h-14 rounded-xl bg-oro/5 mb-5" />
                                <div className="h-6 bg-oro/5 rounded mb-3 w-2/3" />
                                <div className="h-4 bg-oro/5 rounded mb-2 w-full" />
                                <div className="h-4 bg-oro/5 rounded mb-5 w-4/5" />
                                <div className="h-8 bg-oro/5 rounded w-1/3" />
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                PAQUETES
            ═══════════════════════════════════════════════════════════════════ */}
            <section id="paquetes" className="max-w-6xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <p className="text-oro text-sm font-medium tracking-[0.3em] uppercase mb-3 inline-flex items-center gap-3">
                        <span className="w-8 h-px bg-oro inline-block" />
                        Combos especiales
                        <span className="w-8 h-px bg-oro inline-block" />
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-blanco mt-4">
                        Paquetes
                    </h2>
                    <p className="text-crema/40 mt-4 max-w-lg mx-auto">
                        Ahorra combinando los servicios que más te gustan.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {PAQUETES.map(pkg => (
                        <div key={pkg.nombre}
                            className={`relative bg-[#2D1533] rounded-2xl p-8 border transition-all duration-500 hover:-translate-y-2 ${pkg.popular
                                ? 'border-oro/40 shadow-xl shadow-oro/10'
                                : 'border-oro/10 hover:border-oro/30'
                                }`}>
                            {/* Popular badge */}
                            {pkg.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-oro text-[#2D1533] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                        Más popular
                                    </span>
                                </div>
                            )}

                            <h3 className="font-display text-2xl font-bold text-blanco mb-2 mt-2">{pkg.nombre}</h3>
                            <p className="text-crema/40 text-sm mb-6">{pkg.desc}</p>

                            <div className="mb-8">
                                <span className="text-oro font-display text-4xl font-bold">
                                    ${pkg.precio.toLocaleString('es-CO')}
                                </span>
                            </div>

                            {/* Incluye */}
                            <div className="space-y-3 mb-8">
                                {pkg.servicios.map(s => (
                                    <div key={s} className="flex items-center gap-3 text-sm">
                                        <span className="w-5 h-5 rounded-full bg-oro/10 flex items-center justify-center text-oro text-xs shrink-0">✓</span>
                                        <span className="text-crema/60">{s}</span>
                                    </div>
                                ))}
                            </div>

                            <Link to="/reservar"
                                className={`block text-center py-3 rounded-lg font-semibold text-sm transition-all ${pkg.popular
                                    ? 'bg-oro text-[#2D1533] hover:bg-[#b5952f] shadow-lg shadow-oro/20'
                                    : 'border border-oro/30 text-oro hover:bg-oro/10'
                                    }`}>
                                Reservar paquete
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                UBICACIÓN
            ═══════════════════════════════════════════════════════════════════ */}
            <section id="ubicacion" className="max-w-6xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <p className="text-oro text-sm font-medium tracking-[0.3em] uppercase mb-3 inline-flex items-center gap-3">
                        <span className="w-8 h-px bg-oro inline-block" />
                        Dónde encontrarnos
                        <span className="w-8 h-px bg-oro inline-block" />
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-blanco mt-4">
                        Nuestra Ubicación
                    </h2>
                    <p className="text-crema/40 mt-4 max-w-lg mx-auto">
                        Visítanos para vivir la experiencia premium en persona.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center bg-[#2D1533] rounded-2xl border border-oro/10 p-8 hover:border-oro/30 transition-all duration-500">
                    <div>
                        <h3 className="font-display text-2xl font-bold text-blanco mb-6">
                            Sede Principal
                        </h3>
                        <div className="space-y-6 text-crema/60">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-oro/10 flex items-center justify-center shrink-0">
                                    <span className="text-oro text-lg">📍</span>
                                </div>
                                <div>
                                    <p className="text-crema font-medium mb-1">Dirección</p>
                                    <p className="text-sm">Cartagena, Colombia<br />Centro Histórico, Calle 34 #5-12</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-oro/10 flex items-center justify-center shrink-0">
                                    <span className="text-oro text-lg">📞</span>
                                </div>
                                <div>
                                    <p className="text-crema font-medium mb-1">Teléfono</p>
                                    <p className="text-sm">+57 300 000 0000</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-oro/10 flex items-center justify-center shrink-0">
                                    <span className="text-oro text-lg">✉️</span>
                                </div>
                                <div>
                                    <p className="text-crema font-medium mb-1">Correo Electrónico</p>
                                    <p className="text-sm">info@barberia.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-[350px] w-full rounded-xl overflow-hidden border border-oro/20 relative group">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.474665488424!2d-75.55169468519894!3d10.422319092562473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625e6eb48352b%3A0xc3f58a5293699b0c!2sCentro%20Hist%C3%B3rico%20de%20Cartagena!5e0!3m2!1ses!2sco!4v1655310931123!5m2!1ses!2sco" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                EXPERIENCIAS / TESTIMONIOS
            ═══════════════════════════════════════════════════════════════════ */}
            <section id="experiencias" className="max-w-6xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <p className="text-oro text-sm font-medium tracking-[0.3em] uppercase mb-3 inline-flex items-center gap-3">
                        <span className="w-8 h-px bg-oro inline-block" />
                        Lo que dicen nuestros clientes
                        <span className="w-8 h-px bg-oro inline-block" />
                    </p>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-blanco mt-4">
                        Experiencias
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {EXPERIENCIAS.map(exp => (
                        <div key={exp.nombre} className="bg-[#2D1533] rounded-2xl border border-oro/10 p-8 hover:border-oro/30 transition-all duration-500 group">
                            {/* Stars */}
                            <div className="flex gap-1 mb-5">
                                {Array.from({ length: exp.rating }).map((_, i) => (
                                    <span key={i} className="text-oro text-sm">★</span>
                                ))}
                            </div>

                            <p className="text-crema/50 text-sm leading-relaxed mb-8 italic">
                                "{exp.texto}"
                            </p>

                            <div className="flex items-center gap-3 pt-6 border-t border-oro/10">
                                <div className="w-10 h-10 rounded-full bg-oro/20 flex items-center justify-center text-oro font-bold text-sm">
                                    {exp.nombre[0]}
                                </div>
                                <div>
                                    <p className="text-crema font-semibold text-sm">{exp.nombre}</p>
                                    <p className="text-crema/30 text-xs">Cliente frecuente</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                CTA FINAL
            ═══════════════════════════════════════════════════════════════════ */}
            <section className="max-w-4xl mx-auto px-4 py-24 text-center">
                <p className="text-oro text-sm font-medium tracking-[0.3em] uppercase mb-4">
                    ¿Listo para el cambio?
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-blanco mb-6 leading-tight">
                    Tu próximo corte está a <span className="text-oro">un clic</span>
                </h2>
                <p className="text-crema/40 text-lg max-w-lg mx-auto mb-10">
                    Reserva tu cita en menos de 30 segundos. Sin llamadas,
                    sin esperas. Tu estilo, a tu hora.
                </p>
                <Link to="/reservar" className="btn-primary text-lg px-12 py-5 shadow-xl shadow-oro/20 inline-block">
                    Reservar mi cita →
                </Link>

                {/* Horario */}
                <div className="mt-16 flex gap-10 justify-center flex-wrap">
                    {[
                        { label: 'Lun — Sáb', valor: '9am — 7pm' },
                        { label: 'Domingo', valor: 'Cerrado' },
                        { label: 'Martes', valor: 'Cerrado' },
                    ].map(({ label, valor }) => (
                        <div key={label}>
                            <p className="text-crema/30 text-xs uppercase tracking-widest">{label}</p>
                            <p className="text-blanco font-semibold mt-1">{valor}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════════
                FOOTER
            ═══════════════════════════════════════════════════════════════════ */}
            <footer className="border-t border-oro/10 bg-[#2D1533]">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {/* Brand */}
                        <div>
                            <p className="font-display text-xl font-bold mb-3">
                                <span className="text-oro">✦</span> Barbería
                            </p>
                            <p className="text-crema/30 text-sm leading-relaxed">
                                Estilo, precisión y la mejor experiencia de barbería.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <p className="text-crema/60 text-xs uppercase tracking-widest mb-4">Navegación</p>
                            <div className="space-y-2">
                                {['Nosotros', 'Servicios', 'Paquetes', 'Ubicación', 'Experiencias'].map(l => (
                                    <a key={l} href={`#${l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                                        className="block text-crema/40 hover:text-oro text-sm transition-colors">
                                        {l}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contacto */}
                        <div>
                            <p className="text-crema/60 text-xs uppercase tracking-widest mb-4">Contacto</p>
                            <div className="space-y-2 text-crema/40 text-sm">
                                <p>📍 Cartagena, Colombia</p>
                                <p>📞 +57 300 000 0000</p>
                                <p>✉️ info@barberia.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-oro/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-crema/20 text-xs">
                            © {new Date().getFullYear()} Barbería · Todos los derechos reservados
                        </p>
                        <a href="/admin" className="text-crema/10 hover:text-crema/20 text-xs transition-colors">
                            Acceso administrativo
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}