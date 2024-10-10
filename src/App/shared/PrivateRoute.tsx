import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente para proteger rotas
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = localStorage.getItem('token'); // Verifica se o token está armazenado no localStorage

    // Se o usuário não estiver autenticado, redireciona para a página de login
    return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
