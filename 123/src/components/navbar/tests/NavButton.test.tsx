import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import NavButton from '../NavButton';

describe('Navigation button', () => {
    
  afterEach(cleanup)

  test('Renders without crashing', () => {
    render(<NavButton path={'/'} pathname={'Home page'} location={'/'}/>)
  });

  test('Renders correct when selected', () => {
    render(<NavButton path={'/'} pathname={'Home page'} location={'/'}/>)
    expect(screen.queryByTestId('buttonSelected')).toBeTruthy()
    expect(screen.queryByTestId('button')).toBeFalsy()
  });

  test('Renders correct when selected', () => {
    render(<NavButton path={'/'} pathname={'Home page'} location={'/item1'}/>)
    expect(screen.queryByTestId('buttonSelected')).toBeFalsy()
    expect(screen.queryByTestId('button')).toBeTruthy()
  });

  test('Renders with correctly', () => {
    render(<NavButton path={'/'} pathname={'Home page'} location={'/'}/>)
    expect(screen.queryByTestId('buttonSelected')).toMatchSnapshot()
  })

});