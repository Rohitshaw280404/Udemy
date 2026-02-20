import { useState } from 'react';

export function Addlecture({ onSeeStudents }) {
  const [lecture, setLecture] = useState({ title: '', videoUrl: '', description: '' });

  const onSubmit = (event) => {
    event.preventDefault();
    alert(`Lecture '${lecture.title}' added (demo).`);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-3xl font-black tracking-tight text-slate-900">Add Lecture</h1>
      <form className="grid gap-3" onSubmit={onSubmit}>
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
            className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white transition hover:bg-teal-800"
          >
            Publish lecture
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
