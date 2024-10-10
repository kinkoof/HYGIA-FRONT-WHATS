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

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Minha Aplicação</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/products">Produtos</Nav.Link>
                        <Nav.Link href="/profile">Perfil</Nav.Link>
                    </Nav>
                    {/* Adiciona o botão de Logout */}
                    <Button variant="outline-light" onClick={handleLogout}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
