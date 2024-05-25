import { useEffect, useState } from "react"
import AllAuthor from "../components/AllAuthors"
import { Suspense } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

export default function AuthotPAge(){
    const [authors,setAuthor]=useState([])

    function Loading() {
        return <h2>🌀 Loading...</h2>;}

    useEffect( ()=>{
        const fetchAuthors= async () => {
            try{
             const res = await  axios.get('http://localhost:5050/api/author/')
             setAuthor(res.data)
            }catch(err){
                toast.error(err.response?.data?.message || err.message || 'An error occurred');
            }
        }
        fetchAuthors()
    },[])

  
    return(
        <Suspense fallback={<Loading />}>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Author</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Edit Author</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Delete Author</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => (
                    <AllAuthor key={author._id} author={author} />
                    ))}
                </tbody>
            </table>
        </Suspense>
    )
}