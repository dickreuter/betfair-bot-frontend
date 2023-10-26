import { AuthProvider } from 'react-auth-kit'
import { BrowserRouter } from "react-router-dom"
import './App.css'
import NavBar from './routes/NavBar'
import Routing from "./routes/Routing"

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
