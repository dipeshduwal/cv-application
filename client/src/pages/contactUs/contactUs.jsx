import React, { useState } from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import './contactUs.css';
import { sendEmail } from '../../api/contactApi';
import Navbar from '../../components/navigationBar/navigationBar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setErrorMessage('Name is required.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    if (!formData.email) {
      setErrorMessage('Email is required.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    if (!formData.message) {
      setErrorMessage('Message is required.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid Gmail address (ending with gmail.com).');
      setTimeout(() => setErrorMessage(''), 6000);
      return;
    }

      try {
        await sendEmail(formData); 
        setSuccessMessage('Thank you for reaching out! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSuccessMessage(''), 5000);
        setErrorMessage(''); 
      } catch (error) {
        setErrorMessage('There was an error sending your message. Please try again later.');
        setTimeout(() => setErrorMessage(''), 5000);
        setSuccessMessage('');
      }
  };

  return (
    <div className='main-contact'>
        <Navbar/>
    <div className="contact-page">
      
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>We’re here to help! Reach out to us with any questions or feedback, and we’ll be in touch shortly.</p>
        
        <div className="contact-details">
          <p><strong>Email:</strong> support@resumebuilder.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p><strong>Address:</strong> San Francisco, CA, 94105</p>
          <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM</p>
        </div>

        <div className="social-media">
          <a href="https://github.com/dipeshduwal" target="_blank" rel="noopener noreferrer">
            <FaGithub className="social-icon" />
          </a>
          <a href="https://facebook.com/dipeshduwal" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://linkedin.com/in/dipeshduwal" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon" />
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Send Us a Message</h3>
        <p>Have questions, feedback, or suggestions? We'd love to hear from you! Just fill out the form below, and we’ll get back to you as soon as possible.</p>
        <label>
          Name:
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Message:
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
          />
        </label>
        <button type="submit">Submit</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      
    </div>
    </div>
  );
};

export default Contact;
