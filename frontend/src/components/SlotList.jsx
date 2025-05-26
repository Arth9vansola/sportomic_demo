import React from 'react';
import './SlotList.css';

const SlotList = ({ slots, selectedSlotId, setSelectedSlotId }) => {
  return (
    <div className="slot-list">
      {slots.map((slot) => (
        <button
          key={slot.id}
          className={`slot-button ${slot.booked ? 'booked' : 'available'} ${
            selectedSlotId === slot.id ? 'selected' : ''
          }`}
          onClick={() => !slot.booked && setSelectedSlotId(slot.id)}
          disabled={slot.booked}
        >
          {slot.time}
          {slot.booked && <span className="booked-tag">BOOKED</span>}
        </button>
      ))}
    </div>
  );
};

export default SlotList;