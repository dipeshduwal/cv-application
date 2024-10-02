import React, { useState } from 'react';
import PersonalInfo from '../../components/personalInfo/personalInfo';
import Education from '../../components/education/education';
import Experience from '../../components/experience/experience';
import Skills from '../../components/skills/skill';
import ResumePreview from '../../components/resumePreview/resumePreview';
import CollapsibleSection from '../../components/collapsibleSection/collapsibleSection';
import ProfileComponent from '../profileComponent/profileComponent';
import './cvApp.css'; 

const CVApp = () => {
  const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phone: '', birthDate: '', city: '' });
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  return (
    <div className='cvapp-container'>
      <div className='profile-section'>
        <ProfileComponent />
      </div>
    
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
