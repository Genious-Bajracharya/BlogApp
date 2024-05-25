import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify';

export default function Signup(){
    const [email,setEmail]=useState("")
    const [fullName,setFullName]=useState("")
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:5050/api/author/', { fullName, email });
          console.log('Author created:', response.data);
          toast.success('Author created successfully!', {
            position: "top-center"
          });
          setEmail('');
          setFullName('');
          
        } catch (err) {
          console.error('There was an error creating the author!', err);
          toast.error(err.response?.data?.message || err.message || 'An error occurred');
        }
      };


    return(
        <div>
            <form onSubmit={handleSubmit}> 
                <input placeholder="Email" value={email} type="email" required onChange={(e)=> setEmail(e.target.value)}/>
                <input placeholder="Full Name" value={fullName} required onChange={(e)=> setFullName(e.target.value)}/>
                <button type="submit">Sing UP</button>
            </form>
           
           
                
        </div>
    )
}