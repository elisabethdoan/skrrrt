import React from 'react';
import Issue from './Issue';
import './css/Issues.css';
import IssueContext from './IssueContextProvider';

type Checked = 'allIssues' | 'openIssues' | 'closedIssues' | null;

interface Istate {
  checked: Checked;
}

class Issues extends React.Component<{}, Istate> {
  constructor(props: {}) {
    super(props);
    this.state = {
      checked: null,
    };
  }

  /**
   * Retrieves active radiobutton from localstorage and updates checked state
   * based on what was retrieved in localstorage. If nothing was set in localstorage allIssues
   * will be checked by default.
   */
  componentDidMount() {
    const checked = localStorage.getItem('checkedRadioIssues') as Checked;
    if (checked) {
      // eslint-disable-next-line
      this.setState({ checked: checked });
    } else {
      this.setState({ checked: 'allIssues' });
    }
  }

  /**
   * Updates state for checked radiobutton based on event. Saves selected radiobutton to
   * localstorage.
   *
   * @param e - event that triggered the function.
   */
  handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.value as Checked;
    // eslint-disable-next-line
    this.setState({ checked: checked });
    localStorage.setItem('checkedRadioIssues', checked!);
  };

  render() {
    const { checked } = this.state;
    let predicate = '';
    if (checked === 'closedIssues') {
      predicate = 'closed';
    } else {
      predicate = 'open';
    }
    return (
      <div id="issues">
        <h2>Issues: </h2>
        <form id="radioButtons">
          <label className="container" htmlFor="allIssues">
            All Issues
            <input type="radio" className="defaultRadioButton" onChange={(this.handleChangeRadio)} id="allIssues" value="allIssues" name="filterButtons" checked={checked === 'allIssues'} />
            <span id="allSpan" className="newRadioButton" />
          </label>
          <label className="container" htmlFor="openIssues">
            Open Issues
            <input type="radio" className="defaultRadioButton" onChange={this.handleChangeRadio} id="openIssues" value="openIssues" name="filterButtons" checked={checked === 'openIssues'} />
            <span id="openSpan" className="newRadioButton" />
          </label>
          <label className="container" htmlFor="closedIssues">
            Closed Issues
            <input type="radio" className="defaultRadioButton" onChange={this.handleChangeRadio} id="closedIssues" value="closedIssues" name="filterButtons" checked={checked === 'closedIssues'} />
            <span className="newRadioButton" />
          </label>
        </form>

        {/* Maps each issue from state to an individual Issue component.
            If 'allIssues' is not checked it will filter on predicate first. */}
        <IssueContext.Consumer>
          {checked === 'allIssues'
            ? (value) => value.map((issue) => <Issue key={issue.id} issue={issue} />)
            : (value) => value.filter((issue) => issue.state === predicate)
              .map((issue) => <Issue key={issue.id} issue={issue} />)}
        </IssueContext.Consumer>
      </div>
    );
  }
}

Issues.contextType = IssueContext;

export default Issues;
