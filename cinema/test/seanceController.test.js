const mongoose = require('mongoose');
const Seance = require('../models/seanceModel');
const Salle = require('../models/salleModel');
const Film = require('../models/filmModel');
const seanceController = require('../controllers/seanceController');


jest.mock('../models/seanceModel');
jest.mock('../models/salleModel');
jest.mock('../models/filmModel');

describe('Seance Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createSeance', () => {
    it('should create a new seance and return 201 status', async () => {
      const req = {
        body: {
          film: 'mockedFilmId',
          salle: 'mockedSalleId',
          startTime: '2024-10-01T10:00:00',
          endTime: '2024-10-01T12:00:00',
          price: 10
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockSalle = {
        _id: 'mockedSalleId',
        availableSeats: [
          { number: 1, isReserved: false },
          { number: 2, isReserved: false }
        ]
      };

      const mockFilm = {
        _id: 'mockedFilmId',
        title: 'Film Title'
      };

      
      Salle.findById = jest.fn().mockResolvedValue(mockSalle);
      Film.findById = jest.fn().mockResolvedValue(mockFilm);

      
      Seance.prototype.save = jest.fn().mockResolvedValue({
        _id: 'mockedSeanceId',
        film: 'mockedFilmId',
        salle: 'mockedSalleId',
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        dispo: 2,
        price: req.body.price
      });

      await seanceController.createSeance(req, res);

      expect(Salle.findById).toHaveBeenCalledWith('mockedSalleId');
      expect(Film.findById).toHaveBeenCalledWith('mockedFilmId');
      expect(Seance.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        _id: 'mockedSeanceId',
        film: 'mockedFilmId',
        salle: 'mockedSalleId',
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        dispo: 2,
        price: req.body.price
      });
    });

    it('should return 404 if room not found', async () => {
      const req = {
        body: {
          film: 'mockedFilmId',
          salle: 'mockedSalleId',
          startTime: '2024-10-01T10:00:00',
          endTime: '2024-10-01T12:00:00',
          price: 10
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Salle.findById = jest.fn().mockResolvedValue(null);

      await seanceController.createSeance(req, res);

      expect(Salle.findById).toHaveBeenCalledWith('mockedSalleId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Room not found' });
    });

    it('should return 404 if film not found', async () => {
      const req = {
        body: {
          film: 'mockedFilmId',
          salle: 'mockedSalleId',
          startTime: '2024-10-01T10:00:00',
          endTime: '2024-10-01T12:00:00',
          price: 10
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockSalle = { _id: 'mockedSalleId' };

      Salle.findById = jest.fn().mockResolvedValue(mockSalle);
      Film.findById = jest.fn().mockResolvedValue(null);

      await seanceController.createSeance(req, res);

      expect(Film.findById).toHaveBeenCalledWith('mockedFilmId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Film not found' });
    });
  });

  describe('getAllseance', () => {
    it('should return all seances', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };

      const mockSeances = [
        { _id: 'seance1', film: 'Film 1', salle: 'Salle 1' },
        { _id: 'seance2', film: 'Film 2', salle: 'Salle 2' }
      ];

      Seance.find = jest.fn().mockResolvedValue(mockSeances);

      await seanceController.getAllseance(req, res);

      expect(Seance.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockSeances);
    });

    it('should return 500 if an error occurs', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Seance.find = jest.fn().mockRejectedValue(new Error('Test error'));

      await seanceController.getAllseance(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error fetching seances list',
        error: expect.any(Error)
      });
    });
  });

  describe('updateSeance', () => {
    it('should update a seance and return the updated document', async () => {
      const req = {
        params: { id: 'seance1' },
        body: { price: 20 }
      };
      const res = {
        json: jest.fn()
      };

      const mockUpdatedSeance = { _id: 'seance1', price: 20 };

      Seance.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedSeance);

      await seanceController.updateSeance(req, res);

      expect(Seance.findByIdAndUpdate).toHaveBeenCalledWith('seance1', req.body, { new: true });
      expect(res.json).toHaveBeenCalledWith(mockUpdatedSeance);
    });

    it('should return 404 if the seance is not found', async () => {
      const req = {
        params: { id: 'seance1' },
        body: { price: 20 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Seance.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await seanceController.updateSeance(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'seance not found' });
    });
  });

  describe('deleteSeance', () => {
    it('should delete a seance and return success message', async () => {
      const req = { params: { id: 'seance1' } };
      const res = {
        json: jest.fn()
      };

      const mockDeletedSeance = { _id: 'seance1', film: 'Film 1' };

      Seance.findByIdAndDelete = jest.fn().mockResolvedValue(mockDeletedSeance);

      await seanceController.deleteSeance(req, res);

      expect(Seance.findByIdAndDelete).toHaveBeenCalledWith('seance1');
      expect(res.json).toHaveBeenCalledWith({
        message: 'seance deleted',
        seance: mockDeletedSeance
      });
    });

    it('should return 404 if the seance is not found', async () => {
      const req = { params: { id: 'seance1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Seance.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await seanceController.deleteSeance(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'seance not found' });
    });
  });
});
