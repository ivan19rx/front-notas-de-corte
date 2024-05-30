import React, { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../context/auth'
import { Link, Navigate } from 'react-router-dom'

const Register = () => {
    let [nome, setNome] = useState("")
    let [email, setEmail] = useState("")
    let [senha, setSenha] = useState("")
    const { signUp, signed } = useContext(AuthContext)

    const handleRegister = async (e) => {
        e.preventDefault()
        if (!nome || !email || !senha) {
            alert('Todos os campos devem ser preenchidos')
            return
        }
        const data = {
            nome, email, senha
        }

        console.log(data)
        await signUp(data)
    }


    if (signed) {
        return <Navigate to="/" />
    } else {



        return (
            <>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <form onSubmit={handleRegister} className="login100-form validate-form">

                                <span className="login100-form-title p-b-48">
                                    Sistema Notas de corte
                                </span>

                                <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                                    <label htmlFor="email">Digite seu nome</label>
                                    <input value={nome} onChange={(e) => setNome(e.target.value)} className="input100" type="text" name="name" />
                                </div>
                                <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                                    <label htmlFor="email">Digite seu email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="input100" type="text" name="email" />
                                </div>

                                <div className="wrap-input100 validate-input" >
                                    <label htmlFor="senha">Digite sua senha</label>
                                    <input value={senha} onChange={(e) => setSenha(e.target.value)} className="input100" type="password" name="senha" />
                                </div>

                                <div className="container-login100-form-btn">
                                    <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn"></div>

                                        <button type='submit' className="login100-form-btn">
                                            Registrar
                                        </button>
                                    </div>
                                    <p>Já tem uma conta? </p> <Link to="/login">Logar</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Register