import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Definindo a interface para um item do pedido
interface Item {
    name: string;
    price: string;
    quantity: number;
    productId: number;
}

// Definindo a interface para um pedido
interface Order {
    id: number;
    created_at: string;
    status: string;
    address: string;
    items: Item[];
}

const OrderList = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);
    const pharmacyId = localStorage.getItem('userId');

    const handleAcceptOrder = async (orderId: number) => {
        try {
            // Requisição para aceitar o pedido
            const response = await fetch(`https://hygia-api-whats.onrender.com/auth/accept/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, pharmacyId }) // Garante que `pharmacyId` esteja sendo passado
            });

            // Verifique se a resposta está OK
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // Atualiza o estado do pedido na lista
                    setOrders(orders.map(order =>
                        order.id === orderId ? { ...order, status: 'a' } : order
                    ));
                    alert('Pedido aceito com sucesso!');
                } else {
                    // Se a resposta foi OK mas sem sucesso, mostre a mensagem de erro
                    setError(data.message || 'Erro desconhecido ao aceitar o pedido.');
                }
            } else {
                // Se a resposta HTTP não for ok, tente capturar a mensagem do erro
                const data = await response.json();
                setError(data.message || 'Erro ao processar a aceitação do pedido.');
            }
        } catch (err) {
            // Captura erro em caso de falha na requisição ou problemas de rede
            console.error('Erro no processo de aceitação do pedido:', err);
            setError('Erro ao processar a aceitação do pedido.');
        }
    };

    const handleDenyOrder = async (orderId: number) => {
        try {
            // Requisição para recusar o pedido
            const response = await fetch(`https://hygia-api-whats.onrender.com/auth/deny/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, pharmacyId }) // Garante que `pharmacyId` esteja sendo passado
            });

            // Verifique se a resposta está OK
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // Atualiza o estado do pedido na lista
                    setOrders(orders.map(order =>
                        order.id === orderId ? { ...order, status: 'x' } : order
                    ));
                    alert('Pedido recusado com sucesso!');
                } else {
                    // Se a resposta foi OK mas sem sucesso, mostre a mensagem de erro
                    setError(data.message || 'Erro desconhecido ao recusar o pedido.');
                }
            } else {
                // Se a resposta HTTP não for ok, tente capturar a mensagem do erro
                const data = await response.json();
                setError(data.message || 'Erro ao processar a recusa do pedido.');
            }
        } catch (err) {
            // Captura erro em caso de falha na requisição ou problemas de rede
            console.error('Erro no processo de recusa do pedido:', err);
            setError('Erro ao processar a recusa do pedido.');
        }
    };


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`https://hygia-api-whats.onrender.com/auth/orders?userId=${pharmacyId}`);
                const data = await response.json();
                if (response.ok) {
                    setOrders(data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Erro ao carregar os pedidos.');
            }
        };

        fetchOrders();
    }, [pharmacyId]);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ color: "#00796b" }}>Lista de Pedidos</h2>
            <div className="card shadow" style={{ backgroundColor: "#e0f7f4", borderRadius: "12px", padding: "1rem" }}>
                {error && <div className="alert alert-danger">{error}</div>}
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data do Pedido</th>
                            <th>Status</th>
                            <th>Endereço</th>
                            <th>Itens</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.created_at}</td>
                                <td>{order.status}</td>
                                <td>{order.address}</td>
                                <td>
                                    <ul>
                                        {order.items.map((item, index) => (
                                            <li key={index}>
                                                <strong>{item.name}</strong> (Quantidade: {item.quantity}) - Preço: {item.price}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    {order.status === 'w' && ( // Condição para exibir os botões apenas quando status for 'w'
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleAcceptOrder(order.id)}
                                            >
                                                Aceitar
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                            onClick={() => handleDenyOrder(order.id)}
                                            >
                                                Recusar
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;
