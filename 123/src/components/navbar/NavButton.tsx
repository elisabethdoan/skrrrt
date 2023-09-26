import React from 'react';
import { useHistory } from 'react-router-dom';
import './css/NavButton.css';

type buttonProps = {
  path: string,
  pathname: string,
  location: any
};

function NavButton({ path, pathname, location }: buttonProps) {
  const history = useHistory();

  const goToPath = () => {
    history.push(path);
  };

  const isSelected = (location === path);

  if (isSelected) {
    return (
      <button
        type="button"
        className="ButtonSelected"
        onClick={goToPath}
        data-testid="buttonSelected"
      >
        {pathname}
      </button>
    );
  }
  return (
    <button
      type="button"
      className="Button"
      onClick={goToPath}
      data-testid="button"
    >
      {pathname}
    </button>
  );
}

export default NavButton;
