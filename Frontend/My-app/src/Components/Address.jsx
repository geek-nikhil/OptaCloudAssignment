import { Fragment, useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
function Address() {
  const email = useSelector((state) => state.user.email);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA4AxZy-wrY6vMM4PBdQcc9N2ScQcbn6Q8", // Your Google Maps API Key
  });

  const [activeMarker, setActiveMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([ // List of markers initially
    {
      id: 1,
      name: "Qobustan",
      position: { lat: 40.0709493, lng: 49.3694411 },
    },
    {
      id: 2,
      name: "Sumqayit",
      position: { lat: 40.5788843, lng: 49.5485073 },
    },
    {
      id: 3,
      name: "Baku",
      position: { lat: 40.3947365, lng: 49.6898045 },
    },
  ]);

   // Get the current location of the user
  async function save(){
    console.log("object")
    const apiUrl = 'http://localhost:5000/user/add-address';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email : email ,  newAddress: address }),
    });     if(response.ok){
       setAddress("");
       console.log(response)
       navigate('/user-info')
      }else{
       console.log("error");
   }
  }




  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          setCurrentLocation({ lat: latitude, lng: longitude });
          logAddress(latitude, longitude); // Log the address for the current location
        },
        () => {
          console.log("Error fetching current location");
          setCurrentLocation(null);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setCurrentLocation(null);
    }
  }, []);

  const logAddress = useCallback((lat, lng) => {
    const roundedLat = parseFloat(lat).toFixed(4);
    const roundedLng = parseFloat(lng).toFixed(4);

    console.log("Logging address for latitude:", roundedLat, "and longitude:", roundedLng);

    const geocodeUrl = `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${roundedLat},${roundedLng}&key=AlzaSyxKkcmlSmPSgcCBGBiLTnf8il-6LRkR3Ps`;

    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Geocoding API response: ", data);
        if (data.status === "OK" && data.results && data.results[0]) {
          console.log("Address:", data.results[0].formatted_address);
          setAddress(data.results[0].formatted_address);
        } else {
          console.log("No address found for this location or status is not OK");
        }
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Remove the old marker and add a new one at the clicked location
    setMarkers([{
      id: 1,  // You can assign a fixed ID for now
      name: `New Location`,
      position: { lat, lng },
    }]);

    setCurrentLocation({ lat, lng });
    logAddress(lat, lng);
  };

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          logAddress(latitude, longitude);
        },
        () => {
          console.log("Error fetching current location");
          setCurrentLocation(null);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setCurrentLocation(null);
    }
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      setActiveMarker(null);
    } else {
      setActiveMarker(marker);
      const markerData = markers.find((m) => m.id === marker);
      if (markerData) {
        logAddress(markerData.position.lat, markerData.position.lng);
      }
    }
  };

  if (!isLoaded) return <div>Loading Google Map...</div>;

  return (
    <>
<Fragment>
  <div className="container-fluid d-flex flex-column align-items-center">
  <h1 className="text-center text-2xl font-semibold text-gray-800 mb-8 w-full">
  Put marker on desired location
</h1>
    <div className="d-flex w-100 justify-content-between">
        <button 
            onClick={() => navigate('/user-info')}
            style={{
              position: 'absolute',
              left: '10px',
              top: '9%',
              transform: 'translateY(-50%)',
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Back to home
          </button>
          <button
  className="py-2 px-6 mb-3 mt-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 focus:outline-none transition-all duration-300 transform hover:scale-105 active:scale-95"
  onClick={handleCurrentLocationClick}
  style={{ flexShrink: 0 }}
>
  Use Current Location
</button>


      <div
        style={{
          flexGrow: 1,
          height: "42.67vh", // 2/3 of the viewport height
          marginLeft: "1rem",
        }}
      >
        <GoogleMap
          center={currentLocation || { lat: 40.3947365, lng: 49.6898045 }}
          zoom={10}
          onClick={handleMapClick}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {/* Display the current location marker */}
          {currentLocation && (
            <MarkerF
              position={currentLocation}
              icon={{
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: { width: 50, height: 50 },
              }}
            />
          )}

          {/* Display only the latest marker */}
          {markers.map(({ id, name, position }) => (
            <MarkerF
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
              onMouseOver={() => logAddress(position.lat, position.lng)}
            >
              {activeMarker === id ? (
                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                  <div>
                    <p>{name}</p>
                  </div>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          ))}
        </GoogleMap>
      </div>
    </div>
  </div>
</Fragment>
{address && (
  <div className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl shadow-xl bg-white max-w-md mx-auto mt-8">
    <p className="text-center text-lg font-medium text-gray-800 mb-4">{address}</p>   
    <button 
      className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none transition duration-300 transform hover:scale-105 active:scale-95"
      onClick={() => save()}
    >
      Save
    </button>
  </div>
)}

    </>
  );
}

export default Address;
