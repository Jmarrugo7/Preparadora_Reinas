import { useAdmin } from './AdminLayout'
import { ESTADO_BADGE } from './adminConstants'

export default function ReservasSection() {
    const { reservas, filtroFecha, setFiltroFecha, filtroEstado, setFiltroEstado, pedirConfirmacion } = useAdmin()

    return (
        <div className="space-y-4">
            <div className="flex gap-3 flex-wrap">
                <input type="date" className="input w-auto" value={filtroFecha}
                    onChange={e => setFiltroFecha(e.target.value)} />
                <select className="input w-auto" value={filtroEstado}
                    onChange={e => setFiltroEstado(e.target.value)}>
                    <option value="">Todos los estados</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="cancelada">Cancelada</option>
                    <option value="inasistencia">Inasistencia</option>
                </select>
                {(filtroFecha || filtroEstado) && (
                    <button onClick={() => { setFiltroFecha(''); setFiltroEstado('') }}
                        className="text-muted hover:text-crema text-sm transition-colors">Limpiar</button>
                )}
            </div>

            <div className="space-y-3">
                {reservas.length === 0
                    ? <p className="text-muted text-center py-16">No hay reservas.</p>
                    : reservas.map(r => (
                        <div key={r.id} className="card flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-semibold">{r.clientes?.nombre}</p>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${ESTADO_BADGE[r.estado]}`}>{r.estado}</span>
                                </div>
                                <p className="text-muted text-sm">{r.clientes?.email} · {r.clientes?.whatsapp}</p>
                                <p className="text-sm mt-1">
                                    <span className="text-oro font-semibold">{r.fecha}</span>
                                    <span className="text-muted"> a las </span>
                                    <span className="font-semibold">{r.hora?.slice(0, 5)}</span>
                                    <span className="text-muted"> · </span>
                                    <span>{r.reserva_servicios?.map(rs => rs.servicios?.nombre).join(', ')}</span>
                                </p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-oro font-bold mb-2">${r.total?.toLocaleString('es-CO')}</p>
                                {r.estado === 'confirmada' && (
                                    <div className="flex gap-2 justify-end">
                                        <button onClick={() => pedirConfirmacion('cancelar', r)}
                                            className="text-xs px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors">
                                            Cancelar
                                        </button>
                                        <button onClick={() => pedirConfirmacion('inasistencia', r)}
                                            className="text-xs px-3 py-1.5 rounded-lg border border-amber-500/20 text-amber-400 hover:bg-amber-500/10 transition-colors">
                                            Inasistencia
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
