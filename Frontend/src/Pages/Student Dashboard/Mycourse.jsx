export function Mycourse({ courses, onBrowseCourses }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-3xl font-black tracking-tight text-slate-900">My Learning</h1>
      {courses.length === 0 ? (
        <div className="grid gap-3">
          <p className="text-slate-700">You have not enrolled in any course yet.</p>
          <button
            type="button"
            className="w-fit rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white transition hover:bg-teal-800"
            onClick={onBrowseCourses}
          >
            Browse courses
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-50">
            <tr>
              <th className="border-b border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700">Course</th>
              <th className="border-b border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700">Instructor</th>
              <th className="border-b border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700">Progress</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="border-b border-slate-200 px-3 py-2 text-slate-800">{course.title}</td>
                <td className="border-b border-slate-200 px-3 py-2 text-slate-700">{course.instructor}</td>
                <td className="border-b border-slate-200 px-3 py-2 text-slate-700">In progress</td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
