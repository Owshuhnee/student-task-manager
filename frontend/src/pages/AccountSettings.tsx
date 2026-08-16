import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

function AccountSettings() {
  const { user, updateProfile, changePassword, logout } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [profileError, setProfileError] = useState<string | null>(null)
  const [profileSaved, setProfileSaved] = useState(false)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSaved, setPasswordSaved] = useState(false)

  async function handleProfileSubmit(e: FormEvent) {
    e.preventDefault()
    setProfileError(null)
    setProfileSaved(false)
    try {
      await updateProfile(name, email)
      setProfileSaved(true)
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : 'Failed to update profile')
    }
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault()
    setPasswordError(null)
    setPasswordSaved(false)
    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match')
      return
    }
    try {
      await changePassword(currentPassword, newPassword)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setPasswordSaved(true)
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'Failed to change password')
    }
  }

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div>
      <h1>Account Settings</h1>

      <form onSubmit={handleProfileSubmit}>
        <h2>Profile</h2>
        {profileError && <p style={{ color: 'red' }}>{profileError}</p>}
        {profileSaved && <p style={{ color: 'green' }}>Profile updated.</p>}
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button type="submit">Save profile</button>
      </form>

      <form onSubmit={handlePasswordSubmit}>
        <h2>Change password</h2>
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        {passwordSaved && <p style={{ color: 'green' }}>Password changed.</p>}
        <label>
          Current password
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
        </label>
        <label>
          New password
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </label>
        <label>
          Confirm new password
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        <button type="submit">Change password</button>
      </form>

      <button type="button" onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default AccountSettings