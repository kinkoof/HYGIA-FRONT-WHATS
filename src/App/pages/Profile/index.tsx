import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const navigate = useNavigate();

    const handleAddProducts = () => {
        navigate('add');
    };

    const handleEditProfile = () => {
        navigate('edit');
    };

    const handleEditProducts = () => {
        navigate('products');
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Perfil da Farmácia</h1>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <h3 className="text-center mb-3">Gerenciamento de Farmácia</h3>

                        <div className="d-grid gap-3">
                            {/* Botão para adicionar produtos */}
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={handleAddProducts}
                            >
                                Adicionar Produtos à Venda
                            </button>

                            {/* Botão para editar perfil */}
                            <button
                                className="btn btn-secondary btn-lg"
                                onClick={handleEditProfile}
                            >
                                Editar Perfil
                            </button>

                            {/* Botão para editar produtos */}
                            <button
                                className="btn btn-warning btn-lg"
                                onClick={handleEditProducts}
                            >
                                Editar Produtos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
