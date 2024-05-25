import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export default function Authoredit(){
    
    const { id } = useParams();
    const [fullName,setfullName]=useState("")
    const [email,setemail]=useState("")
    const queryClient = useQueryClient();
    
    const fetchAuthor = async (id) => {
        const { data } = await axios.get(`http://localhost:5050/api/author/${id}`);
        return data;
      };

    const updateAuthor = async ({ id, updatedAuthor }) => {
        const { data } = await axios.put(`http://localhost:5050/api/author/${id}`, updatedAuthor);
        return data;
      };

      const { data: author, isLoading } = useQuery({
        queryKey: ['authorData', id],
        queryFn: () => fetchAuthor(id),
      });

      const mutation = useMutation({
        mutationFn: updateAuthor,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['authorData', id] });
          toast.success('Author updated successfully');
        },
        onError: (error) => {
          toast.error(`Error: ${error.response?.data?.message || error.message}`);
        },
      });
    
      const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ id, updatedAuthor: { fullName, email } });
      };

      if (isLoading) return 'Loading...';

     
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder={author.fullName} value={fullName} required onChange={(e)=> setfullName(e.target.value)}/>
                
                <input
                    placeholder={author.email}
                    type="email"
                    value={email} 
                    required
                    onChange={(e)=> setemail(e.target.value)}
                />
                <button type="submit" >Confirm</button>
            </form>
        </div>
    )
}

// useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const res = await axios.get(`http://localhost:5050/api/author/${id}`);
           
    //         setauthor(res.data);
    //       } catch (err) {
    //         console.error('Error fetching the author post:', err);
    //       }
    //     };
    //     fetchData();
    //   }, [id]);

    //   if(!author){
    //     return <div>...loading</div>
    //   }
      

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       await axios.put(`http://localhost:5050/api/author/${id}`, { fullName ,email});
          
    //       toast.success('author updated successfully!');
    //     } catch (err) {
          
    //       toast.error('Error updating the author post');
    //     }
    //   };