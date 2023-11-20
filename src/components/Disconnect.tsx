import React, { useRef, useState } from 'react'
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import { API_URL, HTTP_PREFIX } from '../helper/Constants';

function Disconnect() {
    const getAuth = useAuthUser();
    const auth = getAuth();
    const tokenRef = useRef(auth?.token || 'default');

    axios.post(`http${HTTP_PREFIX}://${API_URL}/disconnect_betfair`, 
    {  },
    {
      headers: {
        Authorization: `Bearer ${tokenRef.current}`,
        'Content-Type': 'application/json',
      },
    })

  return (
    <div>Betfair has been disconnected.</div>
  )
}

export default Disconnect