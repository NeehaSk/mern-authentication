import { useEffect, createContext, useState } from "react";
import API from "../Api/apiCheck.js";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        refreshUser()
    }, [])
    async function refreshUser() {
        try {
            await API.get("/refresh-token")
                .then((res) => {
                    console.log(res.data)
                    setUser(res.data.user)
                })
        }
        catch (err) {
            console.log(err)
            setUser(null)
        }
        finally {
            setLoading(false)
        }
    }
    const loginUser = (data) => {
        localStorage.setItem("token", data.token)
        setUser(data.user)
    }
    const logoutUser = async () => {
        await API.post("/logout")
        localStorage.removeItem("token")
        setUser(null)
    }
    return (
        <div>
            <AuthContext.Provider value={{ loginUser, logoutUser, loading, user }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}