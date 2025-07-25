import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./signup";
import { toast } from "react-toastify";
import { signupUser } from "../../Api/userApi";
import { useNavigate } from "react-router";

function Login(){
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const haldleSignupUser =async (event) => {
        event.preventDefault();

        if (email === ""){
            toast.warning("Email not fount");
            return;
        } else if (name === ""){
            toast.warning("Name not found");
            return;
        } else if (password === "" || password.length < 3){
            toast.warning("Password must be more than 3 characters");
            return;
        }

        const userData = {
            name,
            email,
            password,
        };

        const response = await signupUser(userData);
        if (response.status === 201){
            toast.success("Signup Successful")
            navigate("/login")
        }else{
            toast.error(response.data.message);
        }

        setLoading(false);

        
        // console.log("userData: ", userData);
    }
    return(
        <>
        <Navbar />
        <div className="auth">
            <h2>SignUp</h2>
            <form>
                <input type="text" placeholder="Enter Name" required value={name} onChange={(e) =>{
                    setName(e.target.value);
                }}/>
                <input type="email" placeholder="Email" required value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }}/>
                <input type="password" placeholder="Password" required value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }
                }/>
                <button type="submit" onClick={haldleSignupUser}>
                    {loading ? "loading..." : "SignUp"}</button>
            </form>
        </div>
        </>
    )
}

export default Login;