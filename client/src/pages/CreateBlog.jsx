import { useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify';

export default function CreateBlog(){
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    // const [authorId,setAuthor]=useState("")
    const authorId='6649f8b680a17bdfa5c6cfb3'
    const [coAuthor,setCoAuthor]=useState("")
    

    const handleSubmit = async  (e) =>{
        e.preventDefault();
        try{
            const response= await axios.post('http://localhost:5050/api/blog/',{title,content,authorId,coAuthor})
            toast.success('Blog created successfully!', {
                position: "top-center"
              });
              console.log('blog created:', response.data);
              
              setCoAuthor("")
              setContent("")
              setTitle("")
        }catch(err){
            toast.error(err.response?.data?.message || err.message || 'An error occurred');
    }

    }

    return(
        <div className="max-w-2xl mx-auto px-4 py-8">
  <form onSubmit={handleSubmit} className="space-y-4">
    <input 
      className="block w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
      placeholder="Title" 
      value={title} 
      required
      onChange={(e)=>setTitle(e.target.value)}
    />
    <textarea
      className="block w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
      rows="5"
      placeholder="Content" 
      value={content} 
      required
      onChange={(e)=>setContent(e.target.value)}
    />
    <div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Post
      </button>
    </div>
  </form>
</div>
    )
}