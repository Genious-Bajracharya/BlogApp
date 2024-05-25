import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/blog");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Blogss</h1>
      
      <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog._id} onClick={()=> navigate(`/blogdetail/${blog._id}`)} className="border p-4 rounded-lg shadow-md cursor-pointer">
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{blog.content.substring(0, 20)}...</p>
            <div className="flex justify-between items-center">
              <Link to={`/blogdetail/${blog._id}`} className="text-blue-500 hover:underline">
                Read More
              </Link>
              <span className="text-gray-500">Views: {blog.view_count}</span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/createblog')}}>Create Blog</button> 
    </div>
  );
}
