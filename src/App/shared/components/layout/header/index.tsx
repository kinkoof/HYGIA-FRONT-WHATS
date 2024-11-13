import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();

    // Função de logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/auth/login');
    };

    // Verifica se o usuário está logado (verifica se existe um token no localStorage)
    const isLoggedIn = !!localStorage.getItem('token');

    // Função de login (navega para a página de login)
    const handleLogin = () => {
        navigate('/auth/login');
    };

    return (
        <Navbar bg="primary" variant="dark" style={{ width: '100%', margin: 0 }}>
            <Container fluid>
                <Navbar.Brand href="/" style={{ fontFamily: 'Poppins, sans-serif' }}>Sauris</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/" style={{ fontFamily: 'Poppins, sans-serif', color: 'white' }}>Home</Nav.Link>
                    <Nav.Link href="/profile" style={{ fontFamily: 'Poppins, sans-serif', color: 'white' }}>Perfil</Nav.Link>
                    {isLoggedIn ? (
                        <Button variant="outline-light" onClick={handleLogout} style={{ fontFamily: 'Poppins, sans-serif', marginLeft: '10px' }}>
                            Logout
                        </Button>
                    ) : (
                        <Button variant="outline-light" onClick={handleLogin} style={{ fontFamily: 'Poppins, sans-serif', marginLeft: '10px' }}>
                            Login
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
