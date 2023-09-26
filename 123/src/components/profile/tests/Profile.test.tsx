import { cleanup, render } from "@testing-library/react";
import React from "react";
import Profile from '../Profile';
import renderer from 'react-test-renderer';

describe('Navigation button', () => {
    
    afterEach(cleanup)
  
    test('Renders with correctly', () => {
        const tree = renderer.create(<Profile />).toJSON();
        expect(tree).toMatchSnapshot();

    })
  
  });