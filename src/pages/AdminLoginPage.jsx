import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

export default function AdminLoginPage() {
    const [form, setForm] = useState({ usuario: '', password: '' })
    const [error, setError] = useState('')
    const [cargando, setCargando] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async () => {
        setError('')
        if (!form.usuario || !form.password) return setError('Completa todos los campos.')
        setCargando(true)
        try {
            const { token } = await api.login(form)
            login(token)
            navigate('/admin/dashboard')
        } catch (e) {
            setError(e.message)
        } finally {
            setCargando(false)
        }
    }

    return (
        <div className="min-h-screen bg-morado flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <span className="text-oro text-4xl">✦</span>
                    <h1 className="font-display text-3xl font-bold mt-2 text-blanco">Panel Admin</h1>
                    <p className="text-muted text-sm mt-1">Acceso exclusivo para administradores</p>
                </div>

                <div className="card space-y-4">
                    <div>
                        <label className="label">Usuario</label>
                        <input className="input" placeholder="admin" value={form.usuario}
                            onChange={e => setForm(f => ({ ...f, usuario: e.target.value }))}
                            onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                    </div>
                    <div>
                        <label className="label">Contraseña</label>
                        <input className="input" type="password" placeholder="••••••••" value={form.password}
                            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                            onKeyDown={e => e.key === 'Enter' && handleLogin()} />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm bg-red-400/10 px-3 py-2 rounded-lg">{error}</p>
                    )}

                    <button onClick={handleLogin} disabled={cargando} className="btn-primary w-full disabled:opacity-50">
                        {cargando ? 'Verificando...' : 'Ingresar'}
                    </button>
                </div>
            </div>
        </div>
    )
}