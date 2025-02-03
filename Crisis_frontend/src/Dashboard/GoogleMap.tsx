import React from "react";

const GoogleMap: React.FC = () => {
  return (
    <iframe
      title="Google Map"
      width="250"
      height="250"
      style={{ border: "0", borderRadius: "10px" }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Mumbai`}
    ></iframe>
  );
};

export default GoogleMap;
