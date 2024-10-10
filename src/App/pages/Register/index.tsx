import React, { useState } from "react";

export const Register = () => {
    const [step, setStep] = useState(1);
    const [loadingCep, setLoadingCep] = useState(false);
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
        passwordConfirm:"",
        ownerName: "",
        ownerCpf: "",
        ownerPhone: "",
        ownerEmail: "",
        bankName: "",
        agencyNumber: "",
        accountNumber: "",
        accountHolder: "",
        document: null,
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCepChange = async (e: any) => {
        const cep = e.target.value.replace(/\D/g, ''); // Remover caracteres não numéricos
        setFormData({ ...formData, cep });

        if (cep.length === 8) {  // O CEP deve ter 8 dígitos
            try {
                setLoadingCep(true);
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    alert("CEP não encontrado.");
                    setLoadingCep(false);
                    return;
                }

                // Preencher os campos de endereço com os dados da API
                setFormData({
                    ...formData,
                    street: data.logradouro,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    state: data.uf,
                    cep: cep,
                });
                setLoadingCep(false);
            } catch (error) {
                alert("Erro ao buscar o CEP.");
                setLoadingCep(false);
            }
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch('https://hygia-front-whats.vercel.app/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Farmacia registrado com sucesso!');
                console.log('Sucesso:', data);
            } else {
                alert(data.message || 'Erro ao registrar o usuário.');
                console.error('Erro:', data);
            }
        } catch (error) {
            console.error('Erro de rede:', error);
            alert('Erro de rede ao tentar se registrar.');
        }
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Cadastro de Farmácias</h1>
            <form onSubmit={handleSubmit}>

                {step === 1 && (
                    <div>
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
                                    placeholder="Digite o nome da farmácia"
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
                                    placeholder="Digite o CNPJ"
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
                                    placeholder="Digite o e-mail"
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
                                    placeholder="Digite o telefone"
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
                                    onChange={handleCepChange}
                                    placeholder="Digite o CEP"
                                    required
                                />
                                {loadingCep && <small>Carregando endereço...</small>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Rua:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    placeholder="Digite a rua"
                                    required
                                    readOnly
                                    disabled={loadingCep}
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
                                    placeholder="Digite o bairro"
                                    required
                                    readOnly
                                    disabled={loadingCep}
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
                                    placeholder="Digite a cidade"
                                    required
                                    readOnly
                                    disabled={loadingCep}
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
                                    placeholder="Digite o estado"
                                    required
                                    readOnly
                                    disabled={loadingCep}
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
                                    placeholder="Digite o número"
                                    required
                                />
                            </div>

                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Senha:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Digite sua Senha"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Confirme a Senha:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="passwordConfirm"
                                    value={formData.passwordConfirm}
                                    onChange={handleChange}
                                    placeholder="Confirme sua Senha"
                                    required
                                />
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="button" className="btn btn-primary" onClick={nextStep}>Próximo</button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
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
                                    placeholder="Digite o nome do proprietário"
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
                                    placeholder="Digite o CPF do proprietário"
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
                                    placeholder="Digite o telefone do proprietário"
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
                                    placeholder="Digite o e-mail do proprietário"
                                    required
                                />
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="button" className="btn btn-secondary me-3" onClick={prevStep}>Voltar</button>
                            <button type="button" className="btn btn-primary" onClick={nextStep}>Próximo</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
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
                                    placeholder="Nome do banco"
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
                                    placeholder="Digite o número da agência"
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
                                    placeholder="Digite o número da conta"
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
                                    placeholder="Digite o nome do titular da conta"
                                    required
                                />
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="button" className="btn btn-secondary me-3" onClick={prevStep}>Voltar</button>
                            <button type="submit" className="btn btn-success">Cadastrar</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};
