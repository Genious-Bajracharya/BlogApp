import { useState,useEffect } from "react"
import axios from 'axios';
import AllBlogs from "../components/AllBlogs";

export default function BLogs(){
    const [blogs,setBlogs]=useState([])

    useEffect( ()=>{
        const fetchData = async ()=>{
            const res =await axios.get("http://localhost:5050/api/blog/")
            setBlogs(res.data)
        }

        fetchData()
        
    },[])

    console.log(blogs)
    
    return(
        <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Title</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Edit Blog</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Delete Blog</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog)=><AllBlogs key={blog._id} blog={blog}/>)}
                </tbody>
            </table>
    )
}