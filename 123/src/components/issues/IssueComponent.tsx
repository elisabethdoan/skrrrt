import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import IssueChart from './IssueChart';
import Issues from './Issues';
import IssueContext, { IssueElement } from './IssueContextProvider';

/**
 * This component is a fragment with all the other issue components innside.
 * Also Provides context (list of all issues) for the other components.
 */
const IssueComponent2: React.FC = () => {
  const [issues, setIssues] = useState<IssueElement[]>([]);

  useEffect(() => {
    const issuesUrl = 'https://api.github.com/repos/AntonOsika/gpt-engineer/issues?per_page=100';

    fetch(issuesUrl)
      .then((response) => response.json())
      .then((data) => setIssues(data))
      .catch((error) => console.error('Error fetching issues:', error));
  }, []);

  return (
    <>
      <Navbar />
      <IssueContext.Provider value={issues}>
        <IssueChart />
        <Issues />
      </IssueContext.Provider>
    </>
  );
};

export default IssueComponent2;
