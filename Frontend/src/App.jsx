import { useState } from 'react'
import { BrowserRouter,Routes,Route, RouterProvider} from "react-router"
import Navbar from './components/navbar/Navbar.jsx'
import Home from "./pages/Home/home.jsx"
import Login from "./pages/Login/login.jsx"
import SignUp from "./pages/Signup/signup.jsx"
import Event from "./pages/Events/event.jsx"
import AddEvent from './pages/AddEvent/addevent.jsx'
import SingleEventPage from "./pages/SinglePageEvent/singleevent.jsx"
import TicketsPage from './pages/Tickets/tickets.jsx'
import { ToastContainer, toast } from 'react-toastify';
import ProtectedRouts from "./RouterProtect.jsx"


function App() {
return(
<>
<ToastContainer/>
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<SignUp/>}/>
  <Route path="/events" element={<Event/>}/>
  <Route path="/tickets" element={<TicketsPage/>}/>
  <Route path="/event/:id" element={<SingleEventPage />} />
  <Route path="/addevent" element={
    <ProtectedRouts adminOnly={true}>
  <AddEvent/>
  </ProtectedRouts>
  }
  />
</Routes>
  </BrowserRouter>


</>
)}


export default App