import { useAdmin } from './AdminLayout'

export default function FechasSection() {
    const { bloqueo, setBloqueo, handleBloquear } = useAdmin()

    return (
        <div className="max-w-md space-y-6">
            <div className="card">
                <h3 className="font-semibold mb-1">Bloquear fecha</h3>
                <p className="text-muted text-sm mb-4">
                    Los clientes no podrán agendar citas en días bloqueados.
                </p>
                <div className="space-y-4">
                    <div>
                        <label className="label">Fecha</label>
                        <input
                            type="date"
                            className="input"
                            value={bloqueo.fecha}
                            onChange={e =>
                                setBloqueo(b => ({ ...b, fecha: e.target.value }))
                            }
                        />
                    </div>
                    <div>
                        <label className="label">Hora inicio</label>
                        <input
                            type="time"
                            className="input"
                            value={bloqueo.hora_inicio}
                            onChange={e =>
                                setBloqueo(b => ({ ...b, hora_inicio: e.target.value }))
                            }
                        />
                    </div>
                    <div>
                        <label className="label">Hora fin</label>
                        <input
                            type="time"
                            className="input"
                            value={bloqueo.hora_fin}
                            onChange={e =>
                                setBloqueo(b => ({ ...b, hora_fin: e.target.value }))
                            }
                        />
                    </div>
                    <div>
                        <label className="label">Motivo (opcional)</label>
                        <input
                            className="input"
                            placeholder="Ej: Vacaciones, festivo..."
                            value={bloqueo.motivo}
                            onChange={e =>
                                setBloqueo(b => ({ ...b, motivo: e.target.value }))
                            }
                        />
                    </div>
                    <button onClick={handleBloquear} className="btn-primary w-full">
                        Bloquear fecha
                    </button>
                </div>
            </div>

            <div className="card">
                <h3 className="font-semibold mb-3">Reglas de horario</h3>
                <div className="space-y-2 text-sm text-muted">
                    <p>
                        • Los <span className="text-crema">martes</span> están cerrados por
                        defecto.
                    </p>
                    <p>
                        • El horario de <span className="text-crema">12:00 – 1:00 PM</span> está
                        bloqueado (almuerzo).
                    </p>
                    <p>
                        • Horario de atención: <span className="text-crema">9 AM – 7 PM</span>,
                        Lun–Sáb.
                    </p>
                </div>
            </div>
        </div>
    )
}
