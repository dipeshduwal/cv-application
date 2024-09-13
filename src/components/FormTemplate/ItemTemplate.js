import React from 'react';
import './ItemTemplate.css';

function ItemTemplate({ title, subtitle, description, onEdit, onDelete }) {

    return (
        <div className="item-template">
            <div className="item-content">
                <h3>{title}</h3>
                <p>{subtitle}</p>
                <p>{description}</p>
            </div>
            <div className="item-actions">
                {onEdit && (
                    <button className="edit-button" onClick={onEdit}>
                        Edit
                    </button>
                )}
                {onDelete && (
                    <button className="delete-button" onClick={onDelete}>
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
}

export default ItemTemplate;