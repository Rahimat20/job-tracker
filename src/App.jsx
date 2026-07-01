import { useState, useEffect } from 'react'
import Login from "./components/Login";
import SignUp from "./components/SignUp";


const STATUS = {
  applied: { label: "Applied", color: "#5B7FBD", bg: "#EAF0FA" },
  assessment: { label: "Assessment", color: "#C99A3B", bg: "#FBF3E3" },
  interview: { label: "Interview", color: "#C99A3B", bg: "#FBF3E3" },
  offer: { label: "Offer", color: "#5E8C61", bg: "#EAF3EA" },
  rejected: { label: "Rejected", color: "#B5564A", bg: "#FAEAE8" }
};

const APPLICATION = [
  { id: 1, company: "Mono", job: "Backend Engineering Intern", status: "assessment", date: '2026-07-10', notes: "Passed assessment stage, awaiting response." },
  { id: 2, company: "ValueJet", job: "Graduate Trainee", status: "applied", date: '2026-07-10', notes: "" },
  { id: 3, company: "Pwc", job: "Consultant", status: "interview", date: '2026-07-10', notes: "Video assessment done." },
];
function App(){
  const [applications, setApplications] = useState(APPLICATION);
  const [company, setCompany] = useState('')
  const [job, setJob] = useState('')
  const [status, setStatus] = useState('')
  const [ date, setDate] = useState ('')
  const [notes, setNotes] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter]=useState('all')
  const [screen, setScreen] = useState('login')


function addApplications() {
  if (editingId === null) {
    const newApplication = {id:Date.now(), company, job, status, date, notes};
    setApplications([...applications, newApplication]);
  } else {
    setApplications(applications.map(app =>
      app.id === editingId ? { id: app.id, company, job, status, date, notes } : app
    ));
    setEditingId(null);
  }
  setCompany('');
  setJob('');
  setStatus('');
  setDate('');
  setNotes('');
}
 function deleteApplication(id) {
  setApplications(applications.filter(app => app.id !== id));
}

function editApplication(app) {
  setEditingId(app.id);
  setCompany(app.company);
  setJob(app.job);
  setStatus(app.status);
  setDate(app.date);
  setNotes(app.notes);
}
const visibleApplications = applications.filter(app => filter === 'all' || app.status === filter);
 useEffect(() => {
    localStorage.setItem("application", JSON.stringify(applications));
  }, [applications]);
  useEffect(() => { const savedApplications = localStorage.getItem("application"); if (savedApplications) { setApplications(JSON.parse(savedApplications)); } }, []);

  return(
    <div>
    {screen === 'login' && <Login goToSignup={() => setScreen('signup')} goToApp={() => setScreen('tracker')} />}
{screen === 'signup' && <SignUp goToLogin={() => setScreen('login')} goToApp={() => setScreen('tracker')} />}

{screen === 'tracker' && (
     <div className="min-h-screen bg-[#FAF8F5] py-8 px-4">
    <div className="max-w-2xl mx-auto">
    
    <h1  className="text-4xl font-bold text-[#1C2541] tracking-tight">
      Job Application Tracker
    </h1>
    <p className='text-[#5C6784] mt-1 mb-6'> Every application, one place, no spreadsheet.</p>
     <div>
      <div className="flex gap-2 mb-5 flex-wrap">
      <button
        onClick={() => setFilter('all')}
        className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
        style={filter === 'all' ? { backgroundColor: "#1C2541", color: "white", borderColor: "#1C2541" } : { backgroundColor: "white", color: "#5C6784", borderColor: "#E4E0D8" }}
      >All</button>
      <button
        onClick={() => setFilter('applied')}
        className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
        style={filter === 'applied' ? { backgroundColor: "#1C2541", color: "white", borderColor: "#1C2541" } : { backgroundColor: "white", color: "#5C6784", borderColor: "#E4E0D8" }}
      >Applied</button>
      <button
        onClick={() => setFilter('assessment')}
        className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
        style={filter === 'assessment' ? { backgroundColor: "#1C2541", color: "white", borderColor: "#1C2541" } : { backgroundColor: "white", color: "#5C6784", borderColor: "#E4E0D8" }}
      >Assessment</button>
      <button
        onClick={() => setFilter('interview')}
        className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
        style={filter === 'interview' ? { backgroundColor: "#1C2541", color: "white", borderColor: "#1C2541" } : { backgroundColor: "white", color: "#5C6784", borderColor: "#E4E0D8" }}
      >Interview</button>
      <button
        onClick={() => setFilter('offer')}
        className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
        style={filter === 'offer' ? { backgroundColor: "#1C2541", color: "white", borderColor: "#1C2541" } : { backgroundColor: "white", color: "#5C6784", borderColor: "#E4E0D8" }}
      >Offer</button>
      <button
        onClick={() => setFilter('rejected')}
        className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
        style={filter === 'rejected' ? { backgroundColor: "#1C2541", color: "white", borderColor: "#1C2541" } : { backgroundColor: "white", color: "#5C6784", borderColor: "#E4E0D8" }}
      >Rejected</button>
      </div>
 
      {visibleApplications.map((app) =>(
        <div className='flex items-stretch bg-white rounded-xl border border-[#E4E0D8] mb-3 overflow-hidden shadow-sm hover:shadow-md transition-shadow' key={app.id}>
          <div className="w-1.5" style={{ backgroundColor: STATUS[app.status]?.color || "#9098AC" }} />
          <div className="flex-1 px-5 py-4">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-bold text-[#1C2541]"> {app.company}</p>
              <p
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ color: STATUS[app.status]?.color || "#5C6784", backgroundColor: STATUS[app.status]?.bg || "#F4F1EA" }}
              >
                {STATUS[app.status]?.label || app.status}
              </p>
            </div>
            <p className="text-sm text-[#5C6784]">{app.job}</p>
            <p className="text-xs text-[#9098AC] mt-1">{app.date}</p>
            {app.notes && <p className="text-xs text-[#5C6784] italic mt-1">{app.notes}</p>}
            <div className="flex gap-2 mt-3">
              <button onClick={() => deleteApplication(app.id)} className="px-3 py-1.5 text-xs font-semibold rounded-lg text-[#B5564A] hover:bg-[#FAEAE8]"> Delete</button>
              <button onClick={() => editApplication (app)} className="px-3 py-1.5 text-xs font-semibold rounded-lg text-[#5C6784] hover:bg-[#F4F1EA]" > Edit</button>
            </div>
          </div>
         </div> 
         
      ))}
 
      <div className="bg-white rounded-xl border border-[#E4E0D8] p-5 mt-5 shadow-sm">
      <button onClick={addApplications} className="px-4 py-2 text-sm font-semibold text-white rounded-lg mb-3" style={{ backgroundColor: "#1C2541" }}> Add Application</button>
 
      <div className="grid grid-cols-2 gap-3">
         <input
         type="text"
         value={company}
         onChange={(e) => setCompany(e.target.value)}
         placeholder="company"
         className="border border-[#E4E0D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B7FBD]"
       />
       
        <input
         type="text"
         value={job}
         onChange={(e) => setJob(e.target.value)}
         placeholder="job"
         className="border border-[#E4E0D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B7FBD]"
       />
       <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-[#E4E0D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B7FBD]">
      <option value="applied">Applied</option>
      <option value="assessment">Assessment</option>
      <option value="interview">Interview</option>
      <option value="offer">Offer</option>
      <option value="rejected">Rejected</option>
      </select>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-[#E4E0D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B7FBD]" />
      </div>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder='Notes' className="border border-[#E4E0D8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5B7FBD] w-full mt-3"></textarea>
      </div>
     </div>
    </div>
    </div>
    )}
  </div>
  )
}
export default App
 