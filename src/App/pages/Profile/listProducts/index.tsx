import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate para navegação

// Define a interface para o produto
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    image_url: string | null;
    created_at: string;
    updated_at: string;
}

export const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]); // Estado para armazenar os produtos
    const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
    const [error, setError] = useState<string | null>(null); // Estado de erro
    const navigate = useNavigate(); // Hook para navegação

    // Pega o pharmacy_id de algum lugar, pode ser localStorage, props ou outro contexto
    const pharmacyId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                // Faz a requisição para a API com o pharmacy_id
                const response = await fetch(`https://hygia-api-whats.onrender.com/auth/list/products?pharmacy_id=${pharmacyId}`);
                const data = await response.json();

                if (response.ok) {
                    setProducts(data); // Atualiza o estado com os produtos
                } else {
                    setError(data.message || 'Erro ao buscar produtos.');
                }
            } catch (error) {
                setError('Erro de rede ao tentar buscar os produtos.');
            } finally {
                setLoading(false); // Para o carregamento
            }
        };

        if (pharmacyId) {
            fetchProducts(); // Busca os produtos se houver pharmacy_id
        } else {
            setError('ID da farmácia não encontrado.');
            setLoading(false);
        }
    }, [pharmacyId]);

    // Função para navegar até a página de edição de um produto
    const handleEdit = (productId: number) => {
        navigate(`/profile/products/edit/${productId}`); // Redireciona para a rota de edição com o ID do produto
    };

    // Função para deletar um produto com confirmação
    const handleDelete = async (productId: number) => {
        const confirmed = window.confirm('Tem certeza que deseja excluir este produto?');

        if (confirmed) {
            try {
                const response = await fetch(`https://hygia-api-whats.onrender.com/auth/delete/product/${productId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Produto deletado com sucesso!');
                    // Atualiza a lista de produtos, removendo o produto deletado
                    setProducts(products.filter(product => product.id !== productId));
                } else {
                    alert('Erro ao tentar excluir o produto.');
                }
            } catch (error) {
                alert('Erro de rede ao tentar excluir o produto.');
            }
        }
    };

    // Renderização de carregamento ou erro
    if (loading) {
        return <div className="text-center">Carregando produtos...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Lista de Produtos</h1>
            {products.length > 0 ? (
                <div className="row">
                    {products.map((product) => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">
                                        Descrição: {product.description}<br />
                                        Preço: R${product.price}<br />
                                        Quantidade em estoque: {product.stock_quantity}
                                    </p>
                                    {product.image_url && (
                                        <img src={product.image_url} alt={product.name} className="img-fluid" />
                                    )}
                                    {/* Botão de edição */}
                                    <button
                                        className="btn btn-primary mt-2"
                                        onClick={() => handleEdit(product.id)}
                                    >
                                        Editar
                                    </button>
                                    {/* Botão de deletar */}
                                    <button
                                        className="btn btn-danger mt-2 ms-2"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Excluir
                                    </button>
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
