const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Salary = require('../models/Salary');

exports.getDashboard = async (req, res) => {
    try {
        const studentCount = await Student.countDocuments();
        const teacherCount = await Teacher.countDocuments();
        const hifzCount = await Student.countDocuments({ hifzComplete: true });

        // Mock Data for new dashboard elements
        const parentsCount = Math.floor(studentCount * 1.5); // Mock estimation
        const schoolsCount = 69; // Static for now as per design

        // Educational Stage Mock Data
        const stageDistribution = {
            primary: 90,
            elementary: 145,
            preschool: 88
        };

        // Activities & Events Mock Data
        const activities = [
            { title: 'Elimination Game', id: 1 },
            { title: 'Freshman Orientation', id: 2 },
            { title: 'Spring Sports Rally', id: 3 }
        ];

        // Top Students Mock Data
        const topStudents = [
            { name: 'Rovan Hossam', percentage: 99.88, rank: '1st', color: 'green', img: '/images/student1.png' },
            { name: 'Rony Beyablo', percentage: 98.17, rank: '2nd', color: 'purple', img: '/images/student2.png' },
            { name: 'Adam Hisham', percentage: 97.32, rank: '3rd', color: 'yellow', img: '/images/student3.png' }
        ];

        // Recent Salary Payments (Limit 5)
        const recentSalaries = await Salary.find()
            .populate('teacher')
            .sort({ datePaid: -1 })
            .limit(5);

        res.render('pages/dashboard', {
            studentCount,
            teacherCount,
            hifzCount,
            parentsCount,
            schoolsCount,
            stageDistribution,
            activities,
            topStudents,
            recentSalaries,
            user: req.user,
            pageTitle: 'Dashboard'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
