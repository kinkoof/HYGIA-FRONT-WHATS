import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await fetch('https://hygia-api-whats.onrender.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();

                // Verifique se um token foi retornado
                if (data.token) {
                    // Armazena o token e o userId no localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId); // Armazena o userId

                    // Redirecionar para uma rota protegida após o login
                    navigate("/profile");
                } else {
                    setErrorMessage("Falha ao obter token de autenticação.");
                }
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Erro ao fazer login.");
            }
        } catch (error) {
            console.error("Erro na requisição de login:", error);
            setErrorMessage("Erro de rede, tente novamente mais tarde.");
        }
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="text-center mb-4">Login</h2>
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">E-mail:</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Digite seu e-mail"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Senha:</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Digite sua senha"
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-lg">Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
