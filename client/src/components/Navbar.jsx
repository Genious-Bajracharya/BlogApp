import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const Navigate=useNavigate()

  return (
    <div className="flex p-4 justify-between px-8 bg-slate-200" >
      <div className="flex gap-5">
      <div onClick={()=> Navigate("/")} className="cursor-pointer font-bold text-3xl"> BlogzAll</div>
        <div onClick={()=> Navigate('/')} className="cursor-pointer">Home</div>
        <div onClick={()=> Navigate("/blog")} className="cursor-pointer"> Blogs</div>
        <div onClick={()=> Navigate("/authors")} className="cursor-pointer"> Authors</div>
      </div>
      <div className="flex gap-5 left-0">
        <div className="cursor-pointer">Log In</div>
        <div className="cursor-pointer" onClick={()=> Navigate("/signup")}>Sign Up</div>
      </div>
    </div>
  );
}
