const mongoose = require('mongoose');
const Salle = require('../models/salleModel');
const salleController = require('../controllers/salleController');


jest.mock('../models/salleModel');

describe('Salle Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  describe('createSalle', () => {
    it('should create a new salle and return 201 status', async () => {
      const req = {
        body: {
          name: 'Salle A',
          capacity: 100,
          location: 'Downtown'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

     
      Salle.prototype.save = jest.fn().mockResolvedValue({
        _id: 'mockedId',
        name: req.body.name,
        capacity: req.body.capacity,
        location: req.body.location,
        availableSeats: Array(100).fill({ number: 1, isReserved: false })
      });

      await salleController.createSalle(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        _id: 'mockedId',
        name: req.body.name,
        capacity: req.body.capacity,
        location: req.body.location,
        availableSeats: expect.any(Array)
      });
    });

    it('should return 400 if an error occurs', async () => {
      const req = {
        body: {
          name: 'Salle A',
          capacity: 100,
          location: 'Downtown'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Salle.prototype.save = jest.fn().mockRejectedValue(new Error('Test error'));

      await salleController.createSalle(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Test error' });
    });
  });

  describe('getAllsalle', () => {
    it('should return the list of all salles', async () => {
      const req = {};
      const res = {
        json: jest.fn()
      };

      const mockSalleList = [
        { _id: 'mockedId1', name: 'Salle A', capacity: 100, location: 'Location A' },
        { _id: 'mockedId2', name: 'Salle B', capacity: 50, location: 'Location B' }
      ];

      Salle.find = jest.fn().mockResolvedValue(mockSalleList);

      await salleController.getAllsalle(req, res);

      expect(Salle.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockSalleList);
    });

    it('should return 500 if an error occurs', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Salle.find = jest.fn().mockRejectedValue(new Error('Test error'));

      await salleController.getAllsalle(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching salle list', error: expect.any(Error) });
    });
  });

  describe('updateSalle', () => {
    it('should update the salle and return the updated salle', async () => {
      const req = {
        params: { id: 'mockedId' },
        body: { name: 'Updated Salle' }
      };
      const res = {
        json: jest.fn()
      };

      const updatedSalle = { _id: 'mockedId', name: 'Updated Salle', capacity: 100, location: 'Downtown' };

      Salle.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedSalle);

      await salleController.updateSalle(req, res);

      expect(Salle.findByIdAndUpdate).toHaveBeenCalledWith('mockedId', req.body, { new: true });
      expect(res.json).toHaveBeenCalledWith(updatedSalle);
    });

    it('should return 404 if salle is not found', async () => {
      const req = { params: { id: 'mockedId' }, body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Salle.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await salleController.updateSalle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'salle not found' });
    });

    it('should return 500 if an error occurs', async () => {
      const req = { params: { id: 'mockedId' }, body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Salle.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Test error'));

      await salleController.updateSalle(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error updating salle', error: expect.any(Error) });
    });
  });

  describe('deleteSalle', () => {
    it('should delete the salle and return success message', async () => {
      const req = { params: { id: 'mockedId' } };
      const res = {
        json: jest.fn()
      };

      const deletedSalle = { _id: 'mockedId', name: 'Salle A' };

      Salle.findByIdAndDelete = jest.fn().mockResolvedValue(deletedSalle);

      await salleController.deleteSalle(req, res);

      expect(Salle.findByIdAndDelete).toHaveBeenCalledWith('mockedId');
      expect(res.json).toHaveBeenCalledWith({ message: 'salle deleted', salle: deletedSalle });
    });

    it('should return 404 if salle is not found', async () => {
      const req = { params: { id: 'mockedId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Salle.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await salleController.deleteSalle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'salle not found' });
    });

    it('should return 500 if an error occurs', async () => {
      const req = { params: { id: 'mockedId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      Salle.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Test error'));

      await salleController.deleteSalle(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting salle', error: expect.any(Error) });
    });
  });
});
