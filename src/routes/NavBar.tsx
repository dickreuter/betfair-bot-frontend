import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useRef, useState } from "react";
import { useAuthUser } from 'react-auth-kit';
import { Link } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';
import { API_URL, HTTP_PREFIX } from '../helper/Constants';

const NavBar = () => {
    const getAuth = useAuthUser();
    const auth = getAuth();
    const [email, setLoginEmail] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const tokenRef = useRef(auth?.token || 'default');
    const signOut = useSignOut()

    const toggle = () => setIsOpen(!isOpen);
    const handleNavLinkClick = () => {
        if (window.innerWidth <= 768) {  // Bootstrap's breakpoint for small devices
            toggle();
        }
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const token = tokenRef.current;
                const response = await axios.post(
                    `http${HTTP_PREFIX}://${API_URL}/get_login_email`,
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
        }, 8000);  // 80 seconds

        return () => clearInterval(interval);  // Cleanup on unmount
    }, []);

    return (
        <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
            <button className="navbar-toggler" type="button" onClick={toggle} aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="/">Deepermind Bettingbot</a>
            <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto d-flex ml-auto">  {/* Apply ml-auto here */}
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

                    {
                        auth ? (
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href={`https://identitysso.betfair.com/view/vendor-login?client_id=134143&response_type=code&redirect_uri=${encodeURIComponent('betfair_login?email=' + email)}`}
                                    target="_blank" // to open in a new tab
                                    rel="noopener noreferrer" // for security reasons
                                >
                                    Connect
                                </a>
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
                    <li className="nav-item ml-auto">  {/* Right align this nav item */}
                        <a className="nav-link" href="http://www.deepermind-pokerbot.com" onClick={handleNavLinkClick}>Poker</a>
                    </li>

                </ul>

            </div>
        </nav>
    );
}

export default NavBar;
