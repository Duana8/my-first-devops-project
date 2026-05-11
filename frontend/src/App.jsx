import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Мы стучимся на /api/, Nginx поймет, что это нужно отправить на бэк
    fetch('/api/status')
      .then(res => {
        if (!res.ok) throw new Error('API not responding');
        return res.json();
      })
      .then(json => setData(json))
      .catch(err => setError(err.message))
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#646cff' }}>True DevOps Fullstack</h1>
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {data ? (
        <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '10px', display: 'inline-block' }}>
          <p style={{ color: 'green', fontWeight: 'bold' }}>{data.message}</p>
          <p>Database says: <br/> <code>{data.dbTime}</code></p>
        </div>
      ) : (
        !error && <p>Connecting to Backend...</p>
      )}
    </div>
  )
}

export default App