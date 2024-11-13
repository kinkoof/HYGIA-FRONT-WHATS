import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaBoxOpen } from 'react-icons/fa';
import OrderList from '../../shared/components/orderlist';

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
        <>
            <div className="container mt-5">
                <h1 className="text-center mb-4" style={{ color: "#00796b" }}>Perfil da Farmácia</h1>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div
                            className="card p-4 shadow"
                            style={{
                                backgroundColor: "#e0f7f4",
                                borderRadius: "12px",
                                borderColor: "#00796b",
                            }}
                        >
                            <h3 className="text-center mb-3" style={{ color: "#004d40" }}>Gerenciamento de Farmácia</h3>

                            <div className="d-grid gap-3">
                                {/* Botão para adicionar produtos */}
                                <button
                                    className="btn btn-lg"
                                    onClick={handleAddProducts}
                                    style={{
                                        backgroundColor: "#00796b",
                                        color: "#ffffff",
                                        border: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <FaPlus /> Adicionar Produtos à Venda
                                </button>

                                {/* Botão para editar perfil */}
                                <button
                                    className="btn btn-lg"
                                    onClick={handleEditProfile}
                                    style={{
                                        backgroundColor: "#004d40",
                                        color: "#ffffff",
                                        border: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <FaEdit /> Editar Perfil
                                </button>

                                {/* Botão para editar produtos */}
                                <button
                                    className="btn btn-lg"
                                    onClick={handleEditProducts}
                                    style={{
                                        backgroundColor: "#80cbc4",
                                        color: "#004d40",
                                        border: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <FaBoxOpen /> Editar Produtos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <OrderList />
            </div>
        </>
    );
};
