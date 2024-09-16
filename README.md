# CV/Resume Generator - React + Vite

This is a React-based application that allows users to input their personal information, education history, work experience, and skills to generate a professional-looking CV/résumé. Users can view a real-time preview of their CV as they input their information.

**Live Preview:** https://main--cv-app-generate.netlify.app/

**Features:** <br>
- Real-time CV Preview: Users can see an updated preview of their CV as they input data.<br>
- Personal Information: Input fields for name, email, phone number, birth date, and city. <br>
- Education Section: Add, edit, and delete educational entries with details like school name, degree, and field of study. <br>
- Work Experience: Add and manage work experience entries, including job title, company, and duration. <br>
- Skills Section: Add skills that are relevant to your CV. <br>
- Collapsible Sections: Each section (Education, Experience, and Skills) can be expanded or collapsed for a cleaner user interface.

**Components:** <br>
This project is built using modular React components to manage each section of the CV. Below is a brief description of the key components: <br>

1. *App.jsx:* The main component that manages the state and renders the input sections and the CV preview. <br>
2. *PersonalInfo.jsx:* Handles input fields for personal details like name, email, and phone number. <br>
3. *Education.jsx:* Manages the list of educational experiences with the ability to add, edit, and delete entries. <br>
4. *Experience.jsx:* Handles work experience entries. <br>
5. *Skills.jsx:* Allows the user to input relevant skills. <br>
6. *ResumePreview.jsx:* Displays the live preview of the CV based on the data entered. <br>
7. *CollapsibleSection.jsx:* Wraps sections (Education, Experience, Skills) inside a collapsible UI to show or hide their content.<br>
8. *FormTemplate.jsx:* A reusable form component that dynamically generates input fields based on the configuration passed to it. This is used across different sections to standardize how forms are handled (e.g., education, experience forms). <br>
9. *ItemTemplate.jsx:* A component that renders a formatted item with a title, subtitle, description, and actions like Edit or Remove. Used to display items such as education or work experience entries. <br>
10. *InputGroup.jsx:* A reusable input component that can handle different input types (text, textarea, date, etc.) and provides support for additional labels like optional or recommended. It simplifies form input creation throughout the app. <br>
11. *main.jsx:* The entry point for the React application, where the App component is rendered and injected into the DOM using ReactDOM.render. This is the root file where the React application starts running. <br>

**Installation:** <br>
To run this project locally, follow the steps below: <br>

1. Clone the repository: <br>
- bash

```
git clone git@github.com:dipeshduwal/cv-application.git
cd cv-application
```

2. Install dependencies: Run the following command to install all necessary dependencies: <br>
- bash <br>
```npm install```

3. Start the development server: To start the application in development mode, run: <br>
- bash <br>
```npm start```

4. Open the application: Open your browser and view the app.
