import { useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';

const AuthState = () => {
    const auth = useAuthUser()

    useEffect(() => {
        // console.log("Authentication status", auth());  // Log the entire object to inspect its structure
    }, [auth])

    return (
        <div>
            {/* Current status: {auth?.()?.token || 'guest'}  Access email property instead of user */}
        </div>
    )
}

export default AuthState;
