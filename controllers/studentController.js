const Student = require('../models/Student');

// @desc    Get All Students
// @route   GET /students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });
        res.render('pages/students', { students, user: req.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// @desc    Add New Student
// @route   POST /students
exports.addStudent = async (req, res) => {
    try {
        const { name, admissionNo, classOrBatch, contact, admissionDate, hifzComplete, address, aadharNo, previousSchool } = req.body;

        const photo = req.file ? `/uploads/students/${req.file.filename}` : '';

        if (admissionDate === '') {
            req.body.admissionDate = undefined;
        }

        await Student.create({
            name,
            admissionNo,
            classOrBatch,
            contact,
            admissionDate: admissionDate || undefined,
            hifzComplete: hifzComplete === 'on',
            address,
            aadharNo,
            previousSchool,
            photo
        });
        res.redirect('/students');
    } catch (error) {
        console.error('Add Student Error:', error);
        res.status(500).send(`Server Error: ${error.message}`);
    }
};

// @desc    Edit Student Form
// @route   GET /students/edit/:id
exports.editStudentForm = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.render('pages/edit_student', { student, user: req.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// @desc    Update Student
// @route   POST /students/edit/:id
exports.updateStudent = async (req, res) => {
    try {
        const { hifzComplete, ...otherData } = req.body;
        // Checkbox value handling: if checked it sends 'on', if unchecked it doesn't send anything.
        // But better to expect boolean or cast it.
        const isHifz = hifzComplete === 'on' || hifzComplete === true;

        await Student.findByIdAndUpdate(req.params.id, { ...otherData, hifzComplete: isHifz });
        res.redirect('/students');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete Student
// @route   GET /students/delete/:id
exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect('/students');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
