import React, { useEffect, useState } from 'react';
import Commit from './Commit';
import Navbar from '../navbar/Navbar';
import './css/Branches.css';
import CommitChart from './CommitChart';

interface stateElement {
  name: string;
  sha: string;
  commit: {
    author: {
      name: string;
    };
    message: string;
    committer: {
      date: string;
    };
  };
}

interface stateElements extends Array<stateElement> {}

const Branches: React.FC = () => {
  const [branches, setBranches] = useState<stateElements>([]);
  const [Commits, setCommits] = useState<stateElements>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>('');

  useEffect(() => {
    if (selectedBranch) {
      const commitsUrl = `https://api.github.com/repos/AntonOsika/gpt-engineer/commits?sha=${selectedBranch}&per_page=100`;

      fetch(commitsUrl)
        .then((response) => response.json())
        .then((data) => setCommits(data))
        .catch((error) => console.error('Error fetching commits:', error));
    }
  }, [selectedBranch]);

  useEffect(() => {
    const commitsUrl = 'https://api.github.com/repos/AntonOsika/gpt-engineer/commits?per_page=100';
    const branchesUrl = 'https://api.github.com/repos/AntonOsika/gpt-engineer/branches';

    fetch(commitsUrl)
      .then((response) => response.json())
      .then((data) => setCommits(data))
      .catch((error) => console.error('Error fetching commits:', error));

    fetch(branchesUrl)
      .then((response) => response.json())
      .then((data) => setBranches(data))
      .catch((error) => console.error('Error fetching branches:', error));
  }, []);

  const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBranch(event.target.value);
  };

  return (
    <div id="branches">
      <Navbar />
      <CommitChart />
      <div id="commits">
        <h1 className="header">Components by branch:</h1>
        <select className="selector" onChange={handleBranchChange}>
          {branches.map((branch) => (
            <option key={branch.name} value={branch.name} >
              {branch.name}
            </option>
          ))}
        </select>
        {Commits.map((commit) => (
          <Commit key={commit.sha} commit={commit} />
        ))}
      </div>
    </div>
  );
};

export default Branches;
