import React from "react";
import "./BookingForm.css";
import DatePicker from "./DatePicker";
import VenueSelector from "./VenueSelector";
import TimeSlots from "./TimeSlots";

const BookingForm = ({
  venues,
  selectedVenue,
  setSelectedVenue,
  date,
  setDate,
  name,
  setName,
  sport,
  setSport,
  sports,
  onBookNow,
  selectedSlotId,
  setSelectedSlotId,
  availableSlots = [],
}) => {
  return (
    <div className="form-container">
      <h2 className="form-heading">Book Your Slot</h2>

      <div className="form-section">
        <VenueSelector
          venues={venues}
          selectedVenue={selectedVenue}
          setSelectedVenue={setSelectedVenue}
        />

        <DatePicker date={date} setDate={setDate} />
      </div>

      {/* Slot selection visualization */}
      {selectedVenue && date && (
        <div className="slots-section">
          <h3 className="section-title">Available Slots</h3>
          <TimeSlots 
            availableSlots={availableSlots}
            selectedSlotId={selectedSlotId}
            setSelectedSlotId={setSelectedSlotId}
          />
        </div>
      )}

      <div className="form-section user-details">
        <div className="form-group">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., John Doe"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Choose a Sport</label>
          <select
            className="form-input"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          >
            <option value="" disabled>
              Select a sport
            </option>
            {sports.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="book-button"
        onClick={onBookNow}
        disabled={!selectedSlotId || !name || !sport || !date || !selectedVenue}
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingForm;