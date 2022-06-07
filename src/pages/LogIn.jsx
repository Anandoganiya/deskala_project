import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { auth } from '../lib/firebaseConfig' 
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const handleForm = async(e) => {
    e.preventDefault();
    //regular expressions for input validation
    const emailValidation = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    const passwordValidation = new RegExp('(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$');
    // conditons for checking form input validation 
    if(email === '' || password === ''){
      setError('Please fill all the fields')
    }else if(emailValidation.test(email) === false) {
      setError('Invalid email address')
    }else if(password.length < 8){
      setError('Password should be atleast of 8 characters')
    }else if(passwordValidation.test(password) === false){
      setError('password should have atleast 1 uppercase ,1 lowercase, 1 numeric, 1 special character')
    }else{
      try {
        const res = await signInWithEmailAndPassword(auth,email,password)
        setError('')
        navigate('/')
      } catch (error) {
        setError(error.message)
        setEmail('')
        setPassword('')
  
      }
    }
    //remove error after some time
    setTimeout(() => {
      setError('')
    }, 3000);
    return null;
  }
  return (
        <main className='sm:w-[40%] relative top-[4rem] w-full m-auto border shadow-xl'>
        <div className='text-center my-4 font-medium'>Log In</div>
        {error.length > 0 ?<div className='text-center my-4 text-red-500 font-medium'>{error}</div> :null }
        <form onSubmit={(e)=>handleForm(e)} className='flex flex-col w-full space-y-6'>
          <div className='flex flex-col md:w-[50%] w-full m-auto'>
            <label htmlFor="email" className='cursor-pointer font-medium'>Email id</label>
            <input type="text"
              onChange={({target})=>setEmail(target.value)}
              value={email}
              name="email"
              id='email'
              autoComplete='off'
              placeholder='enter your email id'
              className='border p-2 outline-none'
            />
          </div>
          <div className='flex flex-col md:w-[50%] w-full m-auto'>
            <label htmlFor="password" className='cursor-pointer font-medium'>Password</label>
            <input type="text"
              onChange={({target})=>setPassword(target.value)}
              value={password}
              name="password"
              autoComplete='off'
              id='password'
              placeholder='enter your password'
              className='border p-2 outline-none'
            />
            <span className='flex justify-end text-primary text-sm'>minimum 8 Alpha numeric</span>
            <button className='btn-primary p-4 rounded text-white sm:w-[50%] w-full text-center m-auto my-8'>Login</button>
            <span className='flex justify-center'>Didn't have account 
              <Link className='text-primary ml-1 cursor-pointer' to={'/signup'}>SignUp</Link>
             </span>
          </div>
        </form>
      </main>
  )
}

export default LogIn