const express = require('express');
const router = express.Router();
const { login, dashboard } = require('../controllers/main');
const authenticationMiddileware = require('../middleware/auth');

router.post('/login', login);
router.get('/dashboard', authenticationMiddileware, dashboard);

module.exports = router;
