import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center">
            <Container>
                <p className="mb-0">&copy; 2024 Minha Aplicação. Todos os direitos reservados.</p>
            </Container>
        </footer>
    );
};

export default Footer;
