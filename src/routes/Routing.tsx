
import { Route, Routes } from "react-router-dom"
import Analysis from "../views/Analysis"
import Orders from "../views/Orders"
import Races from "../views/Races"
import Strategy from "../views/Strategy"
import User from "../views/User"
import Admin from "../views/admin"
import Purchase from "../views/Purchase"
import SignInComponent from "../components/auth/SignIn"
import SignOut from "../components/auth/SignOutButton"
import BetfairLoginRedirect from "../components/auth/betfair_login"
import Disconnect from "../components/Disconnect"


function Routing() {
    return (
        <div>
            <Routes>
                <Route path="races" element={<Races />} />
                <Route path="orders" element={<Orders />} />
                <Route path="analysis" element={<Analysis />} />
                <Route path="strategyeditor" element={<Strategy />} />
                <Route path="/" element={<Races />} />
                <Route path="/user" element={<User />} />
                <Route path="/purchase" element={<Purchase />} />
                <Route path="/login" element={<SignInComponent />} />
                <Route path="/logout" element={<SignOut />} />
                <Route path="/disconnect" element={<Disconnect />} />
                <Route path="/betfair_login" element={<BetfairLoginRedirect />} />
            </Routes>
        </div>
    )
}

export default Routing