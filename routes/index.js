const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/recipes', require('./recipesRoute'));
router.use('/users', require('./usersRoute'));

module.exports = router;