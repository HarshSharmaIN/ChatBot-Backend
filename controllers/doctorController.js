const Doctor = require('../models/Doctor');
const { predictDoctorSpeciality } = require('../services/geminiService');

exports.getDoctors = async (req, res) => {
    try {
        const { symptoms } = req.body;
        console.log(symptoms);
        
        if (!symptoms) {
            return res.status(400).json({ message: 'Please provide symptoms' });
        }

        console.log(`🔍 Searching doctors for symptoms: ${symptoms}`);

        // Use the medical AI to predict the doctor's speciality
        const predictedSpeciality = await predictDoctorSpeciality(symptoms);

        console.log(`🤖 Predicted Speciality: ${predictedSpeciality}`);

        // Query the database for doctors who match the predicted speciality
        const doctors = await Doctor.find({
            specialization: new RegExp(predictedSpeciality, 'i')
        });
        
        res.json({ doctors });
    } catch (error) {
        console.error("❌ Error fetching doctors:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};