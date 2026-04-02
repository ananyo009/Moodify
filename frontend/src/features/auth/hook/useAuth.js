import { login, register, getMe, logout } from '../services/auth.api'
import { use, useContext, useEffect } from 'react'
import { Authcontext } from '../states/auth.context'

export const useAuth = () => { 
    const context = useContext(Authcontext)

    const { loading, setloading, user, setuser } = context;

    async function handleRegister({ email, username, password }) {
        setloading(true);
        const data = await register({ email, username, password })
        setuser(data.user);
        setloading(false);
    }

    async function handlelogin({ email, username, password }) {
        setloading(true);
        const data = await login({ email, username, password })
        setuser(data.user);
        setloading(false);
    }
    
    async function handlegetMe(){
        setloading(true)
    const data = await getMe();
    setuser(data.user);
    setloading(false);
    }

    async function handlelogout() {
        setloading(true);
        const data  = await logout();
        setuser(null);
        setloading(false);
    }

    useEffect(() => {
        handlegetMe();
    }, [])

    return({
        loading,user, handleRegister, handlelogin, handlegetMe, handlelogout,setloading, setuser
    })
}