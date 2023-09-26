import React from 'react';
import renderer from 'react-test-renderer';
import Issues from '../Issues';

test('Tests that rendering Issues matches snapshot,', () => {
  const tree = renderer.create(<Issues />).toJSON();
  expect(tree).toMatchSnapshot();
});
