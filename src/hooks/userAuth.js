import {onAuthStateChanged} from 'firebase/auth'
import { useState,useEffect } from 'react'
import {auth} from '../lib/firebaseConfig'
const useAuth = () => {
    const [userAuth,setUserAuth] = useState(JSON.parse(localStorage.getItem('authUser')))
    useEffect(()=>{
        const subscriber = onAuthStateChanged(auth,(authUser)=>{
            if(authUser){
                localStorage.setItem('authUser',JSON.stringify(authUser))
                setUserAuth(authUser)
            }else{
                localStorage.removeItem('authUser')
                setUserAuth(null)
            }
        })
        return ()=>{
            subscriber()
        }
    },[])

    return {userAuth} 
}
export default useAuth