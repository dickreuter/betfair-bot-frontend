import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { API_URL, HTTP_PREFIX } from '../../helper/Constants';
import Funds from '../Funds';

const BetfairLoginRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    // Function to extract the code and email from URL query parameters
    const getParamsFromURL = () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get('code');
      const email = queryParams.get('email'); // Get the email parameter
      return { code, email };
    };

    // Function to send code and email to the backend
    const sendCodeAndEmailToBackend = (code, email) => {
      axios.post(`http${HTTP_PREFIX}://${API_URL}/betfair_login`, { code, email })
        .then(response => {
          console.log('Code and email sent to backend successfully:', response);
          // Handle further logic here if needed
        })
        .catch(error => {
          console.error('Error sending code and email to backend:', error);
        });
    };

    // Extract the authorization code and email from the URL
    const { code, email } = getParamsFromURL();
    if (code && email) {
      sendCodeAndEmailToBackend(code, email);
    }
  }, [location]);

  return (
    <div>
      {location.search.includes('code') ? (
        <>
          <p>Establishing connection with betfair..... Please wait 2 minutes. If you see your funds status, the connection was successful.</p>
          <Funds />
        </>
      ) : (
        <p>No authorization code found in URL.</p>
      )}
    </div>
  );
};

export default BetfairLoginRedirect;
