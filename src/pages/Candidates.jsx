import React,{useEffect, useState} from 'react'
import {BiPencil} from 'react-icons/bi'
import {RiDeleteBinLine} from 'react-icons/ri'
import {AiOutlinePlus} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/userAuth'
import {getCandidates} from '../servies'

const Candidates = () => {
  const [candidates,setCandidates] = useState([])
  const [password,setPassword] = useState('')
  const [phoneNumber,setphoneNumber] = useState();
  const [error,setError] = useState('')
  const {userAuth:{uid: currentAuthUserId}} = useAuth();
  useEffect(()=>{
    const fetchCadidates = async()=>{
      const fetchCadidates = await getCandidates(currentAuthUserId)
      setCandidates(fetchCadidates)
    }
    if(currentAuthUserId){
      fetchCadidates()
    }
  },[currentAuthUserId])
  return (
    <main className='w-[80%] m-auto border '>
      <div>
        Candidates List :{candidates.length > 0 ? candidates.length : 'loading..'}
      </div>    
      <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left bg-white">
            <thead className="text-xs text-gray-500  bg-white">
            <tr>
            <th scope="col" className="p-4">
            </th>
            <th scope="col" className="px-6 py-3">
              name
            </th>
            <th scope="col" className="px-6 py-3">
            Date of Birth
            </th>
            <th scope="col" className="px-6 py-3">
            Email
            </th>
            <th scope="col" className="px-6 py-3">
            Result
            </th>
            {/* <th scope="col" className="px-6 py-3">
            <span className="sr-only">Edit</span>
            </th> */}
            </tr>
            </thead>
            <tbody>
            <tr className="table-primary border-b ">
            <td className="w-4 p-4">
            <div className="flex items-center">
            <div>1</div>
            </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">
            Sliver
            </td>
            <td className="px-6 py-4">
            Laptop
            </td>
            <td className="px-6 py-4">
            $2999
            </td>
            <td className="px-6 py-4 text-right space-x-4">
              <button className='text-2xl text-primary'>
                <BiPencil/>
              </button>
              <button className='text-2xl text-primary'>
                <RiDeleteBinLine/>
              </button>
            </td>
            </tr>
      
            <tr className="bg-white ">
            <td className="w-4 p-4">
            <div className="flex items-center">
            <div>2</div>
            </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
            Magic Mouse 2
            </th>
            <td className="px-6 py-4">
            Black
            </td>
            <td className="px-6 py-4">
            Accessories
            </td>
            <td className="px-6 py-4">
            $99
            </td>
            <td className="px-6 py-4 text-right space-x-4">
              <button className='text-2xl text-primary'>
                  <BiPencil/>
              </button>
              <button className='text-2xl text-primary'>
                <RiDeleteBinLine/>
              </button>
            </td>
            </tr>
            </tbody>
          </table>
      </div>
      <Link className='flex items-baseline text-primary' to={'/add-candidate'}>
        <AiOutlinePlus/>  Add new candidate
      </Link>
    </main>
  )
}

export default Candidates