import React from 'react';
import './faq.css';

const FAQ = () => {
    const faqs = [
        {
            question: "What is Resume Builder?",
            answer: "Resume Builder is an online tool that helps you create professional resumes quickly and easily."
        },
        {
            question: "Is Resume Builder free to use?",
            answer: "Yes, Resume Builder offers free access to its basic features, with optional premium features available for a fee."
        },
        {
            question: "Can I download my resume in different formats?",
            answer: "Absolutely! You can download your resume in various formats such as PDF, Word, and TXT."
        },
        {
            question: "How do I edit my resume after creation?",
            answer: "You can easily log in to your account and navigate to your saved resumes to make any edits."
        },
        {
            question: "Does Resume Builder provide templates?",
            answer: "Yes, we offer a variety of professionally designed templates to choose from to help you get started."
        },
        {
            question: "How can I contact support?",
            answer: "You can contact our support team through the 'Contact Us' page or via email at support@resumebuilder.com."
        },
    ];

    return (
        <div className="faq-container">
            <h1>Frequently Asked Questions</h1>
            <div className="faq-list">
                {faqs.map((item, index) => (
                    <div key={index} className="faq-item">
                        <h2 className="faq-question">{item.question}</h2>
                        <p className="faq-answer">{item.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
