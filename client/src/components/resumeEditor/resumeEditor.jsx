import React from 'react';
import savePreferences from '../../api/resumePreferencesApi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './resumeEditor.css';

function ResumeEditor({ 
  accentColor, setAccentColor, 
  textColor, setTextColor, 
  fontFamily, setFontFamily, 
  personalInfo, showMessage 
}) {
    const handleSavePreferences = async () => {
        try {
            const email = localStorage.getItem('userEmail');
            const preferences = { accentColor, textColor, font: fontFamily };

            await savePreferences(email, preferences);

            localStorage.setItem('accentColor', accentColor);
            localStorage.setItem('textColor', textColor);
            localStorage.setItem('font', fontFamily);

            showMessage('** Preferences saved successfully **');
        } catch (error) {
            console.error('Error saving preferences:', error);
            showMessage('Failed to save preferences');
        }
    };

    const downloadPDF = () => {
        const resume = document.getElementById('resume-content');

        // Use high scale factor for better resolution
        const scale = 3; // Adjust scale factor to 2x or 3x for higher quality
        const zoomFactor = 1.1;

        html2canvas(resume, {
            scale: scale, // Increases canvas resolution
            useCORS: true, // Enable CORS for cross-origin images
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png', 1.0); // Set quality to 100%

            // Fixed PDF width (A4 size width)
            const pdf = new jsPDF('portrait', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth(); // A4 width in mm

            // Dynamically calculate height based on image aspect ratio
            const imgWidth = pdfWidth * zoomFactor; // Keep width same as PDF
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

            // Create PDF with calculated dynamic height
            const pdfHeight = imgHeight; // Set PDF height to image height

            // Change PDF page size dynamically
            pdf.internal.pageSize.setHeight(pdfHeight);

            // Add the image to the PDF
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, '', 'FAST');

            pdf.save(`${personalInfo.fullName}_Resume.pdf`);
            showMessage('** PDF downloaded successfully! **');
        });
    };
    

    return (
        <div className="resume-editor">
            <div className='preferences-section'>
            <div className="color-picker-section">
                <h5>Colors</h5>
                <div className="option-accent">
                    <label>Accent Color:</label>
                    <div className="color-picker-wrapper">
                        <div className="color-accent" onClick={() => document.getElementById('accent-color-picker').click()}>
                            <div className="color-box" style={{ backgroundColor: accentColor }} />
                            <span className="color-code">{accentColor}</span>
                        </div>
                        <input
                            id="accent-color-picker"
                            type="color"
                            value={accentColor}
                            onChange={(e) => setAccentColor(e.target.value)}
                        />
                    </div>
                </div>

                <div className="option-text">
                    <label>Text Color:</label>
                    <div className="color-picker-wrapper">
                        <div className="color-text" onClick={() => document.getElementById('text-color-picker').click()}>
                            <div className="color-box" style={{ backgroundColor: textColor }} />
                            <span className="color-code">{textColor}</span>
                        </div>
                        <input
                            id="text-color-picker"
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="font-picker-section">
                <h5>Fonts</h5>
                <div className='font-buttons'>
                    <button
                        className='font-button'
                        style={{ fontFamily: "'Roboto', sans-serif" }}
                        onClick={() => setFontFamily("'Roboto', sans-serif")}
                    >
                        Roboto<br /><span className='font-sample'>Aa</span>
                    </button>

                    <button
                        className='font-button'
                        style={{ fontFamily: "'Merriweather', sans-serif" }}
                        onClick={() => setFontFamily("'Merriweather', sans-serif")}
                    >
                        Merriweather<br /><span className='font-sample'>Aa</span>
                    </button>

                    <button
                        className='font-button'
                        style={{ fontFamily: "'Tahoma', sans-serif" }}
                        onClick={() => setFontFamily("'Tahoma', sans-serif")}
                    >
                        Tahoma<br /><span className='font-sample'>Aa</span>
                    </button>
                </div>
            </div>
            </div>
            <div className='resume-buttons'>
            <button
                className="reset-button"
                onClick={() => {
                    setFontFamily("'Merriweather', sans-serif");
                    setAccentColor('#125413');
                    setTextColor('#143d15');
                    showMessage('** Preferences reset to default! **');
                }}>
                Reset to Default
            </button>

            <button className="remember-choice-button" onClick={handleSavePreferences}>Remember My Choice</button>

            <button className="download-button" onClick={downloadPDF}>
                Download as PDF
            </button>
            </div>
        </div>
    );
};

export default ResumeEditor;
