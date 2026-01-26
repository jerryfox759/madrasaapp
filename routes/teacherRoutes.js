const express = require('express');
const router = express.Router();
const { getTeachers, addTeacher, deleteTeacher } = require('../controllers/teacherController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getTeachers);
router.post('/', addTeacher);
router.get('/delete/:id', adminOnly, deleteTeacher);

module.exports = router;
