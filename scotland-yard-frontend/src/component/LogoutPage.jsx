import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear()
        // window.location.reload();
        navigate('/gameOptions')
    },[])


    return (<>
    Redirecting to home page.
    </>)
}