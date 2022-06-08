import React,{useState,useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getCandidate,updateCandidate } from '../servies';

const EditCandidate = () => {
  const [candName,setCandName] = useState('')
  const [dob,setDob] = useState('')
  const [age,setAge] = useState('')
  const [address,setAddress] = useState('')
  const [state,setState] = useState('')
  const [pinCode,setPinCode] = useState('')
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const {candDocId} = useParams()
  
  const handleForm = async(e) => {
    e.preventDefault();
    //regular expressions for input validation
    const dateValidation = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/ 
    const pinCodeValidation = new RegExp('^[1-9][0-9]{5}$')
    // conditons for checking form input validation 
    if(candName === '' || dob === '' || age === '' || address === '' || state === '' || pinCode === ''){
      setError('All fields are required')
    }else if(dateValidation.test(dob) === false) {
      setError('Invalid date format.Please follow the format (dd/mm/yyyy)')
    }else if(pinCodeValidation.test(pinCode) === false){
      setError('Invalid pin code')
    }else if(isNaN(age) || age < 1  || age > 100){
      setError('Invalid age')
    }else{
        await updateCandidate(candDocId,candName,dob,age,address,state,pinCode)
        navigate('/')
    }
    //remove error after some time
    setTimeout(() => {
      setError('')
    }, 3000);
    return null;
  }
  useEffect(()=>{
    const fetchCandidate = async()=>{
        const candidate = await getCandidate(candDocId)
        const {pincode,name,age,address,status,dob} = candidate
        setAddress(address)
        setCandName(name)
        setPinCode(pincode)
        setAge(age)
        setState(status)
        setDob(dob)
    }
    fetchCandidate()
  },[candDocId])
  return (
    <main className='md:w-[50%] relative top-[4rem] w-full m-auto border shadow-xl'>
        <div className='my-4 md:w-[90%]  w-[95%] m-auto font-medium'>Edit Candidate</div>
        {error.length > 0 ?<div className='text-center my-4 text-red-500 font-medium'>{error}</div> :null }
        <form onSubmit={(e)=>handleForm(e)} className=' w-full'>
          <div className='flex-col items-baseline w-full sm:flex-row flex'>
          <div className='flex flex-col w-full space-y-6'>
            <div className='flex flex-col md:w-[80%] w-full m-auto'>
              <label htmlFor="candName" className='cursor-pointer font-medium'>name</label>
              <input type="text"
                onChange={({target})=>setCandName(target.value)}
                value={candName}
                name="candName"
                id='candName'
                autoComplete='off'
                placeholder='enter your name'
                className='border p-2 outline-none'
              />
            </div>
            <div className='flex flex-col md:w-[80%]  w-full m-auto'>
              <label htmlFor="dob" className='cursor-pointer font-medium'>Date of Birth</label>
              <input type="text"
                onChange={({target})=>setDob(target.value)}
                value={dob}
                name="dob"
                id='dob'
                autoComplete='off'
                placeholder='enter your date of birth'
                className='border p-2 outline-none'
              />
            </div>
            <div className='flex flex-col md:w-[80%] w-full m-auto'>
              <label htmlFor="age" className='cursor-pointer font-medium'>Age</label>
              <input type="text"
                onChange={({target})=>setAge(target.value)}
                value={age}
                name="age"
                autoComplete='off'
                id='age'
                placeholder='enter your age'
                className='border p-2 outline-none'
              />
            </div>

          </div>
          <div className='flex flex-col w-full space-y-6'>
            <div className='flex flex-col md:w-[80%] w-full m-auto'>
              <label htmlFor="address" className='cursor-pointer font-medium'>Address</label>
              <input type="text"
                onChange={({target})=>setAddress(target.value)}
                value={address}
                name="address"
                id='address'
                autoComplete='off'
                placeholder='enter your address'
                className='border p-2 outline-none'
              />
            </div>
            <div className='flex flex-col md:w-[80%] w-full m-auto'>
              <label htmlFor="state" className='cursor-pointer font-medium'>State</label>
              <select className='border p-2 outline-none' name="state" id="state" value={state} onChange={({target})=>{setState(target.value)}}>
                <option value="shortlist">Shortlist</option>
                <option value="reject">Reject</option>
              </select>
            </div>
            <div className='flex flex-col md:w-[80%] w-full m-auto'>
              <label htmlFor="pinCode" className='cursor-pointer font-medium'>Pin Code</label>
              <input type="text"
                onChange={({target})=>setPinCode(target.value)}
                value={pinCode}
                name="pinCode"
                autoComplete='off'
                id='pinCode'
                placeholder='enter your 6 digit pin code'
                className='border p-2 outline-none'
              />
            </div>
          </div>
          </div>
          <div className='flex justify-end space-x-4 mr-4 my-4'>
            <Link to={'/'} className='btn-primary px-[3rem] py-3 border rounded text-black bg-white text-center'>Cancel</Link>
            <button className='btn-primary px-[3rem] py-3 rounded text-white text-center'>Update</button>
          </div>
        </form>
      </main>
  )
}
export default EditCandidate