const mongoose = require('mongoose');
const Salle = require('../models/salleModel');
const Seat = require('../models/seatModel');
const Seance = require('../models/seanceModel');




exports.createSalle = async (req, res) => {
  const { name, capacity , location } = req.body;

  try {

    const seats = [];
    for (let i = 1; i <= capacity; i++) {
      seats.push({
        number: i,
        isReserved: false
      });

     
    }


    const newSalle = new Salle({
      name,
      capacity,
      availableSeats: seats,
      location
    });

    const createdSalle = await newSalle.save();
    res.status(201).json(createdSalle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





exports.getAllsalle = async (req, res) => {
  try {
    const sallelist = await Salle.find();
    res.json(sallelist);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching salle list', error: err });
  }
};

exports.updateSalle = async (req, res) => {
  try {
    const updateSalle = await Salle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updateSalle) return res.status(404).json({ message: 'salle not found' });
    res.json(updateSalle);
  } catch (err) {
    res.status(500).json({ message: 'Error updating salle', error: err });
  }
};

exports.deleteSalle = async (req, res) => {
  try {
    const deleteSalle = await Salle.findByIdAndDelete(req.params.id);
    if (!deleteSalle) return res.status(404).json({ message: 'salle not found' });
    res.json({ message: 'salle deleted', salle: deleteSalle });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting salle', error: err });
  }
};