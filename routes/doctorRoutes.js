const express = require('express');
const { getDoctors } = require('../controllers/doctorController');
const router = express.Router();

router.post('/', getDoctors);

module.exports = router;