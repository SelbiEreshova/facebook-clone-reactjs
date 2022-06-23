const express = require('express');
const { home } = require('../controllers/user');

const router = express.Router();

//End points of user
router.get("/user",  home);

module.exports = router;