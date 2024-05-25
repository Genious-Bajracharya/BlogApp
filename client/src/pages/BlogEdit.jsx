import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";

export default function BlogEdit(){
    // const [blog, setBlog] = useState(null);
    const { id } = useParams();
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const authorId='6649f8b680a17bdfa5c6cfb3'
    const [coAuthor,setCoAuthor]=useState("")
    const navigate=useNavigate()
    const queryClient = useQueryClient();
    
    

    const { isPending, error, data} = useQuery({
      queryKey: ['blog', id],
      queryFn: () => axios.get(`http://localhost:5050/api/blog/${id}`).then((res) => res.data.blog),
      onSuccess: () => { 
        
      }
      
    });


    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const res = await axios.get(`http://localhost:5050/api/blog/${id}`);
    //         setBlog(res.data.blog);
    //       } catch (err) {
    //         console.error('Error fetching the blog post:', err);
    //       }
    //     };
    //     fetchData();
    //   }, [id]);

    //   if(!blog){
    //     return <div>...loading</div>
    //   }
      

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`http://localhost:5050/api/blog/${id}`, { title , authorId, content,coAuthor });
          
          toast.success('Blog updated successfully!');
          navigate('../')
        } catch (err) {
          
          toast.error('Error updating the blog post');
        }
      };

      if (isPending) return 'Loading...'
      console.log(data)

      // useEffect(()=>{
      //   setTitle(data.title)
      //   setContent(data.content)
      // },[])
      
    
      if (error) return 'An error has occurred: ' + error.message
     
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
                Edit
              </button>
            </div>
          </form>
        </div>
    )
}