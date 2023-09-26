import React from 'react';

export interface IssueElement {
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
}

const IssueContext = React.createContext<IssueElement[]>([]);
export default IssueContext;
