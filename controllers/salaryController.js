const Salary = require('../models/Salary');
const Teacher = require('../models/Teacher');
// Date formatting handled in frontend or toLocaleString

// @desc    Get All Salaries
// @route   GET /salary
exports.getSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find().populate('teacher').sort({ datePaid: -1 });
        const teachers = await Teacher.find();
        res.render('pages/salary', { salaries, teachers, user: req.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// @desc    Add Salary Record
// @route   POST /salary
exports.addSalary = async (req, res) => {
    try {
        await Salary.create(req.body);
        res.redirect('/salary');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete Salary
// @route   GET /salary/delete/:id
exports.deleteSalary = async (req, res) => {
    try {
        await Salary.findByIdAndDelete(req.params.id);
        res.redirect('/salary');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
