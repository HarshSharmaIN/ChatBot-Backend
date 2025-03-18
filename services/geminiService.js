require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getMedicalAdvice = async (name, age, gender, history, symptoms, message) => {
    const prompt = `
    You are a concise AI healthcare assistant.
    Patient Info:
    - Name: ${name}
    - Age: ${age}
    - Gender: ${gender}
    - Symptoms: ${symptoms}
    - Medical history: ${history || 'None'}

    User Query: ${message}

    Provide a brief and informative medical response. 
    Focus on essential information. Keep the response under 100 words.
    For any other query else than Medical related, "Just say Sorry! I can't help with that".
    `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error('Gemini AI API error:', error);
        throw new Error('Unable to process medical advice at the moment.');
    }
};

exports.predictDoctorSpeciality = async (symptoms) => {
    const prompt = `
    You are a medical AI assistant.
    Given the following symptoms: ${symptoms}, predict the most appropriate doctor speciality.
    Provide only the doctor's speciality in a single word or short phrase. Do not provide any additional explanation.
    `;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error('Gemini AI API error predicting speciality:', error);
        throw new Error('Unable to predict doctor speciality at the moment.');
    }
};