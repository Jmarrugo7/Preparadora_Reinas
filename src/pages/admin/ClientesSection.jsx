import { useAdmin } from './AdminLayout'

export default function ClientesSection() {
    const { reservas, clientes } = useAdmin()

    return (
        <div className="space-y-3">
            <p className="text-muted text-sm mb-4">{clientes.length} clientes registrados</p>
            {clientes.length === 0
                ? <p className="text-muted text-center py-16">Sin clientes aún.</p>
                : clientes.map(c => {
                    const citas = reservas.filter(r => r.clientes?.id === c.id)
                    const gasto = citas.filter(r => r.estado === 'confirmada').reduce((s, r) => s + (r.total || 0), 0)
                    return (
                        <div key={c.id} className="card flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-oro/20 flex items-center justify-center text-oro font-bold shrink-0">
                                {c.nombre?.[0]?.toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold">{c.nombre}</p>
                                <p className="text-muted text-sm">{c.email} · {c.whatsapp}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-oro font-bold">${gasto.toLocaleString('es-CO')}</p>
                                <p className="text-muted text-xs">{citas.length} {citas.length === 1 ? 'cita' : 'citas'}</p>
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}
