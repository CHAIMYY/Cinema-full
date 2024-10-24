const mongoose = require('mongoose');
const Film = require("./filmModel");
const Salle = require("./salleModel");
const Seat = require("./seatModel");
const Schema = mongoose.Schema;


const seanceSchema = new Schema({
  film: { type: Schema.Types.ObjectId, ref: 'Film' },
  salle: { type: Schema.Types.ObjectId, ref: 'Salle' },
  startTime: Date,
  endTime: Date,
  price: Number,
  dispo: Number,
  availableSeats: [
    {
      number: Number,
      isReserved: Boolean
    }
  ]
});


const seanceModel = mongoose.model("seances", seanceSchema);

module.exports = seanceModel;