import React, { useState, useEffect } from "react";

export const EditProfile = () => {
    const [loading, setLoading] = useState(true); // Inicializa com 'true' para indicar que os dados estão sendo carregados
    const [formData, setFormData] = useState({
        pharmacyName: "",
        cnpj: "",
        email: "",
        phone: "",
        street: "",
        neighborhood: "",
        city: "",
        state: "",
        cep: "",
        number: "",
        password: "",
        passwordConfirm: "",
        ownerName: "",
        ownerCpf: "",
        ownerPhone: "",
        ownerEmail: "",
        bankName: "",
        agencyNumber: "",
        accountNumber: "",
        accountHolder: "",
        logo: null
    });

    // Atualizar o estado do form quando o usuário faz alterações nos inputs
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Função para lidar com o envio dos dados
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true); // Ativa o estado de carregamento durante a submissão

        // Obter o userId do localStorage ou outra fonte
        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("ID da farmácia não encontrado.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://hygia-api-whats.onrender.com/auth/edit?userId=${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData) // Converte o formData para JSON
            });

            const data = await response.json();

            if (response.ok) {
                alert("Perfil atualizado com sucesso!");
            } else {
                alert(data.message || "Erro ao atualizar o perfil.");
            }
        } catch (error) {
            console.error("Erro de rede:", error);
            alert("Erro de rede ao tentar atualizar o perfil.");
        } finally {
            setLoading(false); // Desativa o estado de carregamento
        }
    };

    // UseEffect para buscar os dados do perfil quando o componente for montado
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true); // Inicia o carregamento
                const userId = localStorage.getItem("userId"); // Obtenha o userId do localStorage

                if (!userId) {
                    console.error("User ID não encontrado no localStorage.");
                    return;
                }

                const response = await fetch(`https://hygia-api-whats.onrender.com/auth/info?userId=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setFormData(data); // Preenche o formData com os dados recebidos
                } else {
                    console.error("Erro ao buscar dados do perfil:", response.statusText);
                }
            } catch (error) {
                console.error("Erro ao carregar os dados do perfil:", error);
            } finally {
                setLoading(false); // Fim do carregamento
            }
        };

        fetchProfileData();
    }, []); // O efeito só será executado uma vez após o primeiro render

    // Exibe um indicador de carregamento enquanto os dados estão sendo buscados
    if (loading) {
        return <div className="text-center">Carregando os dados do perfil...</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Editar Perfil da Farmácia</h1>
            <form onSubmit={handleSubmit}>
                <h2>Informações da Farmácia</h2>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Nome da Farmácia:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="pharmacyName"
                            value={formData.pharmacyName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">CNPJ:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cnpj"
                            value={formData.cnpj}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">E-mail:</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Telefone:</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <h2>Endereço</h2>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">CEP:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="cep"
                            value={formData.cep}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Rua:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Bairro:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="neighborhood"
                            value={formData.neighborhood}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Cidade:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Estado:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Número:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <h2>Informações do Proprietário</h2>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Nome do Proprietário:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">CPF do Proprietário:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="ownerCpf"
                            value={formData.ownerCpf}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Telefone do Proprietário:</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="ownerPhone"
                            value={formData.ownerPhone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">E-mail do Proprietário:</label>
                        <input
                            type="email"
                            className="form-control"
                            name="ownerEmail"
                            value={formData.ownerEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <h2>Informações Bancárias</h2>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Banco:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Número da Agência:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="agencyNumber"
                            value={formData.agencyNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Número da Conta:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Nome do Titular da Conta:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="accountHolder"
                            value={formData.accountHolder}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Salvando..." : "Salvar Alterações"}
                    </button>
                </div>
            </form>
        </div>
    );
};
