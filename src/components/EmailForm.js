import React, { useState } from 'react';
import { generateEmail, sendEmail } from '../services/groqService'; 

const EmailForm = () => {
    const [recipient, setRecipient] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatedEmail, setGeneratedEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsLoading(true);
        try {
            const email = await generateEmail(prompt);
            console.log(prompt, "aayush");
            setGeneratedEmail(email);
        } catch (error) {
            alert("Failed to generate email: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = async () => {
        try {
            await sendEmail(recipient, generatedEmail);
            alert('Email sent successfully!');
        } catch (error) {
            alert('Failed to send email: ' + error.message);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1>AI Email Generator</h1>
            <div style={{ marginBottom: '15px' }}>
                <label>Recipient Email:</label>
                <input
                    type="email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label>Email Prompt:</label>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    style={{ width: '100%', padding: '8px', minHeight: '100px' }}
                />
                <button 
                    onClick={handleGenerate} 
                    disabled={isLoading}
                    style={{ marginTop: '10px', padding: '8px 15px' }}
                >
                    {isLoading ? 'Generating...' : 'Generate Email'}
                </button>
            </div>
            {generatedEmail && (
                <div style={{ marginBottom: '15px' }}>
                    <label>Generated Email:</label>
                    <textarea
                        value={generatedEmail}
                        onChange={(e) => setGeneratedEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px', minHeight: '200px' }}
                    />
                    <button 
                        onClick={handleSend}  // Changed to use handleSend
                        disabled={!recipient || !generatedEmail}
                        style={{ marginTop: '10px', padding: '8px 15px' }}
                    >
                        Send Email
                    </button>
                </div>
            )}
        </div>
    );
};

export default EmailForm;