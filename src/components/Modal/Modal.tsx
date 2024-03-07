import React from 'react';

const Modal = ({ isOpen, onClose, todoPerId }) => {
  if (!isOpen) return null;

  const objStatut = {
    'non-commence': 'Non commencé',
    'en-cours': 'En cours',
    'terminee': 'Terminé'
  }

  const objPriority = {
    'non-definit': 'Non définit',
    'p0': 'Immédiat',
    'p1': 'Urgent',
    'p2': 'Moyen',
    'p3': 'Bas'        
  }

  return (
    <div className="modal-overlay">
      <div className="modal-custom">
        <div className="modal-header">
          <h2>{todoPerId[0].title}</h2>
          <button className="btn btn-danger" onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
        <div><strong>Description :</strong> {todoPerId[0].description}</div>
            <div><strong>Statut :</strong> {objStatut[todoPerId[0].statut]}</div>
            <div><strong>Priorité :</strong> {objPriority[todoPerId[0].priority]}</div>
            <div><strong>% Réalisé :</strong> {todoPerId[0].achieved}%</div>
            <div><strong>Date d'écheance :</strong> {new Date(todoPerId[0].debut).toLocaleDateString("fr")} au {new Date(todoPerId[0].fin).toLocaleDateString("fr") }</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;