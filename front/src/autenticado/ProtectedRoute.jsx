import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.jsx'

const ProtectedRoute = ({ children, redirectTo }) => {
    const { signed, loading } = useContext(AuthContext)

    if (loading) {
        // Pode retornar um spinner ou qualquer componente de carregamento
        return <div>Loading...</div>
    }

    return signed ? <Navigate to={redirectTo} /> : children
}

export default ProtectedRoute