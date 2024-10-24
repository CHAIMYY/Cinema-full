
const mongoose = require('mongoose');
const Seance = require('../models/seanceModel');
const Salle = require('../models/salleModel');
const Film = require('../models/filmModel');

// exports.createSeance = async (req, res) => {
//     try {
//       const seance = new Seance(req.body);
//       await seance.save();
//       res.status(201).json(seance);
//     } catch (err) {
//       res.status(500).json({ message: 'Error creating seance', error: err });
//     }
//   };

// exports.createSeance = async (req, res) => {
  
//     const { film, salle, startTime, endTime , dispo , tarif} = req.body;
//     // .populate('capacity')
   
//     try {
//       const room = await Salle.findById(salle);
//       if (!room) {
//         return res.status(404).json({ error: 'Room not found' });
//       }
     
     
//       const availableSeats = room.availableSeats.filter(seat => !seat.isReserved).length;
//       // const availableSeats = room.availableSeats.filter(Seat => Seat.availableS).length;

//   console.log('hi');

//       if (availableSeats === 0) {
//         return res.status(400).json({ message: 'No available seats in the room' });
//       }

//       const seance = new Seance({
//         film,
//         salle: room,
//         startTime,
//         endTime,
//         dispo: availableSeats ,
//         tarif
//       });
  
//       await seance.save();
//       res.status(201).json(seance);
//     } catch (error) {
//       res.status(500).json({ error: 'Error creating session' });
//     }
//   };
exports.createSeance = async (req, res) => {
  const { film, salle, startTime, endTime, price } = req.body;

  try {
    const room = await Salle.findById(salle);
    
console.log('Room details:', room);
console.log('All available seats:', room.availableSeats); 

    const filmDetails = await Film.findById(film);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (!filmDetails) {
      return res.status(404).json({ error: 'Film not found' });
    }

    
    const availableSeats = room.availableSeats.filter(seat => !seat.isReserved);

    if (availableSeats.length === 0) {
      return res.status(400).json({ message: 'No available seats in the room' });
    }

    
    const seance = new Seance({
      film: filmDetails._id,
      salle: room._id,
      startTime,
      endTime,
      dispo: availableSeats.length, 
      price,
      availableSeats 
    });

    await seance.save();

    res.status(201).json(seance);

  } catch (error) {
    console.log('Error creating session:', error);
    res.status(500).json({ error: 'Error creating session' });
  }
};



exports.getAllseance = async (req, res) => {
    try {
      const seancelist = await Seance.find();
      res.json(seancelist);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching seances list', error: err });
    }
  };  

  exports.updateSeance = async (req, res) => {
    try {
      const updateSeance = await Seance.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updateSeance) return res.status(404).json({ message: 'seance not found' });
      res.json(updateSeance);
    } catch (err) {
      res.status(500).json({ message: 'Error updating seance', error: err });
    }
  };

  exports.deleteSeance = async (req, res) => {
    try {
      const deleteSeance = await Seance.findByIdAndDelete(req.params.id);
      if (!deleteSeance) return res.status(404).json({ message: 'seance not found' });
      res.json({ message: 'seance deleted', seance: deleteSeance });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting seance', error: err });
    }
  };

