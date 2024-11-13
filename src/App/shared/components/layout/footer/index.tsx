import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <Container className="text-center">
                <p className="mb-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    &copy; 2024 Sauris. Todos os direitos reservados.
                </p>
                <p className="mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Feito com ❤️ pela equipe Sauris.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
