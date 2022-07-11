import React from 'react';
import s from './styles.module.css';

export const Button = ({
    containerClassName = '',
  className = '',
    id = '',
    onClick = () => null,
    children = '',
    isBackButton = false
}) => {
    return (
        <div className={ containerClassName }>
        <span
          className={ `${isBackButton ? s.backButton : s.button} ${className}` }
          onClick={onClick}
          id={id}
        >
          { children }
        </span>
    </div>
    );
}