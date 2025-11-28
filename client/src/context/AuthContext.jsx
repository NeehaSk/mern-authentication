import { useEffect, createContext, useState } from "react";
import API from "../Api/apiCheck.js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

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
        console.log("Data from login",data)
        localStorage.setItem("token", data.token)
        setUser(data.user)
        navigate("/")
    }
    const logoutUser = async () => {
        await API.post("/logout")
            .then((res)=> {
                localStorage.removeItem("token")
                setUser(null)
                navigate("/login")
            })
        
    }
    return (
        <div>
            <AuthContext.Provider value={{ loginUser, logoutUser, loading, user }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}