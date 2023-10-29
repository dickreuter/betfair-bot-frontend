import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useRef, useState } from "react";
import { useAuthUser } from 'react-auth-kit';
import { Link } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';
import { API_URL } from '../helper/Constants';

const NavBar = () => {
    const getAuth = useAuthUser();
    const auth = getAuth();
    const [email, setLoginEmail] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const tokenRef = useRef(auth?.token || 'default');
    const signOut = useSignOut()

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const token = tokenRef.current;
                const response = await axios.post(
                    `http://${API_URL}/get_login_email`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const { email } = response.data;
                setLoginEmail(email || 'default');
            } catch (error) {
                console.error("Failed to get login email:", error);
                setLoginEmail('default');
                signOut();
            }
        }, 80000);  // 80 seconds

        return () => clearInterval(interval);  // Cleanup on unmount
    }, []);

    return (
        <header>
            <nav style={{ maxWidth: "1480px", margin: "0 auto" }} className="navbar bg-white navbar-expand-sm fixed-top navbar-light bg-light">
                <button className="navbar-toggler" type="button" onClick={toggle} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/">Deepermind Bettingbot</a>

                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto d-flex">
                        <li className="nav-item">
                            <Link className="nav-link" to="/races">Races</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/strategyeditor">Strategies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/orders">Orders</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/analysis">Analysis</Link>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="https://discord.gg/QdY3Ddyj">Support chat</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/dickreuter/betfair-bot-frontend">Source code</a>
                        </li>


                        <li className="nav-item">
                            <a className="nav-link" href="http://www.deepermind-pokerbot.com">Poker</a>
                        </li>

                        {
                            auth ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin">Admin</Link>
                                </li>
                            ) : null
                        }

                        {
                            auth ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout">Logout</Link>
                                </li>
                            ) :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/purchase">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </>
                        }

                    </ul>

                </div>
            </nav>
        </header>

    );
}

export default NavBar;
