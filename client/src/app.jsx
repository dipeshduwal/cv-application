import React, { useState } from 'react'
import './styles/App.css'
import PersonalInfo from './components/personal-info/PersonalInfo';
import Education from './components/education/Education';
import Experience from './components/experience/Experience';
import Skills from './components/Skills/Skill';
import ResumePreview from './components/ResumePreview/ResumePreview';
import CollapsibleSection from './components/CollapsibleSection/CollapsibleSection';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/SignUp/SignUp';

//collects data from different sections like personal information, education, experience, and skills, and then shows a preview of the resume
function App() {
  const [personalInfo, setPersonalInfo] = useState({name:'', email:'', phone:'', birthDate:'', city:''  });
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  return (
    <Router>
     <div className='App'>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
            
        <Route
            path="/"
            element={
              <div className='resume-builder'>
                 <div className='input-section'>
                 <div className='section'>
                    <h3>Personal Information</h3>
                    <PersonalInfo personalInfo={personalInfo} setPersonalInfo={setPersonalInfo}/>
                  </div>

                   <CollapsibleSection title="Education">
                    <Education educations={educations} setEducations={setEducations}/>
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
                  />
      </div>
      </div>
      }
      /> 
      </Routes>
      </div>
    </Router>
  )
};

export default App;
