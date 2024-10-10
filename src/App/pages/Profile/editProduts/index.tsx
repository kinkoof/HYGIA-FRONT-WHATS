import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Interface para o Produto
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    image_url: string | null;
}

export const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Pegando o ID da URL
    const navigate = useNavigate(); // Substituindo useHistory por useNavigate

    const [product, setProduct] = useState<Product | null>(null); // Produto a ser editado
    const [loading, setLoading] = useState<boolean>(true); // Carregando o produto
    const [error, setError] = useState<string | null>(null); // Erros

    // Função para buscar os dados do produto
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/auth/product/${id}`);
                if (!response.ok) {
                    throw new Error('Erro ao carregar o produto.');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError('Erro de rede ao tentar carregar o produto.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Lidar com a atualização do produto
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!product) return;

        try {
            const response = await fetch(`http://localhost:3000/auth/edit/product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product), // Envia o produto atualizado
            });

            if (response.ok) {
                alert('Produto atualizado com sucesso!');
                navigate('/profile/products'); // Redireciona para a listagem
            } else {
                setError('Erro ao atualizar o produto.');
            }
        } catch (error) {
            setError('Erro de rede ao tentar atualizar o produto.');
        }
    };

    // Atualiza o estado conforme o usuário altera o formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => prevProduct ? {
            ...prevProduct,
            [name]: name === 'price' || name === 'stock_quantity' ? Number(value) : value
        } : null);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <h2>Editar Produto</h2>
            {product && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description">Descrição</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price">Preço</label>
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="stock_quantity">Quantidade em Estoque</label>
                        <input
                            type="number"
                            className="form-control"
                            name="stock_quantity"
                            value={product.stock_quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </form>
            )}
        </div>
    );
};
