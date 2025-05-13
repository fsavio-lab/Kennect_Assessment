import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import MetricsSection from './components/MetricsSection/MetricsSection'
import { GITHUB_REPO_SEARCH_URL, GITHUB_ISSUES_URL, GITHUB_PERSONAL_ACCESS_TOKEN } from './constants'

function App() {

  // States
  const [repoName, setRepoName] = useState("")
  const [issues, setIssues] = useState({
    "owner": "",
    "repo_name": "",
    "issues": [],
    "repo_url": ""
  })
  const [isModalOpen, setModalOpen] = useState(false)

  let searchRepository = async () => {
    if (!repoName) return
    const repoRequest = await fetch(GITHUB_REPO_SEARCH_URL(repoName),{
          headers: {
            "Authorization": GITHUB_PERSONAL_ACCESS_TOKEN
          }
        })
    const repoResponse = await repoRequest.json();
    if (repoResponse.items && repoResponse.items.length > 0) {
      const { owner, name, html_url } = repoResponse.items[0]
      let latestIssues = []
      for (let page = 1; page <= 10; page++) {
        const res = await fetch(GITHUB_ISSUES_URL(owner.login, name, page), {
          headers: {
            "Authorization": GITHUB_PERSONAL_ACCESS_TOKEN
          }
        });
        const data = await res.json();

        if (data.length === 0 || res.status !== 200) break;
        latestIssues.push(...data);
        if (data.length < 100) break;
      }
      setIssues(prev => ({ ...prev, "owner": owner.login, "issues": latestIssues, "repo_url": html_url }))
      console.log(latestIssues)
    } else {
      setIssues(prev => ({
        "issues": [],
        "repo_name": "",
        "owner": "",
        "repo_url": ""
      }));
      alert('Repository not found.');
    }
  }

  return (
    <>
      {isModalOpen &&
        <div className="modal-overlay">
          <div className='modal'>
            <h2 className="modal-title">Issues List</h2>
            <div style={{ maxHeight: '720px', overflowY: 'auto', border: '1px solid #ccc', marginBlock: 16}}>
              <table style={{ borderCollapse: 'collapse', width: '100%'}}>
                <thead>
                  <tr>
                    <th className="thStyle">ID</th>
                    <th className="thStyle">Issue</th>
                    <th className="thStyle">Created At</th>
                    <th className="thStyle">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.issues.map(issue => (
                    <tr key={issue.id}>
                      <td className="tdStyle">#{issue.number}</td>
                      <td className="tdStyle"><a href={issue.html_url}>{issue.title}</a></td>
                      <td className="tdStyle">{issue.created_at}</td>
                      <td className="tdStyle">{issue.state}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="close-button" onClick={() => setModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      }
      <Navbar value={repoName} onChange={(event) => setRepoName(event.target.value)} onClick={() => {
        setIssues(prev => ({
          "issues": [],
          "repo_name": repoName,
          "owner": "",
        }));
        searchRepository()
      }} />
      <MetricsSection issuesData={issues} />
      {issues.issues.length > 0 ? <button className="viewAll" type="button" onClick={() => setModalOpen(true)}>View Issues</button> : <></>}
      <footer className='footer'>
        Developed by Savio Fernando
      </footer>
    </>
  )
}

export default App
