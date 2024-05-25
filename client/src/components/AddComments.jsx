import { useState } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
// import { Button , Input } from "@/components/ui/button"




export default function AddComments({blog}){
    const email='ikki@gmail.com'
    const name='Kurogane'
    // const {blogId}=useParams()
    const { id: blogId } = useParams();
    const [comment,setComment]=useState('')
    const queryClient = useQueryClient();

    
    const createComment = async (newComment) => {
        const { data } = await axios.post(`http://localhost:5050/api/comment`, newComment);
        return data;
    };

    const mutation = useMutation({
        mutationFn: createComment,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['CommentData'] });
          toast.success('Comment created successfully');
          setComment('');
          
        },
        onError: (error) => {
          toast.error(`Error: ${error.response?.data?.message || error.message}`);
        },
      });
    
      const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ email, name, comment, blogId});
        console.log(blogId)
      };

    return(
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      <input
        className="border border-gray-300 rounded px-3 py-2 flex-grow"
        placeholder="Add a Comment..."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
      >
        Comment
      </button>
    </form>
    )
}