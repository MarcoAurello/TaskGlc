import React from 'react';
import './Modal.css'; // Certifique-se de adicionar estilos para o modal

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose} style={{color:'red'}}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;