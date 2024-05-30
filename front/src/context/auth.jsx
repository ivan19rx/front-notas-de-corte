import { createContext, useEffect, useState } from 'react'
import { api } from "../services/api"
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

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
                alert(response.data.erro);
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



    return (
        <AuthContext.Provider value={
            {
                user,
                signed: !!user,
                signIn
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}