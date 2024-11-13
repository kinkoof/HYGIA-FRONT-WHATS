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
    customerName: string;
    date: string;
    status: string;
    items: Item[]; // Itens do pedido
}

const OrderList = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);

    const pharmacyId = localStorage.getItem('userId');

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
                            <th>Cliente</th>
                            <th>Data do Pedido</th>
                            <th>Status</th>
                            <th>Itens</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customerName}</td>
                                <td>{order.date}</td>
                                <td>{order.status}</td>
                                {/* Exibindo os itens do pedido */}
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
                                    <button className="btn btn-info btn-sm me-2">Ver Detalhes</button>
                                    <button className="btn btn-warning btn-sm">Gerenciar</button>
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
