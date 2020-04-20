import React from 'react';
import '../styles/Button.scss';

const Button = ({ children, primary, secondary, def, ml1, mr1, mt1, mb1, ...otherProps }) => {

  const genClassName = (primary, secondary, def, ml1, mr1, mt1, mb1) => {
    let name = 'custom-button';
    if (primary) name += ' primary';
    if (secondary) name += ' secondary';
    if (def) name += ' def';
    if (ml1) name += ' ml1';
    if (mr1) name += ' mr1';
    if (mt1) name += ' mt1';
    if (mb1) name += ' mb1';
    return name;
  }

  const className = genClassName(primary, secondary, def, ml1, mr1, mt1, mb1)

  return (
    <button className={className} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
