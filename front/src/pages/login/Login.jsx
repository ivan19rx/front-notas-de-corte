import React, { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../context/auth'
import { Navigate } from 'react-router-dom'

const Login = () => {
    let [email, setEmail] = useState("")
    let [senha, setSenha] = useState("")
    const { signIn, signed } = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!email || !senha) {
            alert('Todos os campos devem ser preenchidos')
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
                                <span className="login100-form-title p-b-26">
                                    Welcome
                                </span>
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