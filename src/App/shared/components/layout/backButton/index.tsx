import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

// Definindo a interface para aceitar o 'children'
interface BackButtonLayoutProps {
    children: ReactNode;
}

const BackButtonLayout: React.FC<BackButtonLayoutProps> = ({ children }) => {

    return (
            <div className="content">
                {children}
            </div>
    );
};

export default BackButtonLayout;
