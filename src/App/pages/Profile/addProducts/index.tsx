import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Interface para o Produto
interface Product {
    id: number;
    name: string;
    description: string;
    price: number | null; // Pode ser null ou número
    stock_quantity: number;
    image_url: string | null;
    sale_price: number | null; // Valor de venda
}

export const ProductListInsert: React.FC = () => {
    const navigate = useNavigate();

    const handleAddProducts = () => {
        navigate('manual');
    };

    const [products, setProducts] = useState<Product[]>([]); // Lista de produtos
    const [loading, setLoading] = useState<boolean>(true); // Carregando produtos
    const [error, setError] = useState<string | null>(null); // Erros

    // Função para buscar os dados dos produtos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://hygia-api-whats.onrender.com/auth/list/products/insert');
                if (!response.ok) {
                    throw new Error('Erro ao carregar os produtos.');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError('Erro de rede ao tentar carregar os produtos.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];

        if (file && file.type === 'text/csv') {
            // Processar o arquivo CSV aqui
            console.log('Arquivo CSV selecionado:', file);
        } else {
            alert('Por favor, selecione um arquivo CSV.');
        }
    };


    // Lidar com a atualização do valor de venda
    const handleSalePriceChange = (e: React.ChangeEvent<HTMLInputElement>, productId: number) => {
        const { value } = e.target;
        const updatedProducts = products.map(product =>
            product.id === productId
                ? { ...product, sale_price: value ? parseFloat(value) : null }
                : product
        );
        setProducts(updatedProducts);
    };

    // Função para adicionar o produto à venda
    const handleAddToSale = async (productId: number) => {
        const product = products.find(p => p.id === productId);

        if (product && product.sale_price != null) {
            const productData = {
                name: product.name, // Nome do produto
                price: product.sale_price, // Preço de venda
                pharmacy: Number(localStorage.getItem('userId')), // ID da farmácia
            };

            try {
                const response = await fetch('https://hygia-api-whats.onrender.com/auth/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productData),
                });

                if (response.ok) {
                    alert('Produto adicionado à venda com sucesso!');
                } else {
                    const errorData = await response.json();
                    alert(`Erro ao adicionar o produto à venda: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Erro ao adicionar o produto à venda:", error);
                setError('Erro de rede ao tentar adicionar o produto à venda.');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Por favor, defina um valor de venda antes de adicionar à venda.');
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <h2>Lista de Produtos</h2>
            <div className="row justify-content-end">
                <div className="col-md-3">
                    <button
                        className="btn btn-success"
                        onClick={handleAddProducts}
                    >
                        Adicionar manualmente
                    </button>
                </div>
                <div className="col-md-3">
                    <button
                        className="btn btn-success"
                        onClick={() => {
                            const fileInput = document.getElementById('csv-upload');
                            if (fileInput) {
                                (fileInput as HTMLInputElement).click(); // Garantindo que é um elemento de input
                            }
                        }}
                    >
                        Importar csv
                    </button>
                    <input
                        type="file"
                        id="csv-upload"
                        accept=".csv"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            <div className="row">
                {products.map(product => (
                    <div className="col-md-4" key={product.id}>
                        <div className="card m-2">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <div className="mb-3">
                                    <label htmlFor={`sale-price-${product.id}`}>Valor para Venda</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id={`sale-price-${product.id}`}
                                        value={product.sale_price || ''}
                                        onChange={(e) => handleSalePriceChange(e, product.id)}
                                        min="0"
                                        placeholder="Digite o valor para venda"
                                    />
                                </div>

                                <button
                                    className="btn btn-success"
                                    onClick={() => handleAddToSale(product.id)}
                                >
                                    Adicionar à Venda
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
