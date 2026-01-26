const express = require('express');
const router = express.Router();
const { getSalaries, addSalary, deleteSalary } = require('../controllers/salaryController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect);
router.use(adminOnly);

router.get('/', getSalaries);
router.post('/', addSalary);
router.get('/delete/:id', deleteSalary);

module.exports = router;
