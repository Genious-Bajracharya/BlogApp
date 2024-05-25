import {  useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify';

export default function AllAuthor({ author}){
    const id=author._id;
    const Navigate=useNavigate()

    const handleDelete = async() =>{
        try {
            const res = await axios.delete(`http://localhost:5050/api/author/${id}`);
            console.log(id)
            toast.success('Blog Deleted successfully!', {
                position: "top-center"
              });
          } catch (err) {
            toast.error(err.response?.data?.message || err.message || 'An error occurred');
          }
    }
    
    return(
        <tr className="hover:bg-gray-100 border-b border-gray-200">
          <td
            className="py-2 px-4 cursor-pointer text-blue-600 hover:underline"
            onClick={() => Navigate(`/authordetail/${author._id}`)}
          >
            {author.fullName}
          </td>
          <td className="py-2 px-4">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => Navigate(`../authoredit/${author._id}`)}
            >
              Edit
            </button>
          </td>
          <td className="py-2 px-4">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>
          </td>
      </tr>
    )
}