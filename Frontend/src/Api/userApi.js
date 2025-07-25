import api from "./api"
export const signupUser= async (userData)=>{
    const response= await api.post("/v1/users/signup",userData);
    return response;
}

export const loginUser= async (loginDetails)=>{
    const response= await api.post("/v1/users/login",loginDetails);
    return response;
}