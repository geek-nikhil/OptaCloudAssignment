import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clearEmail } from '../utilities/emailReducer'; // Adjust path to your slice
import { useDispatch } from 'react-redux';

function UserInfo() {
  const dispatch = useDispatch();
  const [address, setAddress] = useState(""); // To store new address input
  const [addresses, setAddresses] = useState([]); // To store all addresses fetched from the backend
  const [showLocationPrompt, setShowLocationPrompt] = useState(false); // To show the prompt for choosing location input method
  const navigate = useNavigate(); // Hook for navigation
  const email = useSelector((state) => state.user.email); // Fetch email from Redux store
  const [showForm, setShowForm] = useState(false);
  // Handle input change for address
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  
  async function deleted(add) {
    const apiUrl = 'http://localhost:5000/user/delete-address';
    
    const response = await fetch(apiUrl, {
      method: 'POST', // Keep POST if preferred on the backend
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, address: add }),
    });
    
    if (response.ok) {
      console.log('Address deleted successfully');
      fetchAddresses(); // Refresh addresses after deletion
    } else {
      console.log('Error deleting address');
    }
  }
  
  const handleLogout = () => {
    // Dispatch action to clear email from Redux store
    dispatch(clearEmail());
    
    // Navigate to the home page
    navigate('/');
  };
  
  // Handle form submission to add the address
  // const handleAddAddress = async (event) => {
    //   event.preventDefault();
    
    //   if (!email) {
      //     console.log('User email not found in Redux store.');
      //     return;
      //   }
      
      //   // Replace with your backend API URL
      //   const apiUrl = 'https://your-backend-api.com/user/add-address';
      
      //   try {
        //     const response = await fetch(apiUrl, {
          //       method: 'POST',
          //       headers: {
            //         'Content-Type': 'application/json',
            //       },
  //       body: JSON.stringify({ email, newAddress: address }),
  //     });
  
  //     if (response.ok) {
    //       console.log('Address added successfully.');
    //       fetchAddresses(); // Refresh addresses after adding
    //       setAddress(""); // Clear the input field
    //     } else {
      //       console.log('Error adding address');
      //     }
      //   } catch (error) {
        //     console.error('Error:', error);
        //   }
        // };
        
        if(email === ""){
          navigate("/");
        }
  // Fetch all addresses for the user from the backend
  const fetchAddresses = async () => {
    if (!email) {
      console.log('User email not found in Redux store.');
      return;
    }

    // Replace with your backend API URL
    const apiUrl = `http://localhost:5000/user/get-addresses?email=${email}`;

    try {
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        setAddresses(data.addresses || []); // Update the addresses state
      } else {
        console.log('Error fetching addresses');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  // Fetch the addresses when the component mounts
  useEffect(() => {
    fetchAddresses();
  }, [email]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-4">
      <h2 className="text-2xl font-semibold">Your Addresses</h2>
      <div className="absolute top-8 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
      <div>
      {/* Profile Text */}
      <p
        onClick={() => setShowForm(true)}
        className="text-xl font-semibold text-blue-500 cursor-pointer absolute top-4 right-4"
      >
        Profile
      </p>

      {/* Display Gmail when profile text is clicked */}
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-center mb-4">Your Gmail</h2>
            <p className="text-lg text-center mb-4">{email}</p> {/* Display Gmail here */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowForm(false)}
                className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
      {/* Display the list of addresses */}
      {addresses.length > 0 ? (
        <div className="w-full max-w-lg">
          <h3 className="text-lg font-semibold mb-4">Saved Addresses:</h3>
          <div className="space-y-4">
            {addresses.map((addr, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white"
              >
                <p className="text-lg font-medium">{addr}</p>
                <button
                  className="btn btn-primary ml-4"
                  onClick={() => deleted(addr)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center">No addresses found</p>
      )}

      {/* Button to prompt for location or manual entry */}
      <button
  onClick={() => setShowLocationPrompt(true)}
  className="btn btn-secondary py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
>
  Add Address
</button>

{/* If the prompt is shown, ask user how they want to add the address */}
{showLocationPrompt && (
  <div className="flex flex-col items-center space-y-6 mt-6 p-6 bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
    <p className="text-lg font-semibold text-gray-800 mb-4">Would you like to:</p>
    <button
      onClick={() => navigate('/address')}
      className="btn btn-primary py-2 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md"
    >
      Locate Yourself
    </button>
    <button
      onClick={() => navigate('/address-search')}
      className="btn btn-primary py-2 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-md"
    >
      Enter Address Manually
    </button>
  </div>
)}
    </div>
  );
}


export default UserInfo;
