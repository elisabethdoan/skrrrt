import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import NavButton from '../NavButton';

describe('Test Button component', () => {
  test('Renders without crashing', () => {
    render(
      <div className="Navbar">
        <NavButton path={'/'} pathname={'Home page'} location={location.pathname} />
        <NavButton path={'/item1'} pathname={'Item 1'} location={location.pathname} />
        <NavButton path={'/item2'} pathname={'Item 2'} location={location.pathname} />
      </div>,
    );
  });
});
