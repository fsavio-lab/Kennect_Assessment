import React from 'react'
import './MetricsSection.css'
import {
  LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';
import { getWeekKey } from '../../utils';
import { CHART_DIMENSIONS, WEEK_DELTA } from '../../constants';


const MetricsSection = ({ issuesData }) => {

  let data = {
    ratioOpenClosed: Object.values(issuesData.issues.reduce((acc, issue) => (
      ((w => (acc[w] = acc[w] || { week: w, opened: 0, closed: 0 }, acc[w].opened++))(getWeekKey(issue.created_at))),
      (issue.closed_at && (w => (acc[w] = acc[w] || { week: w, opened: 0, closed: 0 }, acc[w].closed++))(getWeekKey(issue.closed_at))),
      acc
    ), {})).slice(0, WEEK_DELTA)
  }
  data.weeklyClosureRate = data.ratioOpenClosed.map(ele => ({ ...ele, "rate": ele.closed / ele.opened }))
  data.avgClosureRate = data.weeklyClosureRate.reduce((sum, val) => sum + val.rate, 0)
  if (!issuesData.repo_name && issuesData.issues.length == 0) {
    return (
      <div className='empty-box'>
        <p>Please search for a repository to display metrics</p>
      </div>
    )
  } else if (!issuesData.owner && issuesData.issues.length == 0) {
    return (
      <>
        <h1>{issuesData["repo_name"]}</h1>
        <div className='loading'>
          <h3>Please wait</h3>
        </div>
      </>

    )
  } else {
    return (
      <div className='main-section'>
        <div>
          <a className="headline" href={issuesData.repo_url}>{issuesData.owner}/{issuesData.repo_name}</a>
          <section className='metrics'>
            <div id="state-wise-count" className='metrics'>
              <h2>Status Wise Issues Count</h2>
              <BarChart width={CHART_DIMENSIONS.width} height={CHART_DIMENSIONS.height} data={Object.entries(issuesData.issues.reduce((acc, { state }) =>
                ((acc[state] = (acc[state] || 0) + 1), acc), {}))
                .map(([state, count]) => ({ state, count }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" width={24} />
              </BarChart>
            </div>
            <div id="week-wise-count" className='metrics'>
              <h2>Weekly Status Wise Issues Count</h2>
              <LineChart width={CHART_DIMENSIONS.width} height={CHART_DIMENSIONS.height} data={Object.entries(
                issuesData.issues.reduce((acc, issue) => {
                  const week = getWeekKey(issue.created_at);
                  acc[week] = (acc[week] || 0) + 1;
                  return acc;
                }, {})
              ).map(([week, count]) => ({ week, count })).slice(0, WEEK_DELTA)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </div>
            <div id="ratio-new-or-closed-issues" className='metrics'>
              <h2>Ratio of Closed to Open Issues</h2>
              <BarChart width={CHART_DIMENSIONS.width} height={CHART_DIMENSIONS.height} data={data.ratioOpenClosed}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="closed" fill="#00b87a" width={10} />
                <Bar dataKey="opened" fill="#82ca9d" width={10} />
              </BarChart>
            </div>
            <div id="weekly-closed-rate" className='metrics'>
              {/* Contains Weekly and Average Weekly Rate */}
              <h2>Weekly Closure Rate (Avg: {data.avgClosureRate})</h2>
              <BarChart width={CHART_DIMENSIONS.width} height={CHART_DIMENSIONS.height} data={data.weeklyClosureRate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rate" fill="#00b87a" width={10} />
              </BarChart>
            </div>
          </section>
        </div >
      </div >
    )
  }
}

export default MetricsSection