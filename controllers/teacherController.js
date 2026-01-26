const Teacher = require('../models/Teacher');

// @desc    Get All Teachers
// @route   GET /teachers
exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().sort({ createdAt: -1 });
        res.render('pages/teachers', { teachers, user: req.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// @desc    Add New Teacher
// @route   POST /teachers
exports.addTeacher = async (req, res) => {
    try {
        await Teacher.create(req.body);
        res.redirect('/teachers');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete Teacher
// @route   GET /teachers/delete/:id
exports.deleteTeacher = async (req, res) => {
    try {
        await Teacher.findByIdAndDelete(req.params.id);
        res.redirect('/teachers');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
