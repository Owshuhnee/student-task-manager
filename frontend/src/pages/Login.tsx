import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex font-['Manrope']">
      {/* Left panel — branding, hidden on small screens */}
      <div className="hidden md:flex md:w-1/2 bg-[#171717] flex-col justify-center gap-[60px] p-16 lg:p-24">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-[1.2px]">Fander University</h2>
          <p className="text-[#a3a3a3] text-base tracking-[3.2px] mt-1">STUDENT TASK MANAGER</p>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-[7.2px] leading-relaxed">
            Stay calm. <br />
            Stay on track. <br />
            Stay honest.
          </h1>
          <p className="text-white text-base tracking-[0.8px] max-w-md pt-2">
            Completion isn't the goal. Consistency is. Fander Task manager learns from what you did not deliver, so the next task lands better than the last.
          </p>
          <p className="text-white text-base font-semibold tracking-[3.2px] pt-2">
            FOCUS · PRIORITY · REFLECTION
          </p>
        </div>

        <p className="text-white text-base font-bold tracking-[0.8px]">v1 - for the semester ahead</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-[370px]">
          <p className="text-sm font-bold tracking-[0.32px] mb-1">LOG IN</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-[0.72px] mb-1">Welcome back.</h1>
          <p className="text-base font-bold tracking-[0.32px] mb-8">Pick up where you left off.</p>

          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold tracking-[2.8px] mb-2">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full h-[50px] rounded-lg border border-[#a3a3a3] px-3 text-base tracking-[0.32px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-[#171717]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold tracking-[2.8px] mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-[50px] rounded-lg border border-[#a3a3a3] px-3 text-base tracking-[0.8px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-[#171717]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-[50px] rounded-2xl bg-[#171717] text-white font-bold tracking-[0.8px] hover:bg-black transition-colors"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-base">
            <span className="text-[#a3a3a3] font-bold tracking-[0.32px]">New here? </span>
            <Link to="/register" className="font-bold tracking-[0.32px] text-black hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login