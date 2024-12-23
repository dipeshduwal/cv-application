import React, { useState } from 'react';
import './itemTemplate.css';
import Modal from '../modal/modal';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

function ItemTemplate({ title, rating, type, subtitle, description, onEdit, onDelete, onToggleVisibility, isVisible }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const renderStars = (numStars) => {
        return [...Array(numStars)].map((_, i) => <FaStar key={i} style={{ color: 'gold' }} />);
    };

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
                { type==='skill' && <div className="star-rating">{renderStars(rating)}</div>}
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
                <button className="visibility-toggle-button" onClick={onToggleVisibility}>
                    {isVisible ? <FaEye /> : <FaEyeSlash />}
                </button>
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
