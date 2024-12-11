import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaBoxOpen } from 'react-icons/fa';
import OrderList from '../../shared/components/orderlist';

export const Profile = () => {
    const navigate = useNavigate();
    const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const handleUpdateDeliveryFee = async () => {
        if (deliveryFee !== null) {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                alert('User ID não encontrado!');
                return;
            }

            try {
                const response = await fetch('https://hygia-api-whats.onrender.com/auth/edit/delivery/fee?userId=' + userId, { // Passando o userId na query string
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ deliveryFee }),
                });

                if (response.ok) {
                    alert('Taxa de entrega atualizada com sucesso!');
                } else {
                    alert('Erro ao atualizar a taxa de entrega');
                }
            } catch (error) {
                console.error('Erro ao atualizar a taxa de entrega:', error);
            }
        }
    };

    const handleAddProducts = () => {
        navigate('add');
    };

    const handleEditProfile = () => {
        navigate('edit');
    };

    const handleEditProducts = () => {
        navigate('products');
    };

    useEffect(() => {
        const fetchDeliveryFee = async () => {
            const userId = localStorage.getItem('userId'); // Ou a forma correta de pegar o userId
            if (!userId) {
                console.error('User ID não encontrado');
                return;
            }

            try {
                const response = await fetch(`https://hygia-api-whats.onrender.com/auth/delivery/fee?userId=${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setDeliveryFee(data.deliveryFee);
                } else {
                    console.error('Erro ao carregar a taxa de entrega');
                }
            } catch (error) {
                console.error('Erro ao carregar a taxa de entrega:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveryFee();
    }, []); // Esse useEffect será executado apenas uma vez ao carregar o componente.


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

                    {/* Card para exibir e alterar a taxa de entrega */}
                    <div className="col-md-4">
                        <div
                            className="card p-4 shadow"
                            style={{
                                backgroundColor: "#e0f7f4",
                                borderRadius: "12px",
                                borderColor: "#00796b",
                            }}
                        >
                            <h3 className="text-center mb-3" style={{ color: "#004d40" }}>Taxa de Entrega</h3>
                            {loading ? (
                                <div>Carregando...</div>
                            ) : (
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="deliveryFee" className="form-label">Taxa de entrega</label>
                                        <input
                                            type="number"
                                            id="deliveryFee"
                                            className="form-control"
                                            value={deliveryFee || ''}
                                            onChange={(e) => setDeliveryFee(Number(e.target.value))}
                                            min="0"
                                        />
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleUpdateDeliveryFee}
                                        style={{
                                            width: "100%" ,
                                            backgroundColor: "#80cbc4",
                                            color: "#004d40",
                                            border: "none",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        Alterar
                                    </button>
                                </div>
                            )}
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
