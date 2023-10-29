import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const navigate = useNavigate()
    const signOut = useSignOut()
    signOut();
    navigate(("/races"))
    return (
        <></>
    )
};

export default SignOut