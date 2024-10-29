import React, {useState} from "react";

function CollapsibleSection({title, children}){
    const [isOpen, setIsOpen] = useState(true);

    return(
        <div className="collapsible-section">
            <h3 onClick={() => setIsOpen(!isOpen)}>
                <span> {title} </span>
                <span>{isOpen ? '▲' : '▼'} </span>
            </h3>
            {isOpen && (
                <div className="section-content">
                {children}
                </div>
            )}
        </div>
    );
}

export default CollapsibleSection;