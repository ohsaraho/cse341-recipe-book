const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/recipes', require('./recipesRoute'))

module.exports = router;