import React, { useState } from 'react';
import Navbar from '../../components/navigationBar/navigationBar';
import './faq.css';

const FAQ = () => {
    const faqs = [
        {
            question: "What is Resume Builder?",
            answer: "Resume Builder is an online tool that helps you create professional resumes quickly and easily."
        },
        {
            question: "Is Resume Builder free to use?",
            answer: "Yes, Resume Builder offers free access to all of its features."
        },
        {   
            question: "Can I customize the color, font and design of my resume?",
            answer: "Yes, Resume Builder allows you to change the color scheme, fonts and designs to match your style or industry requirements."
        },
        {
            question: "Can I download my resume in different formats?",
            answer: "Currently, you can download your resume in PDF Format which can be easily converted to other formats using other tools."
        },
        {
            question: "How do I edit my resume after creation?",
            answer: "You can easily log in to your account and navigate to your saved resumes to make any edits."
        },
        {
            question: "How do I upload an image to my CV?",
            answer: "You can upload an image directly in the 'Personal Information' section of your resume template. Make sure to use an appropriate image size and format (e.g., JPG or PNG)."
        },
        {
            question: "What should I do if I forget my password?",
            answer: "If you forget your password, click on the 'Forgot Password' link on the login page. You will receive an OTP via email to reset your password."
        },
        {
            question: "How does the email verification process work?",
            answer: "After signing up, you will receive an OTP at your registered email address. Enter the OTP on the verification page to activate your account."
        },
        {
            question: "How can I contact support?",
            answer: "You can contact our support team by leaving us a message through contact page. Alternatively, use our linkedin or social medias."
        },
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <Navbar />
            <div className='heading'>Frequently Asked Questions</div>
            <div className="faq-list">
                {faqs.map((item, index) => (
                    <div key={index} className="faq-item">
                        <h2 className="faq-question" onClick={() => toggleAnswer(index)}>
                            {item.question}
                        </h2>
                        {activeIndex === index && (
                            <p className="faq-answer">{item.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
