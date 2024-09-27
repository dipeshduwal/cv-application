import React, { useState } from 'react';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import Education from '../../components/Education/Education';
import Experience from '../../components/Experience/Experience';
import Skills from '../../components/Skills/Skill';
import ResumePreview from '../../components/ResumePreview/ResumePreview';
import CollapsibleSection from '../../components/CollapsibleSection/CollapsibleSection';
import ProfileComponent from '../ProfileComponent/ProfileComponent';
import './Cvapp.css'; // Add styles for the CV app if needed

const CVApp = () => {
  const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phone: '', birthDate: '', city: '' });
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  return (
    <div className='cvapp-container'>
      {/* Display Profile Section at the top */}
      <div className='profile-section'>
        <ProfileComponent />
      </div>
      
      {/* Resume Builder Section */}
      <div className='resume-builder'>
        <div className='input-section'>
          <div className='section'>
            <h3>Personal Information</h3>
            <PersonalInfo personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
          </div>

          <CollapsibleSection title="Education">
            <Education educations={educations} setEducations={setEducations} />
          </CollapsibleSection>

          <CollapsibleSection title="Work Experience">
            <Experience experiences={experiences} setExperiences={setExperiences} />
          </CollapsibleSection>

          <CollapsibleSection title="Skills">
            <Skills skills={skills} setSkills={setSkills} />
          </CollapsibleSection>
        </div>

        <div className="preview-section">
          <ResumePreview
            personalInfo={personalInfo}
            educations={educations}
            experiences={experiences}
            skills={skills}
            photo={personalInfo.photo}
          />
        </div>
      </div>
    </div>
  );
}

export default CVApp;
