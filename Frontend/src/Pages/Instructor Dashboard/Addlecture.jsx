import { useState } from 'react';

export function Addlecture({
  courses,
  selectedCourseId,
  onSelectCourse,
  onPublishLecture,
  onSeeStudents,
  loading,
}) {
  const [lecture, setLecture] = useState({ title: '', videoUrl: '', description: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!selectedCourseId) {
      setError('Please select a course first');
      return;
    }

    setError('');
    setMessage('');
    try {
      await onPublishLecture(lecture);
      setLecture({ title: '', videoUrl: '', description: '' });
      setMessage('Lecture published successfully');
    } catch (err) {
      setError(err.message || 'Failed to publish lecture');
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-3xl font-black tracking-tight text-slate-900">Add Lecture</h1>
      <form className="grid gap-3" onSubmit={onSubmit}>
        {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
        {message ? <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p> : null}
        <select
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
          value={selectedCourseId}
          onChange={(event) => onSelectCourse(event.target.value)}
        >
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Lecture title"
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
          value={lecture.title}
          onChange={(event) => setLecture((prev) => ({ ...prev, title: event.target.value }))}
          required
        />
        <input
          type="url"
          placeholder="Video URL"
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
          value={lecture.videoUrl}
          onChange={(event) => setLecture((prev) => ({ ...prev, videoUrl: event.target.value }))}
          required
        />
        <textarea
          placeholder="Lecture description"
          className="min-h-28 rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
          value={lecture.description}
          onChange={(event) => setLecture((prev) => ({ ...prev, description: event.target.value }))}
          required
        />
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white transition hover:bg-teal-800"
          >
            {loading ? 'Publishing...' : 'Publish lecture'}
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            onClick={onSeeStudents}
          >
            See students
          </button>
        </div>
      </form>
    </section>
  );
}
