const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const venues = ["Turf Arena", "GameZone", "PlayPalace"];
const sports = ["Football", "Tennis", "Basketball"]; // cycle sports

// Dynamic slot generation per venue & date
function generateSlotsForDateVenue(date, venue) {
  const slots = [];
  const startHour = 8; // 8 AM
  const hoursCount = 12; // 12 slots from 8 AM

  for (let i = 0; i < hoursCount; i++) {
    const hour = startHour + i;
    const time = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? "PM" : "AM"}`;
    const sport = sports[i % sports.length];
    slots.push({
      id: `${venue}-${date}-${hour}`,
      venue,
      date,
      time,
      sport,
      booked: false,
    });
  }
  return slots;
}

// In-memory storage for bookings & booked slots
let bookings = [];
let bookedSlots = new Set();

app.get("/venues", (req, res) => {
  res.json(venues);
});

// Serve slots dynamically per query params (venue optional)
app.get("/slots", (req, res) => {
  const { venue, date } = req.query;
  if (!date) return res.status(400).json({ error: "Date param required" });

  let allSlots = [];
  if (venue) {
    allSlots = generateSlotsForDateVenue(date, venue);
  } else {
    venues.forEach(v => {
      allSlots = allSlots.concat(generateSlotsForDateVenue(date, v));
    });
  }

  // Mark booked slots based on in-memory bookedSlots set
  allSlots = allSlots.map(slot => ({
    ...slot,
    booked: bookedSlots.has(slot.id),
  }));

  res.json(allSlots);
});

// Book slot
app.post("/bookings", (req, res) => {
  const { name, sport, slotId, venue, date } = req.body;

  if (!name || !sport || !slotId || !venue || !date) {
    return res.status(400).json({ error: "Missing booking info" });
  }
  if (bookedSlots.has(slotId)) {
    return res.status(409).json({ error: "Slot already booked" });
  }

  bookings.push({ name, sport, slotId, venue, date });
  bookedSlots.add(slotId);

  res.status(201).json({ message: "Booking confirmed" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
