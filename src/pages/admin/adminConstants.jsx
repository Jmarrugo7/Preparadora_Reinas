import {
    AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

// ─── Iconos SVG inline ───────────────────────────────────────────────────────
export const Icon = {
    dashboard: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
            <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
    ),
    jornada: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
            <circle cx="12" cy="12" r="9" /><path d="M12 6v6l3 3" />
        </svg>
    ),
    reservas: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
            <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
    ),
    clientes: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
            <circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
            <path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.87" />
        </svg>
    ),
    fechas: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
            <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
        </svg>
    ),
    reportes: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
            <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
    ),
    logout: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
    ),
    scissors: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
            <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
        </svg>
    ),
}

// Emoji/icono por servicio
export const SERVICIO_ICON = { Corte: '✂️', Barba: '🪒', Cejas: '✦' }
export const SERVICIO_COLOR = {
    Corte: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
    Barba: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
    Cejas: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
}

export const ESTADO_BADGE = {
    confirmada: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    cancelada: 'bg-red-500/10 text-red-400 border border-red-500/20',
    inasistencia: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
}

export const NAV = [
    { id: 'dashboard', label: 'Dashboard', icon: Icon.dashboard, path: '' },
    { id: 'jornada', label: 'Mi Jornada', icon: Icon.jornada, path: 'jornada' },
    { id: 'reservas', label: 'Reservas', icon: Icon.reservas, path: 'reservas' },
    { id: 'clientes', label: 'Clientes', icon: Icon.clientes, path: 'clientes' },
    { id: 'fechas', label: 'Fechas', icon: Icon.fechas, path: 'fechas' },
    { id: 'reportes', label: 'Reportes', icon: Icon.reportes, path: 'reportes' },
]

export const CustomTooltip = ({ active, payload, label, prefix = '' }) => {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-[#1a1f2e] border border-oro/20 rounded-lg px-3 py-2 text-sm shadow-xl">
            <p className="text-muted mb-1">{label}</p>
            <p className="text-oro font-semibold">{prefix}{payload[0].value?.toLocaleString('es-CO')}</p>
        </div>
    )
}

// ─── Modal de confirmación ───────────────────────────────────────────────────
export function ModalConfirmacion({ accion, onConfirmar, onCancelar }) {
    if (!accion) return null

    const esCancelacion = accion.tipo === 'cancelar'
    const config = esCancelacion
        ? {
            titulo: 'Cancelar reserva',
            descripcion: `¿Estás seguro de que deseas cancelar la cita de`,
            detalle: 'Esta acción notificará al cliente por correo electrónico.',
            btnLabel: 'Sí, cancelar reserva',
            btnClass: 'bg-red-500 hover:bg-red-600 text-white',
            iconoBg: 'bg-red-500/10',
            iconoColor: 'text-red-400',
            icono: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                    <circle cx="12" cy="12" r="9" /><path d="M15 9l-6 6M9 9l6 6" />
                </svg>
            ),
        }
        : {
            titulo: 'Registrar inasistencia',
            descripcion: `¿Confirmas que el cliente`,
            detalle: 'Se registrará como inasistencia en el historial del cliente.',
            btnLabel: 'Sí, marcar inasistencia',
            btnClass: 'bg-amber-500 hover:bg-amber-600 text-negro',
            iconoBg: 'bg-amber-500/10',
            iconoColor: 'text-amber-400',
            icono: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                    <path d="M12 9v4M12 17h.01" /><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
            ),
        }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-morado/80 backdrop-blur-sm" onClick={onCancelar} />

            {/* Modal */}
            <div className="relative bg-[#2D1533] border border-oro/20 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                {/* Icono */}
                <div className={`inline-flex p-3 rounded-xl ${config.iconoBg} ${config.iconoColor} mb-4`}>
                    {config.icono}
                </div>

                <h3 className="font-display text-xl font-bold mb-2">{config.titulo}</h3>

                <p className="text-muted text-sm leading-relaxed mb-1">
                    {config.descripcion}{' '}
                    <span className="text-crema font-semibold">{accion.nombre}</span>
                    {esCancelacion ? '?' : ' no asistió a su cita?'}
                </p>

                {/* Detalle de la cita */}
                <div className="bg-morado/50 rounded-lg px-4 py-3 my-4 text-sm space-y-1">
                    <div className="flex justify-between">
                        <span className="text-muted">Fecha</span>
                        <span className="font-medium">{accion.fecha}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted">Hora</span>
                        <span className="font-medium">{accion.hora}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted">Servicios</span>
                        <span className="font-medium">{accion.servicios}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted">Total</span>
                        <span className="font-medium text-oro">{accion.total}</span>
                    </div>
                </div>

                <p className="text-muted text-xs mb-6">{config.detalle}</p>

                <div className="flex gap-3">
                    <button onClick={onCancelar}
                        className="flex-1 btn-secondary text-sm py-2.5">
                        Volver
                    </button>
                    <button onClick={onConfirmar}
                        className={`flex-1 font-semibold px-4 py-2.5 rounded-lg transition-all text-sm ${config.btnClass}`}>
                        {config.btnLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}
