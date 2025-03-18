const { getMedicalAdvice } = require('../services/geminiService');
const { getRelevantMedicalInfo } = require('../utils/ragService');

exports.chatWithAI = async (req, res) => {
    const { message, userData } = req.body;
    const { name, age, gender, history, symptoms } = userData;
    if (!name || !age || !gender || !symptoms) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Fetch relevant medical info from Pinecone
    const medicalInfo = await getRelevantMedicalInfo(symptoms);

    // Generate AI response using Gemini
    const advice = await getMedicalAdvice(name, age, gender, history, symptoms, message);
    
    res.json(advice);
};
