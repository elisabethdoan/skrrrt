import React from 'react';
import renderer from 'react-test-renderer';
import IssueChart from '../IssueChart';

test('Tests that rendering IssueChart matches snapshot,', () => {
  const tree = renderer.create(<IssueChart />).toJSON();
  expect(tree).toMatchSnapshot();
});
