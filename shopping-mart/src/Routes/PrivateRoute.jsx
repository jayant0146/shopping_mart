import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/context/auth";
import Spinner from "../components/Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("/api/v1/auth/user-auth");
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        };
        if (auth?.token && auth?.user?.role === 0) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path={""} />;
}

//Outlet is used here fir nested routing as in angular