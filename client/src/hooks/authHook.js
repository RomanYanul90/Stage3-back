import {useState, useCallback,useEffect} from 'react'

const userData = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId,setUserId] = useState(null)

    const login = useCallback((jwt,id)=>{
        setToken(jwt)
        setUserId(id)
        localStorage.setItem(userData,JSON.stringify({userId:id,token:jwt}))
    },[])
    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)
        localStorage.removeItem(userData)
    },[])

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(userData));
        if(data && data.token){
            login(data.token,data,userData)
        }
    },[login])

    return {login,logout,token,userId}
}