const BASE = '/api'

async function request(path, options = {}) {
    const token = localStorage.getItem('admin_token')
    const headers = { 'Content-Type': 'application/json', ...options.headers }
    if (token) headers['Authorization'] = `Bearer ${token}`

    const res = await fetch(`${BASE}${path}`, { ...options, headers })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Error en la solicitud')
    return data
}

export const api = {
    // Servicios
    getServicios: () => request('/servicios'),

    // Clientes
    registrarCliente: (body) => request('/clientes', { method: 'POST', body: JSON.stringify(body) }),

    // Reservas
    getDisponibilidad: (fecha) => request(`/reservas/disponibilidad?fecha=${fecha}`),
    crearReserva: (body) => request('/reservas', { method: 'POST', body: JSON.stringify(body) }),

    // Auth
    login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),

    // Admin
    getReservas: (filtros = {}) => {
        const params = new URLSearchParams(filtros).toString()
        return request(`/admin/reservas${params ? '?' + params : ''}`)
    },
    rechazarReserva: (id) => request(`/admin/reservas/${id}/rechazar`, { method: 'PATCH' }),
    marcarInasistencia: (id) => request(`/admin/reservas/${id}/inasistencia`, { method: 'PATCH' }),
    bloquearFecha: (body) => request('/admin/bloquear', { method: 'POST', body: JSON.stringify(body) }),
    getEstadisticas: () => request('/admin/estadisticas'),
}