import { Routes, Route } from 'react-router'

function Login() { return <h1>Login page</h1> }
function Register() { return <h1>Register page</h1> }
function Dashboard() { return <h1>Dashboard page</h1> }

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App