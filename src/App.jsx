import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import HomePage from './pages/HomePage'
import ReservaPage from './pages/ReservaPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminLayout from './pages/admin/AdminLayout'
import DashboardSection from './pages/admin/DashboardSection'
import JornadaSection from './pages/admin/JornadaSection'
import ReservasSection from './pages/admin/ReservasSection'
import ClientesSection from './pages/admin/ClientesSection'
import FechasSection from './pages/admin/FechasSection'
import ReportesSection from './pages/admin/ReportesSection'

function ProtectedRoute({ children }) {
    const { isAdmin } = useAuth()
    return isAdmin ? children : <Navigate to="/admin" replace />
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/reservar" element={<ReservaPage />} />
                    <Route path="/admin" element={<AdminLoginPage />} />
                    <Route path="/admin/dashboard" element={
                        <ProtectedRoute><AdminLayout /></ProtectedRoute>
                    }>
                        <Route index element={<DashboardSection />} />
                        <Route path="jornada" element={<JornadaSection />} />
                        <Route path="reservas" element={<ReservasSection />} />
                        <Route path="clientes" element={<ClientesSection />} />
                        <Route path="fechas" element={<FechasSection />} />
                        <Route path="reportes" element={<ReportesSection />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}