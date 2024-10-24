const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
        type: String,
        enum: ['romantic', 'modhik'], 
        required: true,
      },
      
    duration: {
      type: String,
      required: true,
    },
   
    language: {
      type: String,
      required: true,
    },
  

  }, {
    timestamps: true, 
  });

  module.exports = mongoose.model('Film', filmSchema);
// module.exports = Film;