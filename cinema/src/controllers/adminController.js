const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createAdmin = async function(req, res) {
    try {
    
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'You are not authorized to create admins.' });
      }
  
      const newAdmin = new User(req.body);
      newAdmin.hash_password = bcrypt.hashSync(req.body.password, 10);
      newAdmin.role = 'admin'; 
      
      const admin = await newAdmin.save();
      admin.hash_password = undefined;
      return res.json(admin);
      
    } catch (err) {
      console.log('Admin Creation Error: ', err);
      return res.status(400).json({ message: err.message });
    }
  };

  exports.getAlladmin= async (req, res) => {
    try {
        const adminlist = await User.find({ role: 'admin' });
      res.json(adminlist);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching admins list', error: err });
    }
  };

  exports.updateadmin = async (req, res) => {
    try {
      const updateadmin = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updateadmin) return res.status(404).json({ message: 'admin not found' });
      res.json(updateadmin);
    } catch (err) {
      res.status(500).json({ message: 'Error updating admin', error: err });
    }
  };

  exports.deleteadmin = async (req, res) => {
    try {
      const deleteadmin = await User.findByIdAndDelete(req.params.id);
      if (!deleteadmin) return res.status(404).json({ message: 'admin not found' });
      res.json({ message: 'admin deleted', User: deleteadmin });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting admin', error: err });
    }
  };
  