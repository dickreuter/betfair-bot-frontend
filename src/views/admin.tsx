import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useRef, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { API_URL } from '../helper/Constants';
import withAuth from '../routes/withAuth';
import './Strategy.css';

interface IAttributesConfig {
  login: string;
}

const defaultAttributesConfig: IAttributesConfig = {
  login: "default",
};


const Admin = () => {
  const [availableStrategies, setAvailableStrategies] = useState<string[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string>("");
  const [data, setData] = useState<IAttributesConfig>(defaultAttributesConfig);

  const auth = useAuthUser();
  const tokenRef = useRef(auth?.()?.token || 'default');
  const [validated, setValidated] = useState(false);

  const displayAlert = (message, type) => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} fixed-bottom text-center mb-0 rounded-0`;
    alertDiv.innerHTML = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
  };


  const updateData = (attr: string, newMin?: number, newMax?: number) => {
    // Clone the existing attributesConfig state
    const updatedAttributesConfig = { ...data };

    // Update the specific attribute's min and max values
    updatedAttributesConfig[attr] = {
      min: newMin !== undefined ? newMin : data[attr]?.min,
      max: newMax !== undefined ? newMax : data[attr]?.max,
    };

    // Update the state
    setData(updatedAttributesConfig);
  };

  const saveAdmin = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);  // Set validated to true when form is submitted
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {

      // Log payload to the console
      // console.log("Saving strategy with the following configuration:", data);

      // Make POST request to /save
      axios.post(
        `http://${API_URL}/save_admin`,
        { admin_dict: data },
        {
          headers: {
            Authorization: `Bearer ${tokenRef.current}`
          }
        }
      )
        .then(response => {
          displayAlert('Saved successfully', 'success');
        })
        .catch(error => {
          console.error("Error saving Admin:", error);
          displayAlert('Failed to save', 'danger');
        }); å
    };
  };


  const loadAdmin = () => {

    // Initialize data with defaultAttributesConfig
    setData(defaultAttributesConfig);
    console.log("data before loading:", data)

    axios.post(
      `http://${API_URL}/load_admin`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenRef.current}`
        }
      }
    )
      .then(res => {
        // Merge the default attributes with the loaded strategy data
        const mergedData = { ...defaultAttributesConfig, ...res.data };

        // Update the state to re-render your component
        setData(mergedData);
        // displayAlert('Admin loaded', 'success');
      })
      .catch(error => {
        console.error('Error loading admin:', error);
        displayAlert('Failed to load admin', 'danger');
      });
  };

  // Load data on startup of page mount
  useEffect(() => {
    loadAdmin();
  }, []);




  const handleChange = (attr: keyof IAttributesConfig, value: any) => {
    setData(prevConfig => ({ ...prevConfig, [attr]: value }));
  };

  // Render
  return (
    <div className="container">
      <h2 className="mb-4">Admin</h2>
      <form className={`needs-validation ${validated ? 'was-validated' : ''}`} noValidate onSubmit={saveAdmin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="text" className="form-control" id="email" value={data.login} readOnly required />
          <div className="invalid-feedback">
            Please provide a valid email.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="betfairLogin" className="form-label">Betfair Login</label>
          <input type="text" className="form-control" id="betfairLogin" value={data.BetfairLogin} onChange={(e) => handleChange('BetfairLogin', e.target.value)} required />
          <div className="invalid-feedback">
            Please provide a valid Betfair login.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="betfairPassword" className="form-label">Betfair Password</label>
          <input type="password" className="form-control" id="betfairPassword" value={data.BetfairPassword} onChange={(e) => handleChange('BetfairPassword', e.target.value)} required />
          <div className="invalid-feedback">
            Please provide a valid password.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="betfairToken" className="form-label">Betfair Key
            <a href="https://docs.developer.betfair.com/visualisers/api-ng-account-operations/">
              <div>
                (How to get your key)
              </div>
            </a>
          </label>
          <input type="password" className="form-control" id="betfairToken" value={data.BetfairToken} onChange={(e) => handleChange('BetfairToken', e.target.value)} required />
          <div className="invalid-feedback">
            Please provide a valid application key.
          </div>
        </div>

        {/* Submit button */}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}

export default withAuth(Admin);