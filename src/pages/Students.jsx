import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Students() {
  const [students, setStudents] = useState([])
  const [professor, setProfessor] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('professor')
    if (!stored) {
      navigate('/login')
      return
    }
    setProfessor(JSON.parse(stored))

    axios.get('https://assignment-portal-backend-zyn8.onrender.com/users')
      .then(res => {
        // Filter only students from the users list
        const onlyStudents = res.data.filter(u => u.role === 'student')
        setStudents(onlyStudents)
      })
      .catch(err => console.log(err))
  }, [])

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
          <button style={styles.navBtn} onClick={() => navigate('/dashboard')}>Submissions</button>
          <button style={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={styles.content}>
        <h3 style={styles.pageTitle}>All Students ({students.length})</h3>

        {students.length === 0
          ? <p style={styles.empty}>No students registered yet.</p>
          : students.map(s => (
            <div key={s._id} style={styles.card}>
              <p style={styles.name}>👤 {s.name}</p>
              <p style={styles.email}>{s.email}</p>
            </div>
          ))
        }
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
  content: { maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' },
  pageTitle: { color: '#333', marginBottom: '1.5rem' },
  empty: { color: '#888', textAlign: 'center', marginTop: '2rem' },
  card: { background: 'white', padding: '1.2rem', borderRadius: '12px', marginBottom: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', borderLeft: '4px solid #43e97b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontWeight: '700', color: '#333', margin: 0 },
  email: { color: '#888', fontSize: '0.9rem', margin: 0 }
}

export default Students