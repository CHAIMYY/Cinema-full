const mongoose = require('mongoose');

const Salle = require("./salleModel");
const Schema = mongoose.Schema;


const seatSchema = new Schema({
    number: { 
    type: String,
    required: true 
    }, 
    isReserved: {
    type: Boolean, 
    default: false 
    } 
  });
  
  module.exports = mongoose.model('Seat', seatSchema);
  

