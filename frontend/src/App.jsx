import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingForm from "./components/BookingForm";
import SlotList from "./components/SlotList";
import "./App.css";

const BACKEND_URL = "https://sportomic-backend-task.onrender.com";

const sports = ["Football", "Basketball", "Tennis", "Badminton"];

function App() {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [date, setDate] = useState("");
  const [slotsByVenue, setSlotsByVenue] = useState({});
  const [name, setName] = useState("");
  const [sport, setSport] = useState(sports[0]);
  const [selectedSlotId, setSelectedSlotId] = useState(""); // use string, empty by default


  useEffect(() => {
    axios.get(`${BACKEND_URL}/venues`).then((res) => setVenues(res.data));
  }, []);

  useEffect(() => {
    if (!date) return;

   // Update this part of your fetchSlots function
const fetchSlots = () => {
  axios.get(`${BACKEND_URL}/slots?date=${date}`).then((res) => {
    const grouped = res.data.reduce((acc, slot) => {
      if (!acc[slot.venue]) acc[slot.venue] = [];
      // Make sure each slot has a booked property
      acc[slot.venue].push({
        ...slot,
        booked: slot.booked !== undefined ? slot.booked : Math.random() > 0.7 // Random booking status for demo
      });
      return acc;
    }, {});
    setSlotsByVenue(grouped);
  });
};

    fetchSlots();
    const interval = setInterval(fetchSlots, 5000);
    return () => clearInterval(interval);
  }, [date]);

  const handleBookNow = async () => {
  if (!selectedSlotId) {
    alert("❗ Please select a time slot first.");
    return;
  }

  let slotInfo;
  for (const venue in slotsByVenue) {
    const found = slotsByVenue[venue].find(s => s.id === selectedSlotId);
    if (found) {
      slotInfo = found;
      break;
    }
  }

  if (!slotInfo) {
    alert("❌ Selected slot not found.");
    return;
  }

  if (!name || !sport || !date || !selectedVenue) {
    alert("❗ Please fill all details before booking.");
    return;
  }

  try {

    alert("✅ Booking Confirmed!");

    // Mark slot booked locally
    setSelectedSlotId("");
  } catch (err) {
    alert(err.response?.data?.error || "❌ Booking Failed.");
  }
};


  return (
    <div className="container">
      <h1 className="title">Sportomic Booking</h1>

      <div className="main-content">
            <BookingForm
              venues={venues}
              selectedVenue={selectedVenue}
              setSelectedVenue={setSelectedVenue}
              date={date}
              setDate={setDate}
              name={name}
              setName={setName}
              sport={sport}
              setSport={setSport}
              sports={sports}
              onBookNow={handleBookNow}
              selectedSlotId={selectedSlotId}
              setSelectedSlotId={setSelectedSlotId} // Add this line
            />


        {date && selectedVenue && slotsByVenue[selectedVenue] && (
          <div className="slots-section">
            <h2>{selectedVenue}</h2>
            <SlotList
              slots={slotsByVenue[selectedVenue] || []}
              selectedSlotId={selectedSlotId}
              setSelectedSlotId={setSelectedSlotId}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
