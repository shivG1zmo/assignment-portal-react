import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
  const [professor, setProfessor] = useState(null)
  const [assignments, setAssignments] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('professor')
    if (!stored) {
      navigate('/login')
      return
    }
    setProfessor(JSON.parse(stored))

    // Fetch assignments and submissions when component loads
    axios.get('http://localhost:3000/assignments')
      .then(res => setAssignments(res.data))
      .catch(err => console.log(err))

    axios.get('http://localhost:3000/submissions')
      .then(res => setSubmissions(res.data))
      .catch(err => console.log(err))
  }, [])

  // Filter submissions for selected assignment
  const filteredSubmissions = selectedAssignment
    ? submissions.filter(s => s.assignment?._id === selectedAssignment)
    : submissions

  const logout = () => {
    localStorage.removeItem('professor')
    navigate('/login')
  }

  return (
    <div style={styles.page}>
      <div style={styles.navbar}>
        <h2 style={styles.navTitle}>🎓 Professor Dashboard</h2>
        <div style={styles.navRight}>
          <span style={styles.welcome}>Hello, {professor?.name}</span>
          <button style={styles.navBtn} onClick={() => navigate('/students')}>Students</button>
          <button style={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Assignments</h3>
          <div
            style={selectedAssignment === null ? {...styles.assignmentItem, ...styles.activeItem} : styles.assignmentItem}
            onClick={() => setSelectedAssignment(null)}
          >
            All Submissions
          </div>
          {assignments.map(a => (
            <div
              key={a._id}
              style={selectedAssignment === a._id ? {...styles.assignmentItem, ...styles.activeItem} : styles.assignmentItem}
              onClick={() => setSelectedAssignment(a._id)}
            >
              {a.title}
            </div>
          ))}
        </div>

        <div style={styles.main}>
          <h3 style={styles.mainTitle}>
            {selectedAssignment
              ? assignments.find(a => a._id === selectedAssignment)?.title
              : 'All Submissions'}
          </h3>

          {filteredSubmissions.length === 0
            ? <p style={styles.empty}>No submissions yet.</p>
            : filteredSubmissions.map(s => (
              <div key={s._id} style={styles.card}>
                <p style={styles.studentName}>👤 {s.student?.name}</p>
                <p style={styles.studentEmail}>{s.student?.email}</p>
                <p style={styles.assignment}>📝 {s.assignment?.title}</p>
                <p style={styles.date}>
                  Submitted: {new Date(s.submittedAt).toLocaleDateString()}
                </p>
                <a
                  href={'http://localhost:3000/' + s.filePath}
                  target="_blank"
                  style={styles.downloadBtn}
                >
                  Download File
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f4ff' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' },
  navTitle: { margin: 0, fontSize: '1.3rem' },
  navRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  welcome: { fontSize: '0.95rem' },
  navBtn: { padding: '0.4rem 1rem', background: 'white', color: '#667eea', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' },
  logoutBtn: { padding: '0.4rem 1rem', background: 'transparent', color: 'white', border: '2px solid white', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' },
  content: { display: 'flex', maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem', gap: '1.5rem' },
  sidebar: { width: '250px', background: 'white', borderRadius: '12px', padding: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: 'fit-content' },
  sidebarTitle: { color: '#444', marginBottom: '1rem', fontSize: '1rem' },
  assignmentItem: { padding: '0.7rem 1rem', borderRadius: '8px', cursor: 'pointer', marginBottom: '0.4rem', color: '#555', fontSize: '0.9rem' },
  activeItem: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' },
  main: { flex: 1 },
  mainTitle: { color: '#333', marginBottom: '1rem' },
  empty: { color: '#888', textAlign: 'center', marginTop: '2rem' },
  card: { background: 'white', padding: '1.2rem', borderRadius: '12px', marginBottom: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', borderLeft: '4px solid #667eea' },
  studentName: { fontWeight: '700', color: '#333', margin: '0 0 0.2rem 0' },
  studentEmail: { color: '#888', fontSize: '0.85rem', margin: '0 0 0.5rem 0' },
  assignment: { color: '#555', fontSize: '0.9rem', margin: '0 0 0.3rem 0' },
  date: { color: '#888', fontSize: '0.85rem', margin: '0 0 0.8rem 0' },
  downloadBtn: { padding: '0.4rem 1rem', background: 'linear-gradient(135deg, #43e97b, #38f9d7)', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }
}

export default Dashboard