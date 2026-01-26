const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Salary = require('../models/Salary');

exports.getDashboard = async (req, res) => {
    try {
        const studentCount = await Student.countDocuments();
        const teacherCount = await Teacher.countDocuments();
        const hifzCount = await Student.countDocuments({ hifzComplete: true });

        // Recent Salary Payments (Limit 5)
        const recentSalaries = await Salary.find()
            .populate('teacher')
            .sort({ datePaid: -1 })
            .limit(5);

        res.render('pages/dashboard', {
            studentCount,
            teacherCount,
            hifzCount,
            recentSalaries,
            user: req.user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
