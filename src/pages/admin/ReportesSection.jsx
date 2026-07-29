import { useAdmin } from './AdminLayout'
import { SERVICIO_ICON } from './adminConstants'

export default function ReportesSection() {
    const { reservas, stats } = useAdmin()

    const confirmadas = reservas.filter(r => r.estado === 'confirmada').length
    const canceladas = reservas.filter(r => r.estado === 'cancelada').length
    const inasistencias = reservas.filter(r => r.estado === 'inasistencia').length

    if (!stats) return <p className="text-muted text-sm">Cargando estadísticas...</p>

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total reservas', valor: stats.totalReservas, color: 'text-crema' },
                    { label: 'Ingresos estimados', valor: `$${stats.ingresos_estimados?.toLocaleString('es-CO')}`, color: 'text-oro' },
                    { label: 'Inasistencias', valor: stats.inasistencias, color: 'text-amber-400' },
                    { label: 'Canceladas', valor: canceladas, color: 'text-red-400' },
                ].map(({ label, valor, color }) => (
                    <div key={label} className="card text-center">
                        <p className={`text-3xl font-bold ${color}`}>{valor}</p>
                        <p className="text-muted text-xs mt-1">{label}</p>
                    </div>
                ))}
            </div>

            <div className="card">
                <h3 className="font-semibold mb-4">Servicios más solicitados</h3>
                <div className="space-y-4">
                    {stats.serviciosMasSolicitados?.map((s, i) => (
                        <div key={s.nombre} className="flex items-center gap-4">
                            <span className="text-muted text-sm w-4">{i + 1}</span>
                            <span className="text-lg">{SERVICIO_ICON[s.nombre] || '✦'}</span>
                            <span className="font-medium w-16 text-sm">{s.nombre}</span>
                            <div className="flex-1 bg-morado rounded-full h-2">
                                <div className="bg-oro h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(s.cantidad / (stats.totalReservas || 1)) * 100}%` }} />
                            </div>
                            <span className="text-muted text-sm w-6 text-right">{s.cantidad}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card">
                <h3 className="font-semibold mb-4">Tasa de cumplimiento</h3>
                {stats.totalReservas > 0 ? (
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-4xl font-bold text-emerald-400">
                                {Math.round((confirmadas / stats.totalReservas) * 100)}%
                            </p>
                            <p className="text-muted text-xs mt-1">Asistencia</p>
                        </div>
                        <div className="flex-1 space-y-2">
                            {[
                                { label: 'Confirmadas', val: confirmadas, color: 'bg-emerald-400' },
                                { label: 'Canceladas', val: canceladas, color: 'bg-red-400' },
                                { label: 'Inasistencias', val: inasistencias, color: 'bg-amber-400' },
                            ].map(({ label, val, color }) => (
                                <div key={label} className="flex items-center gap-3 text-sm">
                                    <div className={`w-2 h-2 rounded-full ${color} shrink-0`} />
                                    <span className="text-muted w-24">{label}</span>
                                    <div className="flex-1 bg-morado rounded-full h-1.5">
                                        <div className={`${color} h-1.5 rounded-full`}
                                            style={{ width: `${(val / stats.totalReservas) * 100}%` }} />
                                    </div>
                                    <span className="w-6 text-right text-muted">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-muted text-sm">Sin datos suficientes.</p>
                )}
            </div>
        </div>
    )
}
