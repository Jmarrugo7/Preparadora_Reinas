import {
    AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { useAdmin } from './AdminLayout'
import { ESTADO_BADGE, CustomTooltip } from './adminConstants'

export default function DashboardSection() {
    const { reservas, clientes } = useAdmin()

    // ── Métricas ─────────────────────────────────────────────────────────────
    const confirmadas = reservas.filter(r => r.estado === 'confirmada').length
    const inasistencias = reservas.filter(r => r.estado === 'inasistencia').length
    const ingresos = reservas.filter(r => r.estado === 'confirmada').reduce((s, r) => s + (r.total || 0), 0)

    const METRICAS = [
        { label: 'Reservas activas', valor: confirmadas, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { label: 'Ingresos totales', valor: `$${ingresos.toLocaleString('es-CO')}`, color: 'text-oro', bg: 'bg-oro/10' },
        { label: 'Clientes únicos', valor: clientes.length, color: 'text-sky-400', bg: 'bg-sky-500/10' },
        { label: 'Inasistencias', valor: inasistencias, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    ]

    // ── Datos gráficas ───────────────────────────────────────────────────────
    const diaHoy = new Date()
    const ultimos7 = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(diaHoy)
        d.setDate(diaHoy.getDate() - (6 - i))
        const key = d.toISOString().split('T')[0]
        const label = d.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric' })
        const count = reservas.filter(r => r.fecha === key && r.estado === 'confirmada').length
        return { label, count }
    })

    const ingresosSemana = Array.from({ length: 4 }, (_, i) => {
        const start = new Date(diaHoy); start.setDate(diaHoy.getDate() - (3 - i) * 7 - 6)
        const end = new Date(diaHoy); end.setDate(diaHoy.getDate() - (3 - i) * 7)
        const total = reservas
            .filter(r => { const f = new Date(r.fecha); return f >= start && f <= end && r.estado === 'confirmada' })
            .reduce((s, r) => s + (r.total || 0), 0)
        return { label: `Sem ${i + 1}`, total }
    })

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {METRICAS.map(({ label, valor, color, bg }) => (
                    <div key={label} className="card">
                        <div className={`inline-flex p-2 rounded-lg ${bg} mb-3`}>
                            <div className={`w-4 h-4 rounded-full ${color.replace('text-', 'bg-')}`} />
                        </div>
                        <p className={`text-2xl font-bold ${color}`}>{valor}</p>
                        <p className="text-muted text-xs mt-1">{label}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="card">
                    <h3 className="font-semibold mb-1">Reservas confirmadas</h3>
                    <p className="text-muted text-xs mb-4">Últimos 7 días</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={ultimos7} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="gradR" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#E8891A" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#E8891A" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                            <XAxis dataKey="label" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="count" stroke="#E8891A" strokeWidth={2} fill="url(#gradR)" dot={{ fill: '#E8891A', r: 3 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="card">
                    <h3 className="font-semibold mb-1">Ingresos estimados</h3>
                    <p className="text-muted text-xs mb-4">Últimas 4 semanas</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={ingresosSemana} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                            <XAxis dataKey="label" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip prefix="$" />} />
                            <Bar dataKey="total" fill="#E8891A" radius={[4, 4, 0, 0]} opacity={0.85} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Últimas reservas</h3>
                </div>
                <div className="space-y-3">
                    {reservas.slice(0, 5).map(r => (
                        <div key={r.id} className="flex items-center justify-between py-2 border-b border-oro/10 last:border-0">
                            <div>
                                <p className="text-sm font-medium">{r.clientes?.nombre}</p>
                                <p className="text-xs text-muted">{r.fecha} · {r.hora?.slice(0, 5)}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${ESTADO_BADGE[r.estado]}`}>{r.estado}</span>
                                <span className="text-oro text-sm font-semibold">${r.total?.toLocaleString('es-CO')}</span>
                            </div>
                        </div>
                    ))}
                    {reservas.length === 0 && <p className="text-muted text-sm text-center py-4">Sin reservas aún.</p>}
                </div>
            </div>
        </div>
    )
}
