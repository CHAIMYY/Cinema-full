const mongoose = require('mongoose');
const Film = require('../models/filmModel');

exports.createfilm = async (req, res) => {
  try {
    const film = new Film(req.body);
    await film.save();
    res.status(201).json(film);
  } catch (err) {
    res.status(500).json({ message: 'Error creating film', error: err });
  }
};


  exports.getAllfilm = async (req, res) => {
    try {
      const filmslist = await Film.find();
      console.log(filmslist);
      
      res.status(200).json(filmslist);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching films list', error: err });
    }
  };

  exports.getfilmById = async (req, res) => {
    try {
      const film = await Film.findById(req.params.id);
      if (!film) return res.status(404).json({ message: 'film not found' });
      res.json(film);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching film', error: err });
    }
  };

  exports.updateFilm = async (req, res) => {
    try {
      const updateFilm = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updateFilm) return res.status(404).json({ message: 'film not found' });
      res.json(updateFilm);
    } catch (err) {
      res.status(500).json({ message: 'Error updating film', error: err });
    }
  };
  

  exports.deleteFilm = async (req, res) => {
    try {
      const deleteFilm = await Film.findByIdAndDelete(req.params.id);
      if (!deleteFilm) return res.status(404).json({ message: 'film not found' });
      res.json({ message: 'film deleted', film: deleteFilm });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting film', error: err });
    }
  };