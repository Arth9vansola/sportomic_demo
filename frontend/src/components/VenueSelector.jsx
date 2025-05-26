import React from "react";
import "./VenueSelector.css";

const VenueSelector = ({ venues, selectedVenue, setSelectedVenue }) => {
  return (
    <div className="venue-selector-container">
      <label className="venue-label">Select Venue</label>
      <select
        className="venue-dropdown"
        value={selectedVenue}
        onChange={(e) => setSelectedVenue(e.target.value)}
      >
        <option value="">-- Choose a Venue --</option>
        {venues.map((venue, index) => (
          <option key={index} value={venue}>
            {venue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VenueSelector;
