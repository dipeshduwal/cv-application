import React from 'react';
import './modal.css'; // 

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to logout?</h3>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>Yes</button>
          <button className="cancel-button2" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
