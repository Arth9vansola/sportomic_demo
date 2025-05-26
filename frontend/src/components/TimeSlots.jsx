import React from 'react';
import './TimeSlots.css';

const TimeSlots = ({ availableSlots, selectedSlotId, setSelectedSlotId }) => {
  return (
    <div className="time-slots-container">
      <div className="time-slots-grid">
        {availableSlots.map(slot => (
          <div 
            key={slot.id}
            className={`time-slot ${slot.isBooked ? 'booked' : 'available'} ${selectedSlotId === slot.id ? 'selected' : ''}`}
            onClick={() => !slot.isBooked && setSelectedSlotId(slot.id)}
          >
            <span className="slot-time">{slot.time}</span>
            {slot.isBooked && <span className="booked-badge">Booked</span>}
          </div>
        ))}
        
        {availableSlots.length === 0 && (
          <div className="no-slots-message">No slots available for selected date and venue</div>
        )}
      </div>
      
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-color booked"></div>
          <span>Booked</span>
        </div>
        <div className="legend-item">
          <div className="legend-color selected"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export default TimeSlots;