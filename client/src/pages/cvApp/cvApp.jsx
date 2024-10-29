import React, { useState } from 'react';
import PersonalInfo from '../../components/personalInfo/personalInfo';
import Education from '../../components/education/education';
import Experience from '../../components/experience/experience';
import Skills from '../../components/skills/skill';
import ResumePreview from '../../components/resumePreview/resumePreview';
import CollapsibleSection from '../../components/collapsibleSection/collapsibleSection';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/modal'; 
import './cvApp.css'; 

const CVApp = () => {
  const [personalInfo, setPersonalInfo] = useState({ 
    fullName: '', 
    email: '', 
    phone: '', 
    address: '', 
    birthDate: '', 
    linkedIn: '', 
    photo: ''
  });
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [visibleEducations, setVisibleEducations] = useState({});
  const [visibleExperiences, setVisibleExperiences] = useState({});
  const [visibleSkills, setVisibleSkills] = useState({});
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/HomePage'); 
  };

  return (
    <div className='cvapp-container'>
      <nav className="navbar">
        <div className="navbar-logo">
          <h2>Resume Builder</h2>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <button className="logout-button2" onClick={() => setIsModalOpen(true)}>Logout</button>
          </li>
        </ul>
      </nav>
    
      <div className='resume-builder'>
        <div className='input-section'>
          <div className='section1'>
            <h3>Personal Information</h3>
            <PersonalInfo personalInfo={personalInfo} setPersonalInfo={setPersonalInfo}/>
          </div>
          <div className='section2'>
          <CollapsibleSection title="Education">
            <Education educations={educations} setEducations={setEducations} visibleEducations={visibleEducations} setVisibleEducations={setVisibleEducations}/>
          </CollapsibleSection>

          <CollapsibleSection title="Work Experience">
            <Experience experiences={experiences} setExperiences={setExperiences} visibleExperiences={visibleExperiences} setVisibleExperiences={setVisibleExperiences}/>
          </CollapsibleSection>

          <CollapsibleSection title="Skills">
            <Skills skills={skills} setSkills={setSkills} visibleSkills={visibleSkills} setVisibleSkills={setVisibleSkills}/>
          </CollapsibleSection>
          </div>
        </div>

        <div className="preview-section">
          <ResumePreview
            personalInfo={personalInfo}
            educations={educations}
            visibleEducations={visibleEducations}
            experiences={experiences}
            visibleExperiences={visibleExperiences}
            skills={skills}
            visibleSkills={visibleSkills}
            photo={personalInfo.photo ? `http://localhost:5000${personalInfo.photo}` : ''}
          />
        </div>
      </div>

      {/* Modal for logout confirmation */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleLogout}
        title="Are you sure you want to logout?"
      />
    </div>
  );
}

export default CVApp;
