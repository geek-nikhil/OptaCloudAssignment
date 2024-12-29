import React, { useState } from 'react';

function AddressSearch() {
  const [searchQuery, setSearchQuery] = useState(""); // Holds the search input
  const [suggestions, setSuggestions] = useState([]); // Holds the suggestions
  const [loading, setLoading] = useState(false); // For loading state
  const [selectedAddress, setSelectedAddress] = useState(""); // To hold the selected address

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
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={handleSearch} // Trigger search on typing
          placeholder="Search for a location"
          className="form-control"
        />
      </div>

      {loading && <p>Loading...</p>}

      <div className="suggestions">
        {suggestions.length > 0 && !loading && (
          <ul>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                onClick={() => handleSelectAddress(suggestion)}
                style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ddd' }}
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedAddress && (
        <div>
          <p><strong>Selected Address:</strong> {selectedAddress}</p>
        </div>
      )}
    </div>
  );
}

export default AddressSearch;
