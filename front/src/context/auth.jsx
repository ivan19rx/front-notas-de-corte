import { createContext, useEffect, useState } from 'react'
import { api } from "../services/api"
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const loadingStorageData = async () => {
            const storageUser = localStorage.getItem("@Auth:user")
            const storageToken = localStorage.getItem("@Auth:token")

            if (storageUser && storageToken) {
                setUser(JSON.parse(storageUser))  // Parsing JSON string back to object
                api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`  // Setting token for future API requests
            }
            setLoading(false)  // Loading finished
        }
        loadingStorageData()
    }, [])

    const signIn = async ({ email, senha }) => {
        try {
            const response = await api.post("/login", { email, senha })
            if (response.data.erro) {
                alert("ocorreu algum erro")
            } else {
                const { user, token } = response.data
                setUser(user)
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`

                localStorage.setItem("@Auth:user", JSON.stringify(user))
                localStorage.setItem("@Auth:token", token)

                navigate('/')  // Redireciona para a página inicial
            }
        } catch (error) {
            console.log(error)
            const responseError = error.response?.data?.msg || "Erro desconhecido"
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: responseError,
            })
        }
    }

    const signUp = async ({ nome, email, senha }) => {
        try {
            const response = await api.post("/register", { nome, email, senha })
            if (response.data.erro) {
                alert("ocorreu algum erro")
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Você se registrou com sucesso",
                    showConfirmButton: false,
                    timer: 2300
                })
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
            const responseError = error.response?.data?.mensagem || "Erro desconhecido"
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: responseError,
            })
        }
    }

    const singOut = () => {
        localStorage.clear()
        setUser(null)
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{
            user,
            signed: !!user,
            loading,
            signIn,
            signUp,
            singOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}
