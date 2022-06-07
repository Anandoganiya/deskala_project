import { getDocs,query,where,collection } from "firebase/firestore"
import { db } from "../lib/firebaseConfig"
export const getCandidates = async(CurrentAuthUserId) =>{
    const candidatesRef =  collection(db,'candidates') 
    const q =  query(candidatesRef,where('userId','==',CurrentAuthUserId))
    const fetchCandidates = await getDocs(q)
    return fetchCandidates.docs.map(doc=>({
        ...doc.data(),
        docId:doc.id,
    }))
}