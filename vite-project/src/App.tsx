
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar"
import Main from "./pages/Main"
import Home from "./pages/Home"
import PoemPage from "./layout/PoemPage"
import Songs from "./pages/Songs"
import Videos from "./pages/videos"

import Poems from "./pages/Poems"
import About from "./pages/About"
function App() {


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/poems" element={<Poems/>}/>
        <Route path="/songs" element={<Songs/>}/>
        <Route path="/videos" element={<Videos/>}/>
        <Route path="/poems/:id" element={<PoemPage title="title" subtitle="subtitle" content="  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus suscipit soluta hic officia sint consequuntur ex maxime dolor exercitationem, libero voluptas ut eius voluptates, natus necessitatibus saepe tenetur autem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt vel quibusdam nemo laudantium cum eaque consequatur tempora aperiam in, maiores explicabo nostrum. Fuga tenetur recusandae, consequuntur nemo deserunt tempore illo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quibusdam, dignissimos placeat sequi excepturi corrupti dolores ad, quas incidunt fuga totam iusto debitis iure recusandae amet est fugit, aperiam similique.
      Natus, quaerat alias, reiciendis ad in fuga neque officia quae inventore culpa non provident quam enim rerum. Nisi eius vero recusandae. Quo autem voluptates corrupti! Voluptatum nam similique blanditiis impedit.
      Perspiciatis consequuntur labore iure laboriosam officiis eligendi eius hic! Cupiditate tempora quisquam doloremque! Delectus sapiente voluptatum itaque dignissimos modi debitis, beatae optio sequi illo veritatis exercitationem quisquam libero harum sed.
      Totam et, illo delectus iusto perferendis nemo eligendi ratione, iste neque harum, ipsa quibusdam necessitatibus nostrum cupiditate. Cum natus beatae delectus accusamus adipisci quasi ipsam? Deserunt beatae reprehenderit nisi ratione?
      Excepturi fugiat similique ipsa labore minus aspernatur repellendus harum accusantium sequi tempora necessitatibus, est soluta consequuntur error corporis quis. Sit mollitia explicabo debitis repellat, deleniti quam pariatur officiis incidunt saepe." img="https://images.unsplash.com/photo-1682687982470-8f1b0e79151a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="alt" tags="tags"/>}/>
      </Routes>
      
      
    
    </> 
  )
}

export default App
