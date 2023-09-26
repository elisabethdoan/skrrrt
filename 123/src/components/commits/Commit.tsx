import React from 'react';
import './css/Commit.css';

interface Props {
  commit: {
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
  };
}

const Commit: React.FC<Props> = ({ commit }) => {
  const creationDate = new Date(commit.commit.committer.date).toLocaleString();
  return (
    <div id="commit">
      <h3 id="title">{`${commit.commit.message.split('\n')[0]}`}</h3>
      <hr id="line" />
      <br />
      <p>
        <b>Short id: </b>
        {commit.sha}
      </p>
      <p>
        <b>Committer: </b>
        {commit.commit.author.name}
      </p>
      <p>
        <b>Committed at: </b>
        {creationDate}
      </p>
    </div>
  );
};

export default Commit;
