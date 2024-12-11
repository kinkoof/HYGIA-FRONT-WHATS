import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
    id: number;
    name: string;
    price: number;
    stock_quantity: number;
    image_url: string | null;
    created_at: string;
    updated_at: string;
}

export const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const pharmacyId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://hygia-api-whats.onrender.com/auth/list/products?pharmacy=${pharmacyId}`);
                const data = await response.json();

                if (response.ok) {
                    setProducts(data);
                } else {
                    setError(data.message || 'Erro ao buscar produtos.');
                }
            } catch (error) {
                setError('Erro de rede ao tentar buscar os produtos.');
            } finally {
                setLoading(false);
            }
        };

        if (pharmacyId) {
            fetchProducts();
        } else {
            setError('ID da farmácia não encontrado.');
            setLoading(false);
        }
    }, [pharmacyId]);

    const handleEdit = (productId: number) => {
        navigate(`/profile/products/edit/${productId}`);
    };

    const handleDelete = async (productId: number) => {
        const confirmed = window.confirm('Tem certeza que deseja excluir este produto?');

        if (confirmed) {
            try {
                const response = await fetch(`https://hygia-api-whats.onrender.com/auth/delete/product/${productId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Produto deletado com sucesso!');
                    setProducts(products.filter(product => product.id !== productId));
                } else {
                    alert('Erro ao tentar excluir o produto.');
                }
            } catch (error) {
                alert('Erro de rede ao tentar excluir o produto.');
            }
        }
    };

    if (loading) {
        return <div className="text-center">Carregando produtos...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4" style={{ color: "#00796b" }}>Lista de Produtos</h1>
            {products.length > 0 ? (
                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div
                                className="card h-100 shadow"
                                style={{
                                    borderRadius: "12px",
                                    backgroundColor: "#e0f7f4",
                                    borderColor: "#00796b",
                                }}
                            >
                                <div className="card-body">
                                    <h5 className="card-title" style={{ color: "#004d40" }}>{product.name}</h5>
                                    <p className="card-text">
                                        <strong>Preço:</strong> R${product.price}<br />
                                    </p>
                                    {product.image_url && (
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="img-fluid mb-3"
                                            style={{ borderRadius: "8px" }}
                                        />
                                    )}
                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleEdit(product.id)}
                                            style={{
                                                backgroundColor: "#00796b",
                                                color: "#ffffff",
                                                border: "none",
                                            }}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">Nenhum produto encontrado para esta farmácia.</div>
            )}
        </div>
    );
};
