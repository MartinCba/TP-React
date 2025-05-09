import React from 'react';
import styles from './Title.module.css';

type Props = {
    text: string; 
};

const Title: React.FC<Props> = ({ text }) => {
    return <h1 className={styles['main-title']}>{text}</h1>;
};

export default Title;
