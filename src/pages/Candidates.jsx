import React,{useEffect, useState} from 'react'
import {BiPencil} from 'react-icons/bi'
import {RiDeleteBinLine} from 'react-icons/ri'
import {AiOutlinePlus} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/userAuth'
import {getCandidates,deleteCandidate,editCandidateStatus} from '../servies'

const Candidates = () => {
  const [candidates,setCandidates] = useState([])
  const {userAuth:{uid: currentAuthUserId}} = useAuth();
  
  const removeCandidate = async(candId) =>{
    await deleteCandidate(candId)
    const fetchCadidates = await getCandidates(currentAuthUserId)
    setCandidates(fetchCadidates)
  }
  
  const updateCandidateStatus = async(candId,candStatus) =>{
    await editCandidateStatus(candId,candStatus)
    const fetchCadidates = await getCandidates(currentAuthUserId)
    setCandidates(fetchCadidates)
  }
  
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
    <main className='w-[80%] m-auto border'>
      <div>
        Candidates List :{candidates.length > 0 ? candidates.length : 0}
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left bg-white">
            <thead className="text-xs text-gray-500  bg-white text-center">
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
            </tr>
            </thead>
      {
        candidates ?
        candidates.map((cand,index)=>{
          return(
            <tbody key={cand.docId}>
            <tr className="table-primary border-b ">
            <td className="w-4 p-4">
            <div className="flex items-center">
            <div>{index+1}</div>
            </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap  text-center">
              {cand.name}
            </th>
            <td className="px-6 py-4 text-center">
            {cand.dob}
            </td>
            <td className="px-6 py-4 text-center">
              {cand.email}
            </td>
            <td className="px-6 py-4 text-center">
                <select 
                className='outline-none text-sm px-4 bg-[#CDF0EA]'
                name="state"
                id="state"
                value={cand.status}
                onChange={({target})=>updateCandidateStatus(cand.docId,target.value)}>
                  <option  value="shortlist">Shortlist</option>
                  <option value="reject">Reject</option>
                </select>
            </td>
            <td className="px-6 py-4 text-right space-x-4 flex items-baseline">
              <Link  to={`/edit-candidate/${cand.docId}`} className='text-2xl text-primary'>
                <BiPencil/>
              </Link>
              <button className='text-2xl text-primary' onClick={()=> removeCandidate(cand.docId)}>
                <RiDeleteBinLine/>
              </button>
            </td>
            </tr>
            </tbody>
          )
        })
        : null
      }    
      </table>
      </div>
      <Link className='flex items-baseline text-primary' to={`/add-candidate/${currentAuthUserId}`}>
        <AiOutlinePlus/>  Add new candidate
      </Link>
    </main>
  )
}

export default Candidates