import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './css/CommitChart.css';

interface CommitElement {
  // eslint-disable-next-line
  committed_date: string;
}

interface ChartData {
  name: string;
  committed: number;
}

type Checked = 'dailyStats' | 'montlyStats';

/**
 * Fetches all issues from gitlab.
 * @returns a promise containing the Axiosresponse.
 */
const fetchCommits = async (): Promise<
  AxiosResponse<CommitElement[]> | any
> => {
  try {
    const response = await axios.get('https://api.github.com/repos/AntonOsika/gpt-engineer/commits?per_page=100');
    return response;
  } catch (error) {
    return null;
  }
};


/**
 * Get the width of the window
 * @returns the width of the window in pixels.
 */
const getWindowWidth = (): string => {
  const screenwidth = window.screen.width;
  let chartWidth = '80%';
  if (screenwidth < 800) {
    chartWidth = '100%';
  }
  return chartWidth;
};

// Used to scale the Responsive Container element.
const chartWidth = getWindowWidth();

const commitPromise = fetchCommits();

const CommitChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [checked, setChecked] = useState<Checked>();
  const [commits, setCommits] = useState<CommitElement[]>([]);

  useEffect(() => {
    const commitsUrl = 'https://api.github.com/repos/AntonOsika/gpt-engineer/commits?per_page=100';
  
    fetch(commitsUrl)
      .then((response) => response.json())
      .then((data) => setCommits(data))
      .catch((error) => console.error('Error fetching commits:', error));
  }, []);

  useEffect(() => {
    const checkedRadio = sessionStorage.getItem('checkedCommitChart') as Checked;
    updateChart(checkedRadio);
  }, []);

  /**
   * Function for finding out how many issues was opened in the month of a given date.
   * Subroutine of displayMontlyStats().
   * @param date - date you want to check. The day does not matter as long as the month is right.
   * @param commits - List of issues you want to check.
   * @returns the number of issues that was created in the given month.
   */
  const getCommitsOpenedMontly = (date: Date, commits: CommitElement[]): number => {
    const matches = commits.filter((commit) => {
      const createdAt = new Date(commit.committed_date);
      createdAt.setHours(0, 0, 0, 0);
      createdAt.setDate(1);
      date.setHours(0, 0, 0, 0);
      date.setDate(1);
      return createdAt.toLocaleString() === date.toLocaleString();
    });
    return matches.length;
  };

  /**
   * Calculates the number of issues opened and closed for each of the past 7 months.
   * Updates state for Data based on result.
   */
  const displayMontlyStats = () => {
    const today = new Date();
    const chartData: ChartData[] = [];
    commitPromise.then((response) => {
      const allCommits: CommitElement[] = response.data;
      for (let index = 6; index > -1; index -= 1) {
        const last = new Date();
        last.setMonth(today.getMonth() - index);
        const openMatches = getCommitsOpenedMontly(last, allCommits);
        const instance = {
          name: last.toLocaleString('default', { month: 'long' }),
          committed: openMatches,
        };
        chartData.push(instance);
      }
      setData(chartData);
    });
  };

  /**
   * Function for finding out how many issues was opened on the day of a given date.
   * Subroutine of displayDailyStats().
   * @param date - date of the day you want to check.
   * @param commits - List of issues you want to check.
   * @returns the number of issues that was created on the given day.
   */
  const getCommitsOpenedDaily = (date: Date, commits: CommitElement[]): number => {
    const matches = commits.filter((commit) => {
      const createdAt = new Date(commit.committed_date);
      createdAt.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);
      return createdAt.toLocaleString() === date.toLocaleString();
    });
    return matches.length;
  };

  /**
   * Calculates the number of issues opened and closed for each of the past 7 days.
   * Updates state for Data based on result.
   */
  const displayDailyStats = () => {
    const today = new Date();
    const chartData: ChartData[] = [];
    commitPromise.then((response) => {
      const allCommits: CommitElement[] = response.data;
      for (let index = 6; index > -1; index -= 1) {
        const pastDate = new Date(today.getTime() - index * 24 * 60 * 60 * 1000);
        const openMatches = getCommitsOpenedDaily(pastDate, allCommits);
        const instance = {
          name: pastDate.toLocaleDateString('default', { weekday: 'long' }),
          committed: openMatches,
        };
        chartData.push(instance);
      }
      setData(chartData);
    });
  };

  /**
   * Updates state for data and checked radiobutton based on the input. Checks and displays
   * daily stats by default.
   *
   * @param checked - The radiobutton that will be checked.
   */
  const updateChart = (checkedRadio: Checked) => {
    switch (checkedRadio) {
      case 'dailyStats':
        displayDailyStats();
        setChecked('dailyStats');
        break;
      case 'montlyStats':
        displayMontlyStats();
        setChecked('montlyStats');
        break;
      default:
        displayDailyStats();
        setChecked('dailyStats');
    }
  };

  /**
   * Updates state for data and checked radiobutton based on event. Saves selected radiobutton to
   * sessionstorage.
   *
   * @param e - event that triggered the function.
   */
  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedRadio = e.target.value as Checked;
    sessionStorage.setItem('checkedCommitChart', checkedRadio);
    updateChart(checkedRadio);
  };

  return (
    <>
      <h2 id="header">Stats from main branch:</h2>
      <form id="radioButtons">
        <label className="container" htmlFor="dailyStats">
          By day
          <input
            type="radio"
            className="defaultRadioButton"
            id="dailyStats"
            value="dailyStats"
            onChange={handleChangeRadio}
            name="filterButtons"
            checked={checked === 'dailyStats'}
          />
          <span id="allSpan" className="newRadioButton" />
        </label>
        <label className="container" htmlFor="montlyStats">
          By month
          <input
            type="radio"
            className="defaultRadioButton"
            id="montlyStats"
            value="montlyStats"
            onChange={handleChangeRadio}
            name="filterButtons"
            checked={checked === 'montlyStats'}
          />
          <span id="openSpan" className="newRadioButton" />
        </label>
      </form>
      <div id="lineChart">
        <ResponsiveContainer width={chartWidth} aspect={3}>
          <LineChart
            width={800}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend layout="vertical" verticalAlign="top" align="center" />
            <Line
              type="monotone"
              dataKey="committed"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default CommitChart;
