import { useState } from 'react';

export function Createcourse({ onCreateCourse, courses, selectedCourseId, onSelectCourse, onAddLecture, loading }) {
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      await onCreateCourse(form);
      setForm({ title: '', category: '', description: '' });
      setMessage('Course created successfully');
    } catch (err) {
      setError(err.message || 'Failed to create course');
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-3xl font-black tracking-tight text-slate-900">Create Course</h1>
      <form className="grid gap-3" onSubmit={onSubmit}>
        {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
        {message ? <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p> : null}
        <input
          type="text"
          placeholder="Course title"
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
          value={form.category}
          onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
          required
        />
        <textarea
          placeholder="Course description"
          className="min-h-28 rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          required
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white transition hover:bg-teal-800"
          >
            {loading ? 'Saving...' : 'Save course'}
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            onClick={onAddLecture}
          >
            Add lectures
          </button>
        </div>
      </form>

      <div className="mt-6 grid gap-2">
        <h2 className="text-lg font-semibold text-slate-900">Your Courses</h2>
        <select
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
          value={selectedCourseId}
          onChange={(event) => onSelectCourse(event.target.value)}
        >
          <option value="">Select a course to manage lectures</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
