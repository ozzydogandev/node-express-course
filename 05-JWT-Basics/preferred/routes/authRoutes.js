const express = require('express');
const router = express.Router();
const { logon, hello } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/logon', logon);
router.get('/hello', authenticateToken, hello);

module.exports = router;
