import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.post('http://localhost:3000/users/login', { email, password })
      if (response.data.user.role !== 'professor') {
        setError('This dashboard is for professors only.')
        setLoading(false)
        return
      }
      localStorage.setItem('professor', JSON.stringify(response.data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.')
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎓 Professor Dashboard</h1>
        <p style={styles.subtitle}>Login to view submissions</p>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
        </div>
        <button style={loading ? {...styles.button, opacity: 0.6} : styles.button} onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  card: { background: 'white', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' },
  title: { fontSize: '1.8rem', fontWeight: '700', textAlign: 'center', color: '#333', marginBottom: '0.3rem' },
  subtitle: { textAlign: 'center', color: '#888', marginBottom: '2rem' },
  formGroup: { marginBottom: '1.2rem' },
  label: { display: 'block', fontWeight: '600', marginBottom: '0.4rem', color: '#555' },
  input: { width: '100%', padding: '0.75rem 1rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.85rem', background: 'linear-gradient(135deg, #f093fb, #f5576c)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem' },
  error: { marginTop: '1rem', padding: '0.75rem', background: '#ffe0e0', color: '#d00', borderRadius: '8px', textAlign: 'center' }
}

export default Login