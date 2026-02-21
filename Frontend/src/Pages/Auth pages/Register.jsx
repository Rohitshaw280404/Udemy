import { useState } from 'react';

export function Register({ onSwitchToLogin, onRegister, loading }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await onRegister(form);
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Create Account</h1>
      <form className="grid gap-3" onSubmit={onSubmit}>
        {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
        <input
          type="text"
          placeholder="Full name"
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          required
        />
        <select
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
          value={form.role}
          onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
        >
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white transition hover:bg-teal-800"
        >
          {loading ? 'Creating...' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{' '}
        <button type="button" className="font-medium text-sky-700 transition hover:text-sky-900" onClick={onSwitchToLogin}>
          Sign in
        </button>
      </p>
    </section>
  );
}
