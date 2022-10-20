import React from 'react';
import styles from "./Card.module.scss";

// crée pour envelopper n'importe quel composant enfant
const Card = ({children, cardClass}) => {
  return (
    <div className={`${styles.card} ${cardClass}`}>
        {children}
    </div>
  )
};

export default Card;