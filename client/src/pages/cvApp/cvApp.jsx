import React, { useState } from 'react';
import PersonalInfo from '../../components/personalInfo/personalInfo';
import Education from '../../components/education/education';
import Experience from '../../components/experience/experience';
import Skills from '../../components/skills/skill';
import ResumePreview from '../../components/resumePreview/resumePreview';
import CollapsibleSection from '../../components/collapsibleSection/collapsibleSection';
import Navbar from '../../components/navigationBar/navigationBar';
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
  const [visibleEducations, setVisibleEducations] = useState({});
  const [visibleExperiences, setVisibleExperiences] = useState({});
  const [visibleSkills, setVisibleSkills] = useState({});

  return (
    <div className='cvapp-container'>
      <Navbar />
    
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
    </div>
  );
}

export default CVApp;
