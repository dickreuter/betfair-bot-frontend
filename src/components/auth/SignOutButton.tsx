import { Button } from '@mui/material'
import { useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'

const SignOutButton = () => {
    const navigate = useNavigate()
    const signOut = useSignOut()
    
    const Logout = () => {
        signOut();
        console.log("sign out successful")
        navigate(("/SignIn"))
    }
    // return (
    //     <Button variant="contained" onClick={Logout}>SignOut</Button>
    // )
}

export default SignOutButton