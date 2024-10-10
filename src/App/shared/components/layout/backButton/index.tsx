import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

// Definindo a interface para aceitar o 'children'
interface BackButtonLayoutProps {
    children: ReactNode;
}

const BackButtonLayout: React.FC<BackButtonLayoutProps> = ({ children }) => {
    const navigate = useNavigate();

    // Função para voltar à página anterior
    const handleBack = () => {
        navigate(-1); // Volta para a página anterior
    };

    return (
        <div className="back-button-layout">
            <Container className="d-flex justify-content-end pt-3">
                <Button variant="secondary" onClick={handleBack}>
                    Voltar
                </Button>
            </Container>
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default BackButtonLayout;
