import React from 'react';
import './modal.css'; 

const Modal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>Yes</button>
          <button className="cancel-button2" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
