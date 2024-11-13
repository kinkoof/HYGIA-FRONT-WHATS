import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();

    // Função de logout
    const handleLogout = () => {
        // Remove o token e outros dados do localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        // Redireciona o usuário para a página de login
        navigate('/auth/login');
    };

    // Verifica se o usuário está logado (verifica se existe um token no localStorage)
    const isLoggedIn = !!localStorage.getItem('token');

    // Função de login (navega para a página de login)
    const handleLogin = () => {
        navigate('/auth/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Sauris</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/profile">Perfil</Nav.Link>
                    </Nav>
                    {/* Exibe o botão de Logout se o usuário estiver logado, senão exibe o botão de Login */}
                    {isLoggedIn ? (
                        <Button variant="outline-light" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <Button variant="outline-light" onClick={handleLogin}>
                            Login
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
