import axios from 'axios';

const API_URL = 'https://email-generate-ai.onrender.com';

export const generateEmail = async (prompt) => {
    try {
        const response = await axios.post(`${API_URL}/generate-email`, { prompt });
        return response.data.email;
    } catch (error) {
        console.error("Email generation failed:", error.response?.data || error.message);
        throw error;
    }
};

export const sendEmail = async (recipient, emailContent) => {
    try {
        await axios.post(`${API_URL}/send-email`, { recipient, email: emailContent, subject:"AI generated Email" });
    } catch (error) {
        console.error("Email sending failed:", error.response?.data || error.message);
        throw error;
    }
};