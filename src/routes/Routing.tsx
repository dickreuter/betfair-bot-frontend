
import { Route, Routes } from "react-router-dom"
import Analysis from "../views/Analysis"
import Orders from "../views/Orders"
import Races from "../views/Races"
import Strategy from "../views/Strategy"
import User from "../views/User"
import Admin from "../views/admin"
import Purchase from "../views/Purchase"
import SignInComponent from "../components/auth/SignIn"
import { useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    const signOut = useSignOut()
    signOut();
    console.log("sign out successful")
    navigate(("/SignIn"))
    return (
        <></>
    )
};

function Routing() {
    return (
        <div>
            <Routes>
                <Route path="races" element={<Races />} />
                <Route path="orders" element={<Orders />} />
                <Route path="analysis" element={<Analysis />} />
                <Route path="strategyeditor" element={<Strategy />} />
                <Route path="/" element={<Races />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/user" element={<User />} />
                <Route path="/purchase" element={<Purchase />} />
                <Route path="/login" element={<SignInComponent />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </div>
    )
}

export default Routing