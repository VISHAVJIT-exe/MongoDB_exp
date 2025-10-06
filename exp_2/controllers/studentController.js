// controllers/studentController.js
const Student = require('../models/student');

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send({ message: "Error creating student", error: error.message });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).send(students);
    } catch (error) {
        res.status(500).send({ message: "Error fetching students", error: error.message });
    }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send({ message: "Error fetching student", error: error.message });
    }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }
        res.status(200).send({ message: "Student updated successfully", student });
    } catch (error) {
        res.status(400).send({ message: "Error updating student", error: error.message });
    }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }
        res.status(200).send({ message: "Student deleted.", student });
    } catch (error) {
        res.status(500).send({ message: "Error deleting student", error: error.message });
    }
};