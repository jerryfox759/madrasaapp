const express = require('express');
const router = express.Router();
const { getStudents, addStudent, editStudentForm, updateStudent, deleteStudent } = require('../controllers/studentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect);

const upload = require('../middleware/upload');

router.get('/', getStudents);
router.post('/', upload.single('photo'), addStudent);
router.get('/edit/:id', editStudentForm);
router.post('/edit/:id', updateStudent);
router.get('/delete/:id', adminOnly, deleteStudent);

module.exports = router;
