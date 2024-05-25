import { BrowserRouter,Route,Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import BLogs from "./pages/Blogs"
import Signup from "./pages/Signup"
import AuthotPAge from "./pages/AuthorPage"
import AuthorDetail from "./pages/AuthorDetail"
import Authoredit from "./pages/AuthorEdit"
import CreateBlog from "./pages/CreateBlog"
import BlogDetail from "./pages/BlogDetail"
import BlogEdit from "./pages/BlogEdit"
function App() {
  

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="/blog" element ={<BLogs/>}/>
          <Route  path="/signup" element ={<Signup/>}/>
          <Route  path="/authors" element ={<AuthotPAge/>}/>
          <Route  path="/createblog" element ={<CreateBlog/>}/>
          <Route  path="/blogdetail/:id" element ={<BlogDetail/>}/>
          <Route  path="/blogedit/:id" element ={<BlogEdit/>}/>
          <Route  path="/authordetail/:id" element ={<AuthorDetail/>}/>
          <Route  path="/authoredit/:id" element ={<Authoredit/>}/>
        </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App
