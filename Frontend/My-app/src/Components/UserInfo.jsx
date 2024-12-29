import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserInfo() {
  const [address, setAddress] = useState(""); // To store address input by the user
  const [currentAddress, setCurrentAddress] = useState(""); // To store the fetched address from the backend
  const [showLocationPrompt, setShowLocationPrompt] = useState(false); // To show the prompt for choosing location input method
  const navigate = useNavigate(); // Hook for navigation

  // Handle input change for address
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  // Handle form submission to add the address
  const handleAddAddress = async (event) => {
    event.preventDefault();

    // Replace with your backend API URL
    const apiUrl = 'https://your-backend-api.com/add-address';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: address }),
      });

      if (response.ok) {
        // Successfully added the address, fetch updated address
        fetchAddress();
        setAddress(""); // Clear the input field
      } else {
        console.log('Error adding address');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch the address from the backend when the component mounts
  const fetchAddress = async () => {
    // Replace with your backend API URL to get the address
    const apiUrl = 'https://your-backend-api.com/get-address';

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data.address) {
        setCurrentAddress(data.address); // Set the fetched address
      } else {
        setCurrentAddress(""); // Set to empty if no address found
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  // Handle geolocation to fetch the address
  const handleLocationFetch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddressFromLocation(latitude, longitude);
        },
        () => {
          console.log("Error fetching current location");
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const fetchAddressFromLocation = async (lat, lng) => {
    // Replace with your geocoding API URL
    const geocodeUrl = `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === "OK" && data.results && data.results[0]) {
        setCurrentAddress(data.results[0].formatted_address);
        setAddress(data.results[0].formatted_address); // Set address from geolocation
      } else {
        console.log("No address found for this location");
      }
    } catch (error) {
      console.error('Error fetching address from geolocation:', error);
    }
  };

  // Fetch the address when the component mounts
  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div>
      <h2>User Address</h2>

      {/* Display the current address if available */}
      {currentAddress ? (
        <div>
          <p><strong>Current Address:</strong> {currentAddress}</p>
        </div>
      ) : (
        <p>No address set</p>
      )}

      {/* Button to prompt for location or manual entry */}
      <button onClick={() => setShowLocationPrompt(true)}>Add Address</button>

      {/* If the prompt is shown, ask user how they want to add the address */}
      {showLocationPrompt && (
        <div>
          <p>Would you like to:</p>
          <button onClick={() => navigate('/address')}>Locate Yourself</button>
          <button onClick={() => navigate('/address-search')}>Enter Address Manually</button>
        </div>
      )}

      {/* Show manual input form if user chooses to enter address manually */}
      {showLocationPrompt && (
        <form onSubmit={handleAddAddress}>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter new address"
          />
          <button type="submit">Add Address</button>
        </form>
      )}
    </div>
  );
}

export default UserInfo;
