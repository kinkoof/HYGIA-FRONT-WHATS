import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Category {
    id: number;
    nome: string;
}

export const AddProducts = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        prescription: ""
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formData.name || !formData.category || !formData.price || !formData.prescription) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        setLoading(true);
        setError("");

        const productData = {
            name: formData.name,
            category: formData.category,
            pharmacy: Number(localStorage.getItem('userId')),
            price: formData.price,
            prescription: formData.prescription
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
                alert('Produto adicionado com sucesso!');
                setFormData({
                    name: "",
                    category: "",
                    price: "",
                    prescription: ""
                });
            } else {
                const errorData = await response.json();
                alert(`Erro ao adicionar o produto: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Erro ao adicionar o produto:", error);
            setError('Erro de rede ao tentar adicionar o produto.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('https://hygia-api-whats.onrender.com/auth/categories');
                const data = await response.json();

                if (Array.isArray(data.categories)) {
                    setCategories(data.categories);
                } else {
                    console.error("Erro: a resposta não contém a propriedade 'categories'.");
                    setCategories([]);
                }
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
            }
        }
        fetchCategories();
    }, []);


    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Adicionar Produto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nome do Produto:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Digite o nome do produto"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Categoria:</label>
                    <select
                        className="form-control"
                        name="category"  // Changed from "category_id" to "category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione a categoria</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Preço:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Digite o preço do produto"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Prescrição Necessária:</label>
                    <select
                        className="form-control"
                        name="prescription"
                        value={formData.prescription}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="1">Sim</option>
                        <option value="0">Não</option>
                    </select>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                        {loading ? 'Adicionando...' : 'Adicionar Produto'}
                    </button>
                </div>
            </form>
        </div>
    );
};
