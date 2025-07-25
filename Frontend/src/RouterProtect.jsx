import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";


function ProtectedRouts({ children, adminOnly = false}) {
    const auth = useSelector((state) => state.auth);

    if (!auth.user){
        return <Navigate to = "/not-found"/>
    }
    if(adminOnly && auth.user.role !== "admin"){
        return <Navigate to = "/not-found"/>
    }
    return children;
}

export default ProtectedRouts;