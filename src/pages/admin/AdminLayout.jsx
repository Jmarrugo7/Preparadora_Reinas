import { createContext, useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../services/api'
import { Icon, NAV, ModalConfirmacion } from './adminConstants'

// ─── Context para compartir datos con las sub-páginas ────────────────────────
const AdminContext = createContext(null)
export const useAdmin = () => useContext(AdminContext)

// ─── Layout principal del admin ──────────────────────────────────────────────
export default function AdminLayout() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [sidebarOpen, setSidebar] = useState(true)
    const [reservas, setReservas] = useState([])
    const [stats, setStats] = useState(null)
    const [clientes, setClientes] = useState([])
    const [filtroFecha, setFiltroFecha] = useState('')
    const [filtroEstado, setFiltroEstado] = useState('')
    const [bloqueo, setBloqueo] = useState({ fecha: '', motivo: '' })
    const [mensaje, setMensaje] = useState('')
    const [modalAccion, setModalAccion] = useState(null)

    const cargarReservas = async (filtros = {}) => {
        const data = await api.getReservas(filtros)
        setReservas(data)
    }

    useEffect(() => {
        const init = async () => {
            await Promise.all([
                cargarReservas(),
                api.getEstadisticas().then(setStats),
            ])
        }
        init()
    }, [])

    useEffect(() => {
        const filtros = {}
        if (filtroFecha) filtros.fecha = filtroFecha
        if (filtroEstado) filtros.estado = filtroEstado
        cargarReservas(filtros)
    }, [filtroFecha, filtroEstado])

    useEffect(() => {
        const mapa = {}
        reservas.forEach(r => {
            if (r.clientes && !mapa[r.clientes.id]) mapa[r.clientes.id] = r.clientes
        })
        setClientes(Object.values(mapa))
    }, [reservas])

    const toast = (msg) => { setMensaje(msg); setTimeout(() => setMensaje(''), 3000) }

    const pedirConfirmacion = (tipo, r) => {
        setModalAccion({
            tipo,
            id: r.id,
            nombre: r.clientes?.nombre,
            fecha: r.fecha,
            hora: r.hora?.slice(0, 5),
            servicios: r.reserva_servicios?.map(rs => rs.servicios?.nombre).join(', '),
            total: `$${r.total?.toLocaleString('es-CO')}`,
        })
    }

    const confirmarAccion = async () => {
        const { tipo, id } = modalAccion
        setModalAccion(null)
        try {
            if (tipo === 'cancelar') {
                await api.rechazarReserva(id)
                toast('Reserva cancelada. El cliente fue notificado.')
            } else {
                await api.marcarInasistencia(id)
                toast('Inasistencia registrada correctamente.')
            }
            cargarReservas()
        } catch (e) {
            toast(e.message)
        }
    }

    const handleBloquear = async () => {
        if (!bloqueo.fecha) return
        try {
            await api.bloquearFecha(bloqueo)
            toast('Fecha bloqueada correctamente.')
            setBloqueo({ fecha: '', motivo: '' })
        } catch (e) {
            toast(e.message)
        }
    }

    const handleLogout = () => { logout(); navigate('/admin') }

    // Detectar sección activa desde la URL
    const currentPath = location.pathname.replace('/admin/dashboard', '').replace(/^\//, '')
    const seccionActiva = currentPath || 'dashboard'
    const seccionLabel = NAV.find(n => n.id === seccionActiva)?.label || 'Dashboard'

    // Valor del context que recibirán las sub-páginas
    const contextValue = {
        reservas, stats, clientes,
        filtroFecha, setFiltroFecha,
        filtroEstado, setFiltroEstado,
        bloqueo, setBloqueo,
        cargarReservas, toast,
        pedirConfirmacion, handleBloquear,
    }

    return (
        <AdminContext.Provider value={contextValue}>
            <div className="flex h-screen bg-morado overflow-hidden">

                {/* Modal confirmación */}
                <ModalConfirmacion
                    accion={modalAccion}
                    onConfirmar={confirmarAccion}
                    onCancelar={() => setModalAccion(null)}
                />

                {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
                <aside className={`flex flex-col bg-[#2D1533] border-r border-oro/10 transition-all duration-300 ${sidebarOpen ? 'w-56' : 'w-16'} shrink-0`}>
                    <div className="flex items-center gap-3 px-4 py-5 border-b border-oro/10">
                        <span className="text-oro text-xl shrink-0">✦</span>
                        {sidebarOpen && <span className="font-display font-bold text-sm whitespace-nowrap text-blanco">Barbería Admin</span>}
                    </div>

                    <nav className="flex-1 px-2 py-4 space-y-1">
                        {NAV.map(item => (
                            <Link key={item.id} to={`/admin/dashboard${item.path ? '/' + item.path : ''}`}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${seccionActiva === item.id
                                        ? 'bg-oro/10 text-oro'
                                        : 'text-muted hover:text-crema hover:bg-oro/5'}`}>
                                <span className="shrink-0">{item.icon}</span>
                                {sidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
                            </Link>
                        ))}
                    </nav>

                    <div className="px-2 py-4 border-t border-oro/10">
                        <button onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-red-400 hover:bg-red-500/5 transition-all">
                            <span className="shrink-0">{Icon.logout}</span>
                            {sidebarOpen && <span>Cerrar sesión</span>}
                        </button>
                    </div>
                </aside>

                {/* ── MAIN ─────────────────────────────────────────────────────────── */}
                <div className="flex-1 flex flex-col overflow-hidden">

                    <header className="flex items-center justify-between px-6 py-4 border-b border-oro/10 bg-[#2D1533] shrink-0">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebar(o => !o)} className="text-muted hover:text-crema transition-colors">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="font-display text-lg font-semibold capitalize">
                                {seccionLabel}
                            </h1>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-oro/20 flex items-center justify-center text-oro text-sm font-bold">A</div>
                    </header>

                    {mensaje && (
                        <div className="mx-6 mt-4 bg-oro/10 border border-oro/20 text-oro px-4 py-3 rounded-lg text-sm shrink-0">
                            {mensaje}
                        </div>
                    )}

                    <main className="flex-1 overflow-y-auto px-6 py-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </AdminContext.Provider>
    )
}
