import { getDocs,query,where,collection, addDoc, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../lib/firebaseConfig"

export const getCandidates = async(currentAuthUserId) =>{
    const candidatesRef =  collection(db,'candidates') 
    const q =  query(candidatesRef,where('userId','==',currentAuthUserId))
    const fetchCandidates = await getDocs(q)
    return fetchCandidates.docs.map(doc=>({
        ...doc.data(),
        docId:doc.id,
    }))
}

export const addCandidate = async(currentUserId,candName,dob,age,address,state,pinCode) =>{
    const currentUserRef = collection(db,'user')
    const q = query(currentUserRef,where('userId','==',currentUserId));
    const fetchCurrentUser = await getDocs(q)
    const currentUser = fetchCurrentUser.docs.map(doc=>({
        ...doc.data(),
    }))
    const {email} = currentUser[0]
    const candidatesRef = collection(db,'candidates')
    await addDoc(candidatesRef,{
        name:candName,
        age,
        dob,
        address,
        email,
        pincode:pinCode,
        status:state,
        userId:currentUserId,
    })
}

export const getCandidate = async(candDocId)=>{
    const docRef = doc(db,'candidates',candDocId)
    const candidate = await getDoc(docRef)
    return candidate.data()
}

export const updateCandidate = async(candDocId,candName,dob,age,address,state,pinCode)=>{
    const docRef = doc(db,'candidates',candDocId)
    await updateDoc(docRef,{
        name:candName,
        age,
        dob,
        address,
        pincode:pinCode,
        status:state,
    })
}

export const deleteCandidate = async(candDocId) =>{
    const docRef = doc(db,'candidates',candDocId)
    await deleteDoc(docRef)
}

export const editCandidateStatus = async(candDocId,candStatus) => {
    const docRef = doc(db,'candidates',candDocId)
    await updateDoc(docRef,{
        status:candStatus,
    }) 
}