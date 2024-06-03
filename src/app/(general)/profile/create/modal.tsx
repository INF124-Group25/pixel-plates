import React from 'react';
import styles from './modal.module.css';

interface Business {
  id: string;
  name: string;
  location: {
    address1: string;
    city: string;
  };
  rating: number;
  review_count: number;
}

interface ModalProps {
  visible: boolean;
  businesses: Business[];
  onSelect: (business: Business) => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ visible, businesses, onSelect, onClose }) => {
  if (!visible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Select a Business</h2>
        <ul>
          {businesses.map((business) => (
            <li key={business.id} onClick={() => onSelect(business)}>
              <h3>{business.name}</h3>
              <p>{business.location.address1}, {business.location.city}</p>
              <p>Rating: {business.rating}</p>
              <p>{business.review_count} reviews</p>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
