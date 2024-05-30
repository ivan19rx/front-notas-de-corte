import { createContext, useEffect, useState } from 'react'
import { api } from "../services/api"
import axios from 'axios'
import { useNavigate, Navigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const navigate = useNavigate();


    useEffect(() => {
        const loadingStorageData = async () => {
            const storageUser = localStorage.getItem("@Auth:user")
            const storageToken = localStorage.getItem("@Auth:token")

            if (storageUser && storageToken) {
                setUser(storageUser)
            }
        }
        loadingStorageData()
    }, [])




    const signIn = async ({ email, senha }) => {
        try {
            const response = await api.post("/login", { email, senha });
            if (response.data.erro) {
                alert("ocorreu algum erro");
            } else {
                setUser(response.data);
                api.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${response.data.token}`;

                localStorage.setItem("@Auth:user", JSON.stringify(response.data.user));
                localStorage.setItem("@Auth:token", response.data.token);
            }
        } catch (error) {
            console.log(error);
        }


    };
    const signUp = async ({ nome, email, senha }) => {
        try {
            const response = await api.post("/register", { nome, email, senha });
            if (response.data.erro) {
                alert("ocorreu algum erro");
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const singOut = () => {
        localStorage.clear();
        setUser(null);
        return navigate('/login')
    };



    return (
        <AuthContext.Provider value={
            {
                user,
                signed: !!user,
                signIn,
                signUp,
                singOut
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}