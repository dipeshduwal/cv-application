import React, { useState } from 'react';
import './itemTemplate.css';
import Modal from '../modal/modal';

// Displays a specific item (such as an educational entry, job experience, or any other list item) with an option to perform actions on that item
function ItemTemplate({ title, subtitle, description, onEdit, onDelete }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        onDelete();
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
                    <button className="delete-button" onClick={handleDeleteClick}>
                        Remove
                    </button>
                )}
            </div>

            <Modal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                title="Are you sure you want to delete?"
            />
        </div>
    );
}

export default ItemTemplate;
