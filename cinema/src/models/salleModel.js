const mongoose = require('mongoose');
const Seat = require("./seatModel");
const Schema = mongoose.Schema;


const seatSchema = new Schema({
  number: { 
  type: Number,
  required: true 
  }, 
  isReserved: {
  type: Boolean, 
  default: false 
  } 
});



const salleSchema = new Schema({
  name: 
 { type: String,
     required: true 
 },

 capacity:
 { type: Number,
   required: true 
 },

//  availableSeats: [{ 
 
//     number: { 
//     type: String,
//     required: true 
//     }, 
  
//     isReserved: {
//     type: Boolean, 
//     default: false 
   
//   }
// }],

availableSeats : [seatSchema],
  location: { 
    type: String,
    required: true
},
  

}, {
  timestamps: true, 
});


module.exports = mongoose.model('Salle', salleSchema);