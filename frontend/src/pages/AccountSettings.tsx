import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserCircle, UserSquare, SignOut } from '@phosphor-icons/react';
import { useAuth } from '../context/AuthContext';

export default function AccountSettings() {
  const { user, logout, updateProfile, changePassword } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  async function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');
    setSavingProfile(true);
    try {
      await updateProfile( name, email );
      setProfileSuccess('Profile updated.');
    } catch {
      setProfileError('Could not update profile. Please try again.');
    } finally {
      setSavingProfile(false);
    }
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setSavingPassword(true);
    try {
      await changePassword( currentPassword, newPassword );
      setPasswordSuccess('Password changed.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setPasswordError('Current password is incorrect.');
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <div className="min-h-screen bg-white font-['Manrope']">
      <header className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-4">
        <div>
          <h1 className="text-sm font-bold tracking-wide text-[#171717]">Fander University</h1>
          <p className="text-[10px] font-medium tracking-widest text-[#a3a3a3]">STUDENT TASK MANAGER</p>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/dashboard" className="text-sm font-medium text-[#525252] hover:text-[#171717]">
            Dashboard
          </Link>
          <Link
            to="/account"
            className="flex items-center gap-1.5 rounded-full border border-[#e5e5e5] px-3 py-1.5 text-sm font-medium text-[#171717]"
          >
            <UserSquare size={16} weight="bold" />
            {user?.name}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm font-medium text-[#525252] hover:text-[#171717]"
          >
            <SignOut size={16} weight="bold" />
            Logout
          </button>
        </nav>
      </header>

      <main className="flex flex-col items-center px-4 py-16">
        <div className="flex w-full max-w-[370px] flex-col items-center gap-11">
          <div className="flex items-center gap-3">
            <UserCircle size={64} weight="regular" className="text-[#171717]" />
            <h2 className="text-3xl font-bold tracking-wide text-[#a3a3a3]">{user?.name}</h2>
          </div>

          <form onSubmit={handleProfileSubmit} className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-[7px]">
              <label className="text-[14px] font-semibold tracking-[2.8px] text-[#a3a3a3]">NAME</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-[50px] rounded-lg border border-[#a3a3a3] bg-[#a3a3a3] px-3 text-[16px] text-black shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label className="text-[14px] font-semibold tracking-[2.8px] text-[#a3a3a3]">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[50px] rounded-lg border border-[#a3a3a3] bg-[#a3a3a3] px-3 text-[16px] text-black shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] focus:outline-none"
              />
            </div>

            {profileError && <p className="text-sm text-red-600">{profileError}</p>}
            {profileSuccess && <p className="text-sm text-green-600">{profileSuccess}</p>}

            <button
              type="submit"
              disabled={savingProfile}
              className="h-[50px] rounded-lg bg-[#525252] text-[16px] font-bold text-white hover:bg-[#3f3f3f] disabled:opacity-50"
            >
              {savingProfile ? 'Saving...' : 'Update'}
            </button>
          </form>

          <div className="h-px w-full bg-[#e5e5e5]" />

          <form onSubmit={handlePasswordSubmit} className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-[7px]">
              <label className="text-[14px] font-semibold tracking-[2.8px] text-[#a3a3a3]">CURRENT PASSWORD</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-[50px] rounded-lg border border-[#a3a3a3] bg-[#a3a3a3] px-3 text-[16px] text-black shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label className="text-[14px] font-semibold tracking-[2.8px] text-[#a3a3a3]">NEW PASSWORD</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-[50px] rounded-lg border border-[#a3a3a3] bg-[#a3a3a3] px-3 text-[16px] text-black shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label className="text-[14px] font-semibold tracking-[2.8px] text-[#a3a3a3]">CONFIRM NEW PASSWORD</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-[50px] rounded-lg border border-[#a3a3a3] bg-[#a3a3a3] px-3 text-[16px] text-black shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] focus:outline-none"
              />
            </div>

            {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
            {passwordSuccess && <p className="text-sm text-green-600">{passwordSuccess}</p>}

            <button
              type="submit"
              disabled={savingPassword}
              className="h-[50px] rounded-lg bg-[#525252] text-[16px] font-bold text-white hover:bg-[#3f3f3f] disabled:opacity-50"
            >
              {savingPassword ? 'Saving...' : 'Change Password'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}