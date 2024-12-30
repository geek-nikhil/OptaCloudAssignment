import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddressSearch() {
  const [searchQuery, setSearchQuery] = useState(""); // Holds the search input
  const [suggestions, setSuggestions] = useState([]); // Holds the suggestions
  const [loading, setLoading] = useState(false); // For loading state
  const [selectedAddress, setSelectedAddress] = useState(""); // To hold the selected address
  const [isAddressSaved, setIsAddressSaved] = useState(false); // To track if address is saved
  const email = useSelector((state) => state.user.email);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(searchQuery)}&key=AlzaSyxKkcmlSmPSgcCBGBiLTnf8il-6LRkR3Ps`
      );
      const data = await response.json();
      if (data.predictions) {
        setSuggestions(data.predictions);
      }
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address.description);
    setSuggestions([]); // Clear suggestions after selection
    setIsAddressSaved(false); // Reset saved state
  };

  const handleSaveAddress = async () => {
    if (!selectedAddress) {
      alert("No address selected to save.");
      return;
    }

    // Replace with your backend API URL
    const apiUrl = 'http://localhost:5000/user/add-address';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, newAddress: selectedAddress }),
      });

      if (response.ok) {
        alert("Address saved successfully!");
        setIsAddressSaved(true); // Mark the address as saved
        navigate('/user-info');
      } else {
        alert("Error saving address.");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Error saving address.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="relative mb-4">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/user-info')}
          className="absolute top-5 -left-20  transform -translate-y-1/2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Back
        </button>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={handleSearch} // Trigger search on typing
          placeholder="Search for a location"
          className="w-full md:w-2/3 lg:w-1/2 p-4 ml-44 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {loading && <p className=' ml-44 '>Loading...</p>}

      <div>
        {suggestions.length > 0 && !loading && (
          <ul className="list-none p-0">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => handleSelectAddress(suggestion)}
                className="cursor-pointer p-2 border-b border-gray-300 hover:bg-gray-100  ml-44 "
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedAddress && (
        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-6">
          <p className="text-xl font-semibold text-gray-800">
            <strong>Selected Address:</strong> {selectedAddress}
          </p>
          {!isAddressSaved && (
            <button
              onClick={handleSaveAddress}
              className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 focus:outline-none"
            >
              Save Address
            </button>
          )}
        </div>
      )}

      {isAddressSaved && <p className="text-green-500 mt-4">Address has been saved!</p>}
    </div>
  );
}

export default AddressSearch;
