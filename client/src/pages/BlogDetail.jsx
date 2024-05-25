import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AddComments from "../components/AddComments";
import Commnets from "../components/Commnets";

export default function BlogDetail() {
    const queryClient = useQueryClient();
    const [blog, setBlog] = useState(null);
    const { id } = useParams();


    const { isPending, error, data} = useQuery({
      queryKey: ['blog', id],
      queryFn: () => axios.get(`http://localhost:5050/api/blog/${id}`).then((res) => res.data.blog),
    });
    

    const handleLike = async () =>{
     
      // axios.get(`http://localhost:5050/api/blog/likes/${id}`)
      likeMutation.mutate();
    
    } 

    const handleDislike = async () =>{
      // axios.get(`http://localhost:5050/api/blog/dislikes/${id}`)
      dislikeMutation.mutate();
      
    }

    const likeMutation = useMutation({
      mutationFn: () => axios.get(`http://localhost:5050/api/blog/likes/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blog', id] });
        toast.success('Blog liked successfully!');
      },
      onError: (error) => {
        toast.error(`Error liking the blog: ${error.response?.data?.message || error.message}`);
      },
    });

    const dislikeMutation = useMutation({
      mutationFn: () => axios.get(`http://localhost:5050/api/blog/dislikes/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['blog', id] });
        toast.success('Blog disliked successfully!');
      },
      onError: (error) => {
        toast.error(`Error disliking the blog: ${error.response?.data?.message || error.message}`);
      },
    });

      if (isPending) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message
    
  
    // while(!blog){
    //   return <div>...loading</div>
    // }
  
    return (
      <div className="max-w-3xl mx-auto px-12 py-12">
  <div className="mb-8">
    <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
    <div className="text-gray-600 text-lg" style={{ wordWrap: 'break-word' }}>
      {data.content}
    </div>
  </div>
  <div className="flex items-center justify-between">
    <div className="text-gray-500">
      <span className="mr-2">Likes: {data.likes_count}</span>
      <span>View Count: {data.view_count}</span>
    </div>
    
          </div>
          <div className="flex gap-5 my-5">
      <button 
        onClick={handleLike} 
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Like
      </button>
      <button 
        onClick={handleDislike} 
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Dislike
      </button>
    </div>
            <AddComments blog={blog}/>
              <Commnets/>
              
      </div>
    );
  }