import React, { useState, useEffect, useContext } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './css/IssueChart.css';
import IssueContext from './IssueContextProvider';

interface IssueElement {
  created_at: string;
  closed_at: string | null;
}

interface ChartData {
  name: string;
  'issues opened': number;
  'issues closed': number;
}

type Checked = 'dailyStats' | 'monthlyStats';

/**
 * Gets a chartsize based on the size of the window.
 * @returns the chartsize
 */
const getChartSize = (): string => {
  const screenwidth = window.screen.width;
  let chartWidth = '80%';
  if (screenwidth < 800) {
    chartWidth = '100%';
  }
  return chartWidth;
};

// Used to scale the Responsive Container element.
const chartWidth = getChartSize();

const IssueChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [checked, setChecked] = useState<Checked>();
  const context = useContext(IssueContext);
  /**
   * Retrieves active radiobutton from sessionstorage and updates chart based on what was retrieved
   */
  useEffect(() => {
    const checkedRadio = sessionStorage.getItem('checkedIssueChart') as Checked;
    updateChart(checkedRadio);
  }, [context]);

  /**
   * Function for finding out how many issues was opened in the month of a given date.
   * Subroutine of displaymonthlyStats().
   * @param date - date you want to check. The day does not matter as long as the month is right.
   * @param issues - List of issues you want to check.
   * @returns the number of issues that was created in the given month.
   */
  const getIssuesOpenedMontly = (date: Date, issues: IssueElement[]): number => {
    const matches = issues.filter((issue) => {
      const createdAt = new Date(issue.created_at);
      createdAt.setHours(0, 0, 0, 0);
      createdAt.setDate(1);
      date.setHours(0, 0, 0, 0);
      date.setDate(1);
      return createdAt.toLocaleString() === date.toLocaleString();
    });
    return matches.length;
  };

  /**
   * Function for finding out how many issues was closed in the month of a given date.
   * Subroutine of displaymonthlyStats().
   * @param date - date you want to check. The day does not matter as long as the month is right.
   * @param issues - List of issues you want to check.
   * @returns the number of issues that was closed in the given month.
   */
  const getIssuesClosedMontly = (date: Date, issues: IssueElement[]): number => {
    const matches = issues.filter((issue) => {
      const closedAt = new Date(issue.closed_at!);
      closedAt.setHours(0, 0, 0, 0);
      closedAt.setDate(1);
      date.setHours(0, 0, 0, 0);
      date.setDate(1);
      return closedAt.toLocaleString() === date.toLocaleString();
    });
    return matches.length;
  };

  /**
   * Calculates the number of issues opened and closed for each of the past 7 months.
   * Updates state for Data based on result.
   */
  const displaymonthlyStats = () => {
    const today = new Date();
    const chartData: ChartData[] = [];
    for (let index = 6; index > -1; index -= 1) {
      const last = new Date();
      last.setMonth(today.getMonth() - index);
      const openMatches = getIssuesOpenedMontly(last, context);
      const closedMatches = getIssuesClosedMontly(last, context);
      const instance = {
        name: last.toLocaleString('default', { month: 'long' }),
        'issues opened': openMatches,
        'issues closed': closedMatches,
      };
      chartData.push(instance);
    }
    setData(chartData);
  };

  /**
   * Function for finding out how many issues was opened on the day of a given date.
   * Subroutine of displayDailyStats().
   * @param date - date of the day you want to check.
   * @param issues - List of issues you want to check.
   * @returns the number of issues that was created on the given day.
   */
  const getIssuesOpenedDaily = (date: Date, issues: IssueElement[]): number => {
    const matches = issues.filter((issue) => {
      const createdAt = new Date(issue.created_at);
      createdAt.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);
      return createdAt.toLocaleString() === date.toLocaleString();
    });
    return matches.length;
  };

  /**
   * Function for finding out how many issues was closed on the day of a given date.
   * Subroutine of displayDailyStats().
   * @param date - date of the day you want to check.
   * @param issues - List of issues you want to check.
   * @returns the number of issues that was closed on the given day.
   */
  const getIssuesClosedDaily = (date: Date, issues: IssueElement[]): number => {
    const matches = issues.filter((issue) => {
      const closedAt = new Date(issue.closed_at!);
      closedAt.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);
      return closedAt.toLocaleString() === date.toLocaleString();
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
    for (let index = 6; index > -1; index -= 1) {
      const pastDate = new Date(today.getTime() - (index * 24 * 60 * 60 * 1000));
      const openMatches = getIssuesOpenedDaily(pastDate, context);
      const closedMatches = getIssuesClosedDaily(pastDate, context);
      const instance = {
        name: pastDate.toLocaleDateString('default', { weekday: 'long' }),
        'issues opened': openMatches,
        'issues closed': closedMatches,
      };
      chartData.push(instance);
    }
    setData(chartData);
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
      case 'monthlyStats':
        displaymonthlyStats();
        setChecked('monthlyStats');
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
    sessionStorage.setItem('checkedIssueChart', checkedRadio);
    updateChart(checkedRadio);
  };

  return (
    <>
      <h2 id="header">Stats:</h2>
      <form id="radioButtons">
        <label className="container" htmlFor="dailyStats">
          By day
          <input type="radio" className="defaultRadioButton" id="dailyStats" value="dailyStats" onChange={handleChangeRadio} name="filterButtons" checked={checked === 'dailyStats'} />
          <span id="allSpan" className="newRadioButton" />
        </label>
        <label className="container" htmlFor="monthlyStats">
          By month
          <input type="radio" className="defaultRadioButton" id="monthlyStats" value="monthlyStats" onChange={handleChangeRadio} name="filterButtons" checked={checked === 'monthlyStats'} />
          <span id="openSpan" className="newRadioButton" />
        </label>
      </form>
      <div id="lineChart">
        <ResponsiveContainer width={chartWidth} aspect={3}>
          <LineChart
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
            <Line
              type="monotone"
              dataKey="issues opened"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="issues closed" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default IssueChart;
