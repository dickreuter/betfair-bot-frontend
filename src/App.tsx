import { AuthProvider } from 'react-auth-kit'
import { BrowserRouter } from "react-router-dom"
import './App.css'
import NavBar from './routes/NavBar'
import Routing from "./routes/Routing"
import ReactGA4 from "react-ga4";

ReactGA4.initialize("G-0XDYSECTJW");

function App() {

  return (
    <>
      <AuthProvider authType={"localstorage"}  authName={'sickpunt'}>
        <BrowserRouter>

          <NavBar />
          <Routing />

        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
