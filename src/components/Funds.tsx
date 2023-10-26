import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { API_URL } from '../helper/Constants';
import './Table.css';

function Funds() {
  const [balanceData, setBalanceData] = useState(null);
  const auth = useAuthUser();
  const tokenRef = useRef(auth?.()?.token || 'default');

  async function fetchBalanceData() {
    try {
      await axios.post(
        `http://${API_URL}/balance`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenRef.current}`
          }
        }
      )
        .then(res => {
          setBalanceData(res.data);
        })
        .catch(error => {
          console.error('Error loading funds:', error);
        });

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchBalanceData();
  }, []);

  return (
    <div className="funds">
      {balanceData ? (
        <table border="1">
          <tbody>
            {Object.entries(balanceData).map(([key, value], index) => (
              <tr key={index}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Funds;
