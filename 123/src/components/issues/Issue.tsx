import React from 'react';
import './css/Issue.css';

interface Props {
  issue: {
    id: number;
    title: string;
    body: string;
    state: 'open' | 'closed';
    labels: {
      name: string;
    }[];
    // eslint-disable-next-line
    created_at: string; // ISO 8601 date-time string
    // eslint-disable-next-line
    closed_at: string; // ISO 8601 date-time string
  };
}
/**
 * This component is a textual representation of a single issue.
 */
const Issue: React.FC<Props> = ({ issue }) => {
  console.log(issue.state);
  const creationDate = new Date(issue.created_at).toLocaleString();
  let closingDate;
  if (issue.closed_at !== null) {
    closingDate = new Date(issue.closed_at).toLocaleString();
  } else {
    closingDate = null;
  }
  const labelString = issue.labels.map((label) => label.name).toString();
  return (
    <div id="issue">
      <h3 id="title">{`${issue.title} #${issue.id}`}</h3>
      <hr id="line" />
      <br />
      <p>
        <b>Description: </b>
        {issue.body}
      </p>
      <p>
        <b>State: </b>
        {issue.state}
      </p>
      <p>
        <b>Labels: </b>
        {labelString}
      </p>
      <p>
        <b>Created at: </b>
        {creationDate}
      </p>
      <p>
        {issue.closed_at ? <b>Closed at: </b> : null}
        {closingDate}
      </p>
    </div>
  );
};

export default Issue;
