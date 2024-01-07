// useAuthSignIn.js
import { useState } from "react";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { API_URL, HTTP_PREFIX } from "../../helper/Constants";

const useAuthSignIn = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const submitSignIn = async (formData) => {
    setIsLoading(true);

    try {
      const res = await axios.post(
        `http${HTTP_PREFIX}://${API_URL}/login`,
        formData
      );
      setIsLoading(false);

      if (
        res.status === 200 &&
        signIn({
          token: res.data.token,
          expiresIn: 3600 * 48,
          tokenType: "Bearer",
          authState: {
            email: res.data.email,
            token: res.data.access_token,
          },
        })
      ) {
        navigate("/races");
        return { success: true, message: "Log in successful!" };
      } else {
        setError("Log in unsuccessful");
        return { success: false, message: "Log in unsuccessful" };
      }
    } catch (err) {
      setIsLoading(false);
      return {
        success: false,
        message: "Login failed. Please check you have a non-expired username and password.",
      };
    }
  };

  return {
    submitSignIn,
    isLoading,
    error,
  };
};

export default useAuthSignIn;
