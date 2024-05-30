import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.jsx';

const Autenticado = ({ children }) => {
    const { signed } = useContext(AuthContext);

    return signed ? children : <Navigate to="/login" />;
};

export default Autenticado;
