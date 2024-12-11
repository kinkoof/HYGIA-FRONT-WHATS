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

// Componente de lista de pedidos
const OrderList = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'delivery'>('pending');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const pharmacyId = localStorage.getItem('userId');
    const ordersPerPage = 5; // Limite de pedidos por página

    const fetchOrders = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://hygia-api-whats.onrender.com/auth/orders?userId=${pharmacyId}&page=${page}&limit=${ordersPerPage}`
            );
            const data = await response.json();
            if (response.ok) {
                setOrders(data.orders);
                setTotalPages(data.totalPages);
            } else {
                setError(data.message || 'Erro ao carregar os pedidos.');
            }
        } catch (err) {
            setError('Erro ao carregar os pedidos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage, pharmacyId]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleAcceptOrder = async (orderId: number) => {
        try {
            const response = await fetch(`https://hygia-api-whats.onrender.com/auth/accept/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, pharmacyId })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setOrders(orders.map(order =>
                        order.id === orderId ? { ...order, status: 'a' } : order
                    ));
                    alert('Pedido aceito com sucesso!');
                } else {
                    setError(data.message || 'Erro desconhecido ao aceitar o pedido.');
                }
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao processar a aceitação do pedido.');
            }
        } catch (err) {
            console.error('Erro no processo de aceitação do pedido:', err);
            setError('Erro ao processar a aceitação do pedido.');
        }
    };

    const handleDenyOrder = async (orderId: number) => {
        try {
            const response = await fetch(`https://hygia-api-whats.onrender.com/auth/deny/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, pharmacyId })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setOrders(orders.map(order =>
                        order.id === orderId ? { ...order, status: 'x' } : order
                    ));
                    alert('Pedido recusado com sucesso!');
                } else {
                    setError(data.message || 'Erro desconhecido ao recusar o pedido.');
                }
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao processar a recusa do pedido.');
            }
        } catch (err) {
            console.error('Erro no processo de recusa do pedido:', err);
            setError('Erro ao processar a recusa do pedido.');
        }
    };

    const handleDeliveryOrder = async (orderId: number) => {
        try {
            const response = await fetch(`https://hygia-api-whats.onrender.com/auth/delivery/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, pharmacyId })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setOrders(orders.map(order =>
                        order.id === orderId ? { ...order, status: 'd' } : order
                    ));
                    alert('Pedido enviado com sucesso!');
                } else {
                    setError(data.message || 'Erro desconhecido ao enviar o pedido.');
                }
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao processar o envio do pedido.');
            }
        } catch (err) {
            console.error('Erro no processo de envio do pedido:', err);
            setError('Erro ao processar o envio do pedido.');
        }
    };

    const handleFinishOrder = async (orderId: number) => {
        try {
            const response = await fetch(`https://hygia-api-whats.onrender.com/auth/finish/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, pharmacyId })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setOrders(orders.map(order =>
                        order.id === orderId ? { ...order, status: 'f' } : order
                    ));
                    alert('Pedido finalisado com sucesso!');
                } else {
                    setError(data.message || 'Erro desconhecido ao enviar o pedido.');
                }
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao processar o envio do pedido.');
            }
        } catch (err) {
            console.error('Erro no processo de envio do pedido:', err);
            setError('Erro ao processar o envio do pedido.');
        }
    }

    // Filtrando os pedidos com base no status
    const filteredOrders = orders.filter(order => {
        if (activeTab === 'pending') return order.status === 'w';
        if (activeTab === 'accepted') return order.status === 'a';
        if (activeTab === 'delivery') return order.status === 'd';
        return false;
    });

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ color: "#00796b" }}>Lista de Pedidos</h2>
            <div className="card shadow" style={{ backgroundColor: "#e0f7f4", borderRadius: "12px", padding: "1rem" }}>
                {error && <div className="alert alert-danger">{error}</div>}
                {loading && <div className="text-center">Carregando pedidos...</div>}

                {/* Tabs para alternar entre os pedidos pendentes e aceitos */}
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                            onClick={() => setActiveTab('pending')}
                        >
                            Pedidos Pendentes
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'accepted' ? 'active' : ''}`}
                            onClick={() => setActiveTab('accepted')}
                        >
                            Pedidos Aceitos
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'delivery' ? 'active' : ''}`}
                            onClick={() => setActiveTab('delivery')}
                        >
                            Pedidos Enviados
                        </button>
                    </li>
                </ul>

                {/* Tabela de pedidos */}
                <div className="tab-content mt-4">
                    <div className="tab-pane fade show active">
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
                                {filteredOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.created_at}</td>
                                        <td>{order.status}</td>
                                        <td>{order.address}</td>
                                        <td>
                                            <ul>
                                                {order.items.map((item, index) => (
                                                    <li key={index}>
                                                        <strong>{item.name}</strong> (Qtd: {item.quantity}) - Preço: {item.price}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>
                                            {order.status === 'w' && (
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
                                            {order.status === 'a' && (
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => handleDeliveryOrder(order.id)}
                                                    >
                                                        Enviar
                                                    </button>
                                                </div>
                                            )}
                                            {order.status === 'd' && (
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => handleFinishOrder(order.id)}
                                                    >
                                                        Finalizar
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Controles de paginação */}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <button
                                className="btn btn-secondary"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <span>Página {currentPage} de {totalPages}</span>
                            <button
                                className="btn btn-secondary"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Próxima
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderList;
