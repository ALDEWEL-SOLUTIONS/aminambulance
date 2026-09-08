import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AdminLayout from "@/components/layout/AdminLayout"
import DashboardPage from "@/pages/DashboardPage"
import OrdersPage from "@/pages/OrdersPage"
import NewOrderPage from "@/pages/NewOrderPage"
import AmbulancesPage from "@/pages/AmbulancesPage"
import AuditPage from "@/pages/AuditPage"
import CrewPage from "@/pages/CrewPage"
import IncidentsPage from "@/pages/IncidentsPage"
import NotificationsPage from "@/pages/NotificationsPage"
import PaymentsPage from "@/pages/PaymentsPage"
import PayoutsPage from "@/pages/PayoutsPage"
import PricingPage from "@/pages/PricingPage"
import ProvidersPage from "@/pages/ProvidersPage"
import ReportsPage from "@/pages/ReportsPage"
import SettingsPage from "@/pages/SettingsPage"
import SystemHealthPage from "@/pages/SystemHealthPage"
import UsersPage from "@/pages/UsersPage"
import VerificationPage from "@/pages/VerificationPage"
import LoginPage from "@/pages/LoginPage"
import ProtectedRoute from "@/components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route — always first */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes — require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/ambulances" element={<AmbulancesPage />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/crew" element={<CrewPage />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/payouts" element={<PayoutsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/providers" element={<ProvidersPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/system-health" element={<SystemHealthPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/verification" element={<VerificationPage />} />
          </Route>
        </Route>

        {/* Catch-all → login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
