import Navbar from "../../components/navbar/Navbar";
import "./login.css";
import { loginUser } from "../../Api/userApi";
import { useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/authSlice"




function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch=useDispatch();

    const handlerLogin = async (event) => {
        event.preventDefault();
        if (email === ""){
            toast.warning("invalid email");
            return;
        } else if (password === ""){
            toast.warning("Please enter your password");
            return;
        }
        setLoading(true);
        try {
            const res = await loginUser({
            email,password
        });
    
        if(res.status === 200 ){
            toast.success("Login successful");
            navigate("/events");
            dispatch(setUser(res.data.data));


        }else{
            toast.error(res.data.message);
        }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally{
            setLoading(false);
        }
    };

    
    return(
        <>
        <Navbar />
        <div className="auth">
            <h2>Login</h2>
            <form>
                <input type="email" placeholder="Email" required onChange={(e) => {
                    setEmail(e.target.value);
                }}/>
                <input type="password" placeholder="Password" required onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
                <button type="submit" onClick={handlerLogin}>
                    {loading ? "loading... " : "Login"}</button>
            </form>
        </div>
        </>
    )
}



export default Login;