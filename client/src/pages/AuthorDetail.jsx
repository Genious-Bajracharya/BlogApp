import { useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
import { useParams } from "react-router-dom";
import axios from "axios";
import BLogs from "./Blogs";

//show all blogs by author

export default function AuthorDetail(){
    const {id} = useParams()
   
    
    
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
          axios
            .get(`http://localhost:5050/api/author/${id}`)
            .then((res) => res.data),
      })
    
      if (isPending) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message

      console.log(data)

    return(
        <div>
            
            <div>{data.fullName}</div>
            <BLogs/>
            
            
        </div>
    )
}