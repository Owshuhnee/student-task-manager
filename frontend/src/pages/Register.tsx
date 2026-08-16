import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { register } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      await register(name, email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex font-['Manrope']">
      {/* Left panel — branding, white bg, muted text, hidden on small screens */}
      <div className="hidden md:flex md:w-1/2 bg-white flex-col justify-center gap-[60px] p-16 lg:p-24">
        <div>
          <h2 className="text-2xl font-bold text-[rgba(23,23,23,0.47)]">Fander</h2>
          <p className="text-[rgba(23,23,23,0.47)] text-base tracking-[0.32px] mt-1">TASK MANAGER</p>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-[rgba(23,23,23,0.47)] tracking-[0.72px] leading-relaxed">
            Stay calm. <br />
            Stay on track. <br />
            Stay honest.
          </h1>
          <p className="text-[rgba(23,23,23,0.47)] text-base tracking-[0.32px] max-w-md pt-2">
            Completion isn't the goal. Consistency is. Fander Task manager learns from what you did not deliver, so the next task lands better than the last.
          </p>
          <p className="text-[rgba(23,23,23,0.47)] text-base font-semibold tracking-[5.28px] pt-2">
            FOCUS · PRIORITY · REFLECTION
          </p>
        </div>

        <p className="text-[rgba(23,23,23,0.47)] text-base font-bold tracking-[0.32px]">v1 - for the semester ahead</p>
      </div>

      {/* Right panel — form, dark bg */}
      <div className="flex-1 bg-[#171717] flex items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-[372px]">
          <p className="text-white text-base font-bold tracking-[0.32px] mb-1">Get Started</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-[0.72px] mb-1">Create your space</h1>
          <p className="text-white text-base font-bold tracking-[0.32px] mb-8">Free forever for students.</p>

          {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-white tracking-[2.8px] mb-2">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full h-[50px] rounded-lg border border-[#a3a3a3] px-3 text-base tracking-[0.32px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white tracking-[2.8px] mb-2">NAME</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-[50px] rounded-lg border border-[#a3a3a3] px-3 text-base tracking-[0.32px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white tracking-[2.8px] mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-[50px] rounded-lg border border-[#a3a3a3] px-3 text-base tracking-[0.32px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white tracking-[2.8px] mb-2">CONFIRM PASSWORD</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full h-[50px] rounded-lg border border-[#a3a3a3] px-3 text-base tracking-[0.32px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <button
              type="submit"
              className="w-full h-[50px] rounded-2xl bg-[#525252] text-white font-bold tracking-[0.32px] hover:bg-[#3f3f3f] transition-colors mt-2"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-base text-center">
            <span className="text-white font-bold tracking-[0.32px]">Already have an account? </span>
            <Link to="/login" className="font-bold tracking-[0.32px] text-white hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register