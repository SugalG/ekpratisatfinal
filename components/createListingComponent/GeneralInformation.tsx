import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useRef, useEffect } from "react";
import { Library } from "@googlemaps/js-api-loader"; // Import the Library type

// Define the libraries array using the Library type
const libraries: Library[] = ["places"];

const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "300px",
  position: "relative",
};

const center = {
  lat: 27.7172, // Default to Kathmandu
  lng: 85.3240,
};

export default function GeneralInformation({ formData, handleChange, setFormData }: any) {
  const [marker, setMarker] = useState<{ lat: number; lng: number }>({
    lat: formData.latitude || center.lat,
    lng: formData.longitude || center.lng,
  });

  const searchBoxRef = useRef<HTMLInputElement>(null);

  // Initialize the search box with autocomplete
  useEffect(() => {
    if (searchBoxRef.current) {
      console.log("Initializing Autocomplete...");
      const autocomplete = new google.maps.places.Autocomplete(searchBoxRef.current, {
        types: ["geocode"],
      });
      console.log("Autocomplete initialized:", autocomplete);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Place selected:", place);
        if (!place.geometry || !place.geometry.location) {
          console.log("No location found for the selected place.");
          return;
        }

        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarker(newLocation);
        setFormData((prevState: any) => ({
          ...prevState,
          latitude: newLocation.lat,
          longitude: newLocation.lng,
        }));
      });
    }
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarker(newLocation);
      // handleChange({ target: { name: "latitude", value: newLocation.lat } });
      // handleChange({ target: { name: "longitude", value: newLocation.lng } });
      setFormData((prevState: any) => ({
        ...prevState,
        latitude: newLocation.lat,
        longitude: newLocation.lng,
      }));
    }
  };

  const handleMarkerDragEnd = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarker(newLocation);
      setFormData((prevState: any) => ({
        ...prevState,
        latitude: newLocation.lat,
        longitude: newLocation.lng,
      }));
    }
  };

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">TITLE</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 text-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">DESCRIPTION</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 text-lg focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">PRICE</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 text-lg focus:ring-2 focus:ring-blue-500"
          max="999999999"
          required
        />
      </div>

      {/* Location Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">LOCATION</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-2 border-gray-300 p-3 text-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Google Map Integration for Selecting Location */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">SELECT LOCATION ON MAP</label>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={libraries}>
          <div style={mapContainerStyle}>
            {/* Search Box */}
            <input
              ref={searchBoxRef}
              type="text"
              placeholder="Search for a location"
              style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "300px",
                padding: "10px",
                zIndex: 10,
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              }}
            />
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              zoom={14}
              center={marker}
              onClick={handleMapClick}
            >
              <Marker
                position={marker}
                draggable={true}
                onDragEnd={handleMarkerDragEnd}
              />
            </GoogleMap>
          </div>
        </LoadScript>
      </div>
    </>
  );
}