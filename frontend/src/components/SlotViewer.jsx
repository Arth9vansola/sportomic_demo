import React, { useEffect, useState } from "react";
import SlotList from "./SlotList";

const SlotViewer = ({ selectedVenue, date, name, sport }) => {
  const [slots, setSlots] = useState([]);

  // Polling: fetch slots every 5 seconds
  useEffect(() => {
    const fetchSlots = async () => {
      if (selectedVenue && date) {
        try {
          const res = await fetch(`https://sportomic-backend-task.onrender.com/slots?venue=${selectedVenue}&date=${date}`);
          const data = await res.json();
          setSlots(data);
        } catch (err) {
          console.error("Error fetching slots:", err);
        }
      }
    };

    fetchSlots(); // initial call
    const interval = setInterval(fetchSlots, 5000); // poll every 5s

    return () => clearInterval(interval); // cleanup
  }, [selectedVenue, date]);

  const handleBooking = async (slotId, name, date, sport) => {
    try {
      const res = await fetch(`http://localhost:5000/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: slotId, name, date, sport }),
      });
      const result = await res.json();
      if (result.success) {
        alert("Slot booked successfully!");
      } else {
        alert("Failed to book the slot.");
      }
    } catch (err) {
      alert("Error booking the slot.");
      console.error(err);
    }
  };

  return (
    <div>
      {selectedVenue && date ? (
        <SlotList
          slots={slots}
          handleBooking={handleBooking}
          name={name}
          date={date}
          sport={sport}
        />
      ) : (
        <p style={{ color: "#ccc" }}>Please select both venue and date to view slots.</p>
      )}
    </div>
  );
};

export default SlotViewer;
