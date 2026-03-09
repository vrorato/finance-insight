import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import AuthPage from './pages/auth'
import UploadPage from './pages/upload'
import DashboardPage from './pages/dashboard'

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="finance-theme">
            <Router>
                <Routes>
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/" element={<Navigate to="/auth" replace />} />
                </Routes>
            </Router>
        </ThemeProvider>
    )
}

export default App
