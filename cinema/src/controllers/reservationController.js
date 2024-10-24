const mongoose = require('mongoose');
const Salle = require('../models/salleModel');
const Seat = require('../models/seatModel');
const Seance = require('../models/seanceModel');
const Reservation = require('../models/reservationModel');


exports.createReservation = async (req, res) => {
  const { user, seance, numOfSeats } = req.body;

  try {
    const seanceId = await Seance.findById(seance);
    if (!seanceId) {
      return res.status(404).json({ error: 'Session not found' });
    }
;
    const availableSeats = seanceId.availableSeats.filter(seat => !seat.isReserved);     
    
    if (availableSeats.length < numOfSeats) {
      return res.status(400).json({ error: `Not enough available seats. Only ${availableSeats.length} seats are available.` });
    }
 console.log('hi')
    const selectedSeats = availableSeats.slice(0, numOfSeats);


    selectedSeats.forEach(seat => {
     
      
     
      const seatToUpdate = seanceId.availableSeats.find(s => s._id.equals(seat._id));
    
      if (!seatToUpdate) {
        return res.status(404).json({ error: `Seat with id ${seat._id} not found.` });
      }
    
      
      seatToUpdate.isReserved = true;
    });
    
  
    await seanceId.save();
    
    
   
    const reservation = new Reservation({
      user: user,
      seance: seanceId,
      numOfSeats: numOfSeats,
      selectedSeats: selectedSeats.map(seat => seat._id), 
      date: Date.now()
    });

    await reservation.save();

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Error making reservation' });
  }
};


exports.updateReservation = async (req, res) => {
  try {
    const updateReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updateReservation) return res.status(404).json({ message: 'reservation not found' });
    res.json(updateReservation);
  } catch (err) {
    res.status(500).json({ message: 'Error updating reservation', error: err });
  }
};

  