const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const auth = require('../middleware/authMiddleware');

// Get all pets for current user
router.get('/', auth, async (req, res) => {
  const pets = await Pet.find({ owner: req.user.id });
  res.json(pets);
});

// Add new pet
router.post('/', auth, async (req, res) => {
  try {
    const { name, species, breed, age, weight, medicalHistory } = req.body;
    const pet = new Pet({
      name,
      species,
      breed,
      age,
      weight,
      medicalHistory,
      owner: req.user.id
    });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a pet
router.put('/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findOne({ _id: req.params.id, owner: req.user.id });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    Object.assign(pet, req.body);
    await pet.save();

    res.json({ message: 'Pet updated', pet });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a pet
router.delete('/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!pet) return res.status(404).json({ message: 'Pet not found or already deleted' });

    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', auth, async (req, res) => {
  try {
    console.log('Incoming pet:', req.body); // 🔍 Add this

    const { name, species, breed, age, weight, medicalHistory } = req.body;
    const pet = new Pet({
      name,
      species,
      breed,
      age,
      weight,
      medicalHistory,
      owner: req.user.id
    });
    await pet.save();

    res.status(201).json(pet);
  } catch (err) {
    console.error('Pet save error:', err.message); // 🔥 Log any error
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

