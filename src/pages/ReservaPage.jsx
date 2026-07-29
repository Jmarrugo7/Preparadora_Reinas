import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

const PASOS = ['Tus datos', 'Fecha y hora', 'Confirmar']

export default function ReservaPage() {
    const [paso, setPaso] = useState(0)
    const [servicios, setServicios] = useState([])
    const [disponibles, setDisponibles] = useState([])
    const [cargando, setCargando] = useState(false)
    const [resultado, setResultado] = useState(null)
    const [error, setError] = useState('')

    const [form, setForm] = useState({
        nombre: '', email: '', whatsapp: '',
        servicios_ids: [],
        fecha: '', hora: '',
    })

    useEffect(() => {
        api.getServicios().then(setServicios).catch(() => { })
    }, [])

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

    const toggleServicio = (id) => {
        set('servicios_ids',
            form.servicios_ids.includes(id)
                ? form.servicios_ids.filter(s => s !== id)
                : [...form.servicios_ids, id]
        )
    }

    const total = servicios
        .filter(s => form.servicios_ids.includes(s.id))
        .reduce((sum, s) => sum + s.precio, 0)

    const buscarDisponibilidad = async () => {
        if (!form.fecha) return
        setDisponibles([])
        const { disponibles: slots } = await api.getDisponibilidad(form.fecha)
        setDisponibles(slots || [])
    }

    // Mínimo: mañana
    const hoy = new Date()
    hoy.setDate(hoy.getDate() + 1)
    const minFecha = hoy.toISOString().split('T')[0]

    const siguiente = async () => {
        setError('')
        if (paso === 0) {
            if (!form.nombre || !form.email || !form.whatsapp) return setError('Completa todos los campos.')
            if (!form.servicios_ids.length) return setError('Selecciona al menos un servicio.')
            setPaso(1)
        } else if (paso === 1) {
            if (!form.fecha || !form.hora) return setError('Selecciona fecha y hora.')
            setPaso(2)
        } else {
            // Confirmar reserva
            setCargando(true)
            try {
                const cliente = await api.registrarCliente({
                    nombre: form.nombre,
                    email: form.email,
                    whatsapp: form.whatsapp,
                })
                const res = await api.crearReserva({
                    cliente_id: cliente.id,
                    fecha: form.fecha,
                    hora: form.hora + ':00',
                    servicios_ids: form.servicios_ids,
                })
                setResultado(res)
            } catch (e) {
                setError(e.message)
            } finally {
                setCargando(false)
            }
        }
    }

    // Pantalla de éxito
    if (resultado) {
        return (
            <div className="min-h-screen bg-morado flex items-center justify-center px-4">
                <div className="card max-w-md w-full text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <h2 className="font-display text-3xl font-bold mb-2 text-oro">¡Reserva confirmada!</h2>
                    <p className="text-muted mb-6">Te enviamos un correo de confirmación.</p>
                    <div className="bg-[#2D1533] rounded-lg p-4 text-left mb-6 space-y-2">
                        <p><span className="text-muted">Fecha:</span> <span className="font-semibold">{resultado.reserva.fecha}</span></p>
                        <p><span className="text-muted">Hora:</span> <span className="font-semibold">{resultado.reserva.hora}</span></p>
                        <p><span className="text-muted">Total:</span> <span className="font-semibold text-oro">${resultado.total.toLocaleString('es-CO')}</span></p>
                    </div>
                    <a href={resultado.linkWhatsApp} target="_blank" rel="noopener noreferrer" className="btn-primary w-full block mb-3">
                        Confirmar por WhatsApp 💬
                    </a>
                    <Link to="/" className="btn-secondary w-full block">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-morado px-4 py-16">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <Link to="/" className="text-muted hover:text-crema text-sm mb-8 inline-flex items-center gap-2 transition-colors">
                    ← Volver
                </Link>
                <h1 className="font-display text-4xl font-bold mb-2">Reserva tu cita</h1>
                <p className="text-muted mb-8">Rápido y sin complicaciones.</p>

                {/* Stepper */}
                <div className="flex items-center mb-10">
                    {PASOS.map((p, i) => (
                        <div key={p} className="flex items-center flex-1 last:flex-none">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                ${i < paso ? 'bg-oro text-[#2D1533]' : i === paso ? 'border-2 border-oro text-oro' : 'border border-oro/20 text-muted'}`}>
                                {i < paso ? '✓' : i + 1}
                            </div>
                            <span className={`ml-2 text-sm hidden sm:block ${i === paso ? 'text-crema' : 'text-muted'}`}>{p}</span>
                            {i < PASOS.length - 1 && (
                                <div className={`flex-1 h-px mx-3 ${i < paso ? 'bg-oro' : 'bg-morado/10'}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Paso 0 — Datos */}
                {paso === 0 && (
                    <div className="space-y-5">
                        <div>
                            <label className="label">Nombre completo</label>
                            <input className="input" placeholder="Juan Pérez" value={form.nombre}
                                onChange={e => set('nombre', e.target.value)} />
                        </div>
                        <div>
                            <label className="label">Correo electrónico</label>
                            <input className="input" type="email" placeholder="juan@email.com" value={form.email}
                                onChange={e => set('email', e.target.value)} />
                        </div>
                        <div>
                            <label className="label">WhatsApp (con código de país)</label>
                            <input className="input" placeholder="+57 300 000 0000" value={form.whatsapp}
                                onChange={e => set('whatsapp', e.target.value)} />
                        </div>

                        <div>
                            <label className="label mb-3 block">Servicios</label>
                            <div className="grid grid-cols-3 gap-3">
                                {servicios.map(s => (
                                    <button key={s.id} onClick={() => toggleServicio(s.id)}
                                        className={`card text-center py-4 transition-all cursor-pointer
                      ${form.servicios_ids.includes(s.id)
                                                ? 'border-oro bg-oro/10 text-oro'
                                                : 'hover:border-oro/20'}`}>
                                        <p className="text-2xl mb-1">
                                            {s.nombre === 'Corte' ? '✂️' : s.nombre === 'Barba' ? '🪒' : '✦'}
                                        </p>
                                        <p className="font-semibold text-sm">{s.nombre}</p>
                                        <p className="text-xs text-muted mt-1">${s.precio.toLocaleString('es-CO')}</p>
                                    </button>
                                ))}
                            </div>
                            {form.servicios_ids.length > 0 && (
                                <p className="text-oro text-sm mt-3 font-semibold">
                                    Total: ${total.toLocaleString('es-CO')}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Paso 1 — Fecha y hora */}
                {paso === 1 && (
                    <div className="space-y-5">
                        <div>
                            <label className="label">Selecciona una fecha</label>
                            <input className="input" type="date" min={minFecha} value={form.fecha}
                                onChange={e => { set('fecha', e.target.value); set('hora', ''); buscarDisponibilidad() }}
                                onBlur={buscarDisponibilidad} />
                        </div>

                        {form.fecha && (
                            <div>
                                <label className="label">Horarios disponibles</label>
                                {disponibles.length === 0 ? (
                                    <p className="text-muted text-sm py-4">No hay horarios disponibles para esta fecha.</p>
                                ) : (
                                    <div className="grid grid-cols-3 gap-2">
                                        {disponibles.map(h => (
                                            <button key={h} onClick={() => set('hora', h)}
                                                className={`py-3 rounded-lg text-sm font-semibold transition-all
                          ${form.hora === h
                                                        ? 'bg-oro text-[#2D1533]'
                                                        : 'bg-[#2D1533] hover:border-oro border border-oro/20 text-crema'}`}>
                                                {h}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Paso 2 — Resumen */}
                {paso === 2 && (
                    <div className="card space-y-4">
                        <h3 className="font-display text-xl font-bold mb-4">Resumen de tu cita</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted">Nombre</span>
                                <span className="font-medium">{form.nombre}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted">Email</span>
                                <span className="font-medium">{form.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted">WhatsApp</span>
                                <span className="font-medium">{form.whatsapp}</span>
                            </div>
                            <div className="h-px bg-morado/5" />
                            <div className="flex justify-between">
                                <span className="text-muted">Fecha</span>
                                <span className="font-medium">{form.fecha}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted">Hora</span>
                                <span className="font-medium">{form.hora}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted">Servicios</span>
                                <span className="font-medium text-right">
                                    {servicios.filter(s => form.servicios_ids.includes(s.id)).map(s => s.nombre).join(', ')}
                                </span>
                            </div>
                            <div className="h-px bg-morado/5" />
                            <div className="flex justify-between text-base font-bold">
                                <span>Total</span>
                                <span className="text-oro">${total.toLocaleString('es-CO')}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <p className="mt-4 text-red-400 text-sm bg-red-400/10 px-4 py-3 rounded-lg">{error}</p>
                )}

                {/* Navegación */}
                <div className="flex gap-3 mt-8">
                    {paso > 0 && (
                        <button onClick={() => { setPaso(p => p - 1); setError('') }}
                            className="btn-secondary flex-1">
                            Atrás
                        </button>
                    )}
                    <button onClick={siguiente} disabled={cargando}
                        className="btn-primary flex-1 disabled:opacity-50">
                        {cargando ? 'Procesando...' : paso === 2 ? 'Confirmar reserva' : 'Siguiente →'}
                    </button>
                </div>
            </div>
        </div>
    )
}