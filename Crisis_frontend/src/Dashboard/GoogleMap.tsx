import React from "react";

interface GoogleMapProps {
  location: { lat: number; lng: number };
}

const GoogleMap: React.FC<GoogleMapProps> = ({ location }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <p>Please set the Google Maps API key in the environment variables.</p>;
  }

  return (
    <iframe
      title="Google Map"
      width="100%"
      height="300"
      style={{ border: "0", borderRadius: "10px" }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${location.lat},${location.lng}&zoom=14`}
    ></iframe>
  );
};

export default GoogleMap;
