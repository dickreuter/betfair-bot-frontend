import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import {useEffect, useRef, useState} from "react";
import {useAuthUser, useSignOut} from "react-auth-kit";
import {Link} from "react-router-dom";
import {API_URL, HTTP_PREFIX} from "../helper/Constants";
import ReactGA from 'react-ga4';

const NavBar = () => {
  const getAuth = useAuthUser();
  const auth = getAuth();
  const [email, setLoginEmail] = useState("");
  const [betfairConnected, setBetfairConnected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const tokenRef = useRef(auth?.token || "default");
  const signOut = useSignOut();

  const toggle = () => setIsOpen(!isOpen);
  const handleGAEvent = (category, action, label) => {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  };

  const handleNavLinkClick = () => {
    if (window.innerWidth <= 768) {
      // Bootstrap's breakpoint for small devices
      toggle();
    }
    handleGAEvent('Navigation', 'Link Click', 'Navbar Toggle or NavLink'); // Track navbar toggle or nav link clicks
  };

  useEffect(() => {
    tokenRef.current = auth?.token || "default";
  }, [auth]);

  useEffect(() => {
    // Function to fetch email
    const fetchEmail = async () => {
      try {
        const token = tokenRef.current;
        const response = await axios.post(
          `http${HTTP_PREFIX}://${API_URL}/get_login_email`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { email } = response.data;
        setLoginEmail(email || "default");
      } catch (error) {
        console.error("Failed to get login email:", error);
        setLoginEmail("default");
        signOut();
      }
    };

    const fetchBetfairConnection = async () => {
      try {
        const token = tokenRef.current;
        const response = await axios.post(
          `http${HTTP_PREFIX}://${API_URL}/check_betfair_connection`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { res } = response.data;
        setBetfairConnected(response.data.isConnected);
        console.log(betfairConnected);
      } catch (error) {
        console.error("Failed to get Betfair connection status:", error);
        // Handle different types of errors here
        setBetfairConnected(false);
        // Optional: update UI or alert user
        signOut();
      }
    };

    // Fetch email immediately on mount
    fetchEmail();
    fetchBetfairConnection();

    // Then set up interval to fetch email every 8 seconds
    const interval = setInterval(() => {
      fetchEmail();
      fetchBetfairConnection();
    }, 8000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [auth]); // Depend on auth state

  useEffect(() => {
    // Function to fetch email
    const fetchEmail = async () => {
      try {
        const token = tokenRef.current;
        const response = await axios.post(
          `http${HTTP_PREFIX}://${API_URL}/get_login_email`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { email } = response.data;
        setLoginEmail(email || "default");
      } catch (error) {
        console.error("Failed to get login email:", error);
        setLoginEmail("default");
        signOut();
      }
    };

    // Fetch email immediately on mount
    fetchEmail();

    // Then set up interval to fetch email every 8 seconds
    const interval = setInterval(fetchEmail, 8000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [auth]); // Depend on auth state
return (
  <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
    <button
      className="navbar-toggler"
      type="button"
      onClick={toggle}
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand" href="/" onClick={() => handleGAEvent('Navigation', 'Brand Click', 'Deepermind Bettingbot')}>
      Deepermind Bettingbot
    </a>
    <div
      className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
      id="navbarTogglerDemo03"
    >
      <ul className="navbar-nav mr-auto d-flex ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/races" onClick={() => handleGAEvent('Navigation', 'Link Click', 'Races')}>
            Races
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/strategyeditor" onClick={() => handleGAEvent('Navigation', 'Link Click', 'Strategies')}>
            Strategies
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/orders" onClick={() => handleGAEvent('Navigation', 'Link Click', 'Orders')}>
            Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/analysis" onClick={() => handleGAEvent('Navigation', 'Link Click', 'Analysis')}>
            Analysis
          </Link>
        </li>
        {auth
          ? !betfairConnected && (
              <li className="nav-item">
                <a
                  className="nav-link"
                  href={`https://identitysso.betfair.com/view/vendor-login?client_id=134143&response_type=code&redirect_uri=${encodeURIComponent(
                    "betfair_login?email=" + email
                  )}`}
                  target="_blank" // to open in a new tab
                  rel="noopener noreferrer" // for security reasons
                  onClick={() => handleGAEvent('Navigation', 'Link Click', 'CONNECT TO BETFAIR')}
                >
                  CONNECT TO BETFAIR
                </a>
              </li>
            )
          : null}
        {auth
          ? betfairConnected && (
              <Link className="nav-link" to="/disconnect" onClick={() => handleGAEvent('Navigation', 'Link Click', 'Disconnect Betfair')}>
                Disconnect Betfair
              </Link>
            )
          : null}
        {auth ? (
          <li className="nav-item">
            <Link className="nav-link" to="/logout" onClick={() => handleGAEvent('Navigation', 'Link Click', 'Logout')}>
              Logout
            </Link>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/purchase" onClick={() => handleGAEvent('Navigation', 'Link Click', 'Register')}>
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={() => handleGAEvent('Navigation', 'Link Click', 'Login')}>
                Login
              </Link>
            </li>
          </>
        )}
        <li className="nav-item">
          <Link className="nav-link" to="/documentation" onClick={() => handleGAEvent('Navigation', 'Link Click', 'Documentation')}>
            Documentation
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://discord.gg/QdY3Ddyj" onClick={() => handleGAEvent('Navigation', 'Link Click', 'Support chat')}>
            Support chat
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="https://github.com/dickreuter/betfair-bot-frontend"
            onClick={() => handleGAEvent('Navigation', 'Link Click', 'Source Code')}
          >
            Source code
          </a>
        </li>
        <li className="nav-item ml-auto">
          <a
            className="nav-link"
            href="http://www.deepermind-pokerbot.com"
            onClick={() => handleGAEvent('Navigation', 'Link Click', 'Pokerbot')}
          >
            Pokerbot
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

};
export default NavBar;
