import { useState } from 'react';

export function Register({ onSwitchToLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const onSubmit = (event) => {
    event.preventDefault();
    alert(`Welcome ${form.name}! Your account has been created (demo).`);
  };

  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Create Account</h1>
      <form className="grid gap-3" onSubmit={onSubmit}>
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
        <button
          type="submit"
          className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white transition hover:bg-teal-800"
        >
          Register
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
