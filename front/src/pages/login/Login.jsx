import React, { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../context/auth'
import { Link, Navigate } from 'react-router-dom'
import swal from 'sweetalert'

const Login = () => {
    let [email, setEmail] = useState("")
    let [senha, setSenha] = useState("")
    const { signIn, signed } = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!email) {
            swal({
                title: "Aviso",
                text: "Todos os campos devem ser preenchidos",
                icon: "warning",
            });
            return
        }
        if (!senha) {
            swal({
                title: "Aviso",
                text: "Todos os campos devem ser preenchidos",
                icon: "warning",
            });
            return
        }
        const data = {
            email, senha
        }

        console.log(data)
        await signIn(data)
    }


    if (signed) {
        return <Navigate to="/" />
    } else {



        return (
            <>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <form onSubmit={handleLogin} className="login100-form validate-form">

                                <span className="login100-form-title p-b-48">
                                    Sistema Notas de corte
                                </span>

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
                                            Login
                                        </button>
                                    </div>
                                    <p>Não possui uma conta? </p> <Link to="/register">Registrar</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login