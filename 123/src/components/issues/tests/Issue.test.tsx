import React from 'react';
import renderer from 'react-test-renderer';
import Issue from '../Issue';

const testIssue = {
  title: 'TestIssue',
  iid: 1,
  description: 'Dette er et testIssue',
  state: 'closed',
  labels: [],
  // eslint-disable-next-line
  created_at: '2021-09-28T13:00:36.099+02:00',
  // eslint-disable-next-line
  closed_at: "2021-09-29T13:00:36.099+02:00"
};

test('Tests that rendering IssueChart matches snapshot,', () => {
  const tree = renderer.create(<Issue issue={testIssue} />).toJSON();
  expect(tree).toMatchSnapshot();
});
