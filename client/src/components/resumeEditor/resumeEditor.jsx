import React from 'react';

const ColorPicker = ({ label, color, onChange }) => {
    return (
        <div className="color-picker">
            <label>
                {label}
                <input
                    type="color"
                    value={color}
                    onChange={onChange}
                />
            </label>
        </div>
    );
};

export default ColorPicker;
