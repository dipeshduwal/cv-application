# CV/Resume Generator - React + Node

A feature-rich Resume Builder application that allows users to create, customize, and download professional resumes. It includes user authentication, customizable templates, PDF generation, and more, providing a seamless experience for users to manage and enhance their professional profiles. 

**Features:** <br>
- **User Registration and Login:** Secure authentication with email verification and OTP generation. <br>
- **Password Reset:** Forgot password feature allows users to reset their password with OTP verification. <br>
- **Add/Edit/Remove Sections:** Manage sections like Education, Experience, Skills, and Certifications. <br>
- **Image Upload:** Add a profile picture to the resume. <br>
- **PDF Download:** Export the completed resume as a high-quality PDF. <br>
- **Data Persistence:** Preserve user data across sessions using local storage. <br>
- **Customization:** Change accent colors, font styles, and choose from multiple resume templates. <br>
- **User Authentication:** Supports registration, login, and OTP-based email verification. <br>
- **Email Verification:** Sends OTP to verify users' email addresses during registration. <br>
- **Cover Letter Generation:** Automatically generate a cover letter based on user resume details. <br>
- **FAQ and Contact Pages:** Provide users with guidance and contact options. <br>

**Tech Stack:** <br>
**Frontend:** <br>
- *React.js*: Component-based UI library <br>
- *CSS*: For styling the components <br>
- *Axios*: For handling HTTP requests <br>
- *React Router*: For navigation between pages <br>
- *html2canvas & jsPDF*: For PDF generation from the DOM <br>

**Backend:**
- *Node.js and Express*: REST API server <br>
- *Postgres*: SQL database for data storage <br>
- *JWT*: For secure user sessions <br>
- *Nodemailer*: For sending OTP emails <br>

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
Frontend: ```npm run client```
Backend: ```npm run server```

4. Open the application: Open your browser and view the app.
