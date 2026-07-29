import { useState } from 'react'
import { useAdmin } from './AdminLayout'
import { SERVICIO_ICON, SERVICIO_COLOR } from './adminConstants'

// Helper para sumar/restar días sin problemas de zona horaria
const getOffsetDate = (baseStr, offsetDays) => {
    const d = new Date(baseStr + 'T12:00:00Z')
    d.setUTCDate(d.getUTCDate() + offsetDays)
    return d.toISOString().split('T')[0]
}

const formatFecha = (fechaStr) => {
    const d = new Date(fechaStr + 'T12:00:00Z')
    return d.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'short' })
}

// ─── Sub-Componente: ColumnaDia ──────────────────────────────────────────────
function ColumnaDia({ fecha, titulo, isExpanded, onExpand, onCollapse }) {
    const { reservas, pedirConfirmacion } = useAdmin()

    const citasJornada = reservas
        .filter(r => r.fecha === fecha && r.estado === 'confirmada')
        .sort((a, b) => a.hora?.localeCompare(b.hora))

    const totalJornada = citasJornada.reduce((s, r) => s + (r.total || 0), 0)

    const serviciosJornada = citasJornada.reduce((acc, r) => {
        r.reserva_servicios?.forEach(rs => {
            const n = rs.servicios?.nombre
            if (n) acc[n] = (acc[n] || 0) + 1
        })
        return acc
    }, {})

    // Si estamos en 3 columnas, ocultamos algunos detalles (ej. iconos de servicios) para no apretar todo.
    // Si está expandido, mostramos todo al 100%.
    const compactMode = !isExpanded

    return (
        <div className={`flex flex-col space-y-4 ${isExpanded ? 'max-w-3xl mx-auto' : 'w-full'}`}>
            {/* Cabecera de la columna */}
            <div className="flex items-center justify-between pb-3 border-b border-oro/20">
                <div>
                    <h3 className="font-display font-bold text-lg text-oro uppercase tracking-wider">{titulo}</h3>
                    <p className="text-muted text-xs capitalize">{formatFecha(fecha)}</p>
                </div>
                {isExpanded ? (
                    <button onClick={onCollapse} className="text-xs px-3 py-1.5 rounded-lg border border-oro/20 text-crema hover:bg-oro/10 transition-colors">
                        ← Volver
                    </button>
                ) : (
                    <button onClick={() => onExpand(fecha)} className="text-xs px-3 py-1.5 rounded-lg border border-oro/20 text-oro hover:bg-oro/10 transition-colors">
                        Ampliar ⤢
                    </button>
                )}
            </div>

            {/* Resumen numérico */}
            {citasJornada.length > 0 && (
                <div className={`grid gap-3 ${compactMode ? 'grid-cols-2' : 'grid-cols-3'}`}>
                    <div className="card text-center py-3 px-2">
                        <p className="text-xl font-bold text-oro">{citasJornada.length}</p>
                        <p className="text-muted text-[10px] uppercase tracking-widest mt-1">Citas</p>
                    </div>
                    <div className="card text-center py-3 px-2">
                        <p className="text-xl font-bold text-emerald-400">${totalJornada.toLocaleString('es-CO')}</p>
                        <p className="text-muted text-[10px] uppercase tracking-widest mt-1">Ingresos</p>
                    </div>
                    {!compactMode && (
                        <div className="card text-center py-3 px-2 flex flex-col items-center justify-center">
                            <div className="flex justify-center gap-2 flex-wrap">
                                {Object.entries(serviciosJornada).map(([nombre, cant]) => (
                                    <span key={nombre} className="text-sm">
                                        {SERVICIO_ICON[nombre] || '✦'} <span className="text-oro font-bold">{cant}</span>
                                    </span>
                                ))}
                            </div>
                            <p className="text-muted text-[10px] uppercase tracking-widest mt-1">Servicios</p>
                        </div>
                    )}
                </div>
            )}

            {/* Lista de citas */}
            {citasJornada.length === 0 ? (
                <div className="card text-center py-12 flex-1 flex flex-col justify-center items-center opacity-70">
                    <p className="text-3xl mb-2">✂️</p>
                    <p className="text-crema font-semibold text-sm">Sin citas</p>
                </div>
            ) : (
                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                    {citasJornada.map((r, idx) => {
                        const serviciosList = r.reserva_servicios?.map(rs => rs.servicios?.nombre).filter(Boolean) || []
                        return (
                            <div key={r.id} className="card p-4 flex flex-col gap-3 relative overflow-hidden group">
                                {/* Barra lateral decorativa */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-oro/30 group-hover:bg-oro transition-colors" />

                                {/* Fila Superior: Turno, Hora, Nombre */}
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-oro/10 flex items-center justify-center text-oro text-xs font-bold shrink-0">
                                        {idx + 1}
                                    </div>
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <span className="text-oro font-bold">{r.hora?.slice(0, 5)}</span>
                                        <span className="font-semibold text-crema truncate">{r.clientes?.nombre}</span>
                                    </div>
                                    {/* Precio en la esquina en modo compacto */}
                                    {compactMode && (
                                        <span className="text-emerald-400 font-semibold text-sm shrink-0">${r.total?.toLocaleString('es-CO')}</span>
                                    )}
                                </div>

                                {/* Fila Medio: Servicios */}
                                <div className="flex gap-1.5 flex-wrap">
                                    {serviciosList.map(s => (
                                        <span key={s} className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${SERVICIO_COLOR[s] || 'bg-[#2D1533] text-muted border-oro/20'}`}>
                                            {!compactMode && <span>{SERVICIO_ICON[s] || '✦'}</span>}
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                {/* Fila Inferior: Botones y detalles (Expandido) */}
                                <div className={`flex items-center gap-2 mt-1 ${compactMode ? 'justify-end' : 'justify-between'}`}>
                                    {!compactMode && (
                                        <div className="flex items-center gap-3 text-xs text-muted">
                                            <span>{r.clientes?.whatsapp}</span>
                                            <span className="text-emerald-400 font-semibold text-sm">${r.total?.toLocaleString('es-CO')}</span>
                                        </div>
                                    )}
                                    <div className="flex gap-2 shrink-0">
                                        <a href={`https://wa.me/${r.clientes?.whatsapp?.replace(/\D/g, '')}`}
                                            target="_blank" rel="noopener noreferrer"
                                            className="text-[10px] px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                                            WhatsApp
                                        </a>
                                        <button onClick={() => pedirConfirmacion('inasistencia', r)}
                                            className="text-[10px] px-2.5 py-1 rounded-md border border-amber-500/20 text-amber-400 hover:bg-amber-500/10 transition-colors">
                                            No asistió
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

// ─── Componente Principal ────────────────────────────────────────────────────
export default function JornadaSection() {
    const hoy = new Date().toISOString().split('T')[0]

    const [fechaCentro, setFechaCentro] = useState(hoy)
    const [diaAmpliado, setDiaAmpliado] = useState(null)

    const fechaAyer = getOffsetDate(fechaCentro, -1)
    const fechaManana = getOffsetDate(fechaCentro, 1)

    return (
        <div className="space-y-6 h-full flex flex-col">
            {/* Controles Globales (solo visibles si no estamos expandidos) */}
            {!diaAmpliado && (
                <div className="flex items-center gap-4 flex-wrap pb-4">
                    <div>
                        <label className="label">Referencia (Hoy)</label>
                        <input type="date" className="input w-auto py-2" value={fechaCentro}
                            onChange={e => setFechaCentro(e.target.value)} />
                    </div>
                    <button onClick={() => setFechaCentro(hoy)}
                        className="mt-6 text-oro text-sm hover:underline transition-colors">
                        Ir al día actual
                    </button>
                </div>
            )}

            {/* Renderizado de columnas */}
            {diaAmpliado ? (
                // VISTA AMPLIADA
                <div className="flex-1 overflow-hidden">
                    <ColumnaDia
                        fecha={diaAmpliado}
                        titulo={diaAmpliado === fechaCentro ? 'Hoy' : diaAmpliado === fechaAyer ? 'Ayer' : diaAmpliado === fechaManana ? 'Mañana' : 'Día Seleccionado'}
                        isExpanded={true}
                        onCollapse={() => setDiaAmpliado(null)}
                    />
                </div>
            ) : (
                // VISTA 3 COLUMNAS
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                    <ColumnaDia
                        fecha={fechaAyer}
                        titulo="Ayer"
                        isExpanded={false}
                        onExpand={setDiaAmpliado}
                    />
                    <ColumnaDia
                        fecha={fechaCentro}
                        titulo="Hoy"
                        isExpanded={false}
                        onExpand={setDiaAmpliado}
                    />
                    <ColumnaDia
                        fecha={fechaManana}
                        titulo="Mañana"
                        isExpanded={false}
                        onExpand={setDiaAmpliado}
                    />
                </div>
            )}
        </div>
    )
}
