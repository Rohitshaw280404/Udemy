export function Seestudent({ students }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-4 text-3xl font-black tracking-tight text-slate-900">Enrolled Students</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-slate-50">
          <tr>
            <th className="border-b border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700">Name</th>
            <th className="border-b border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700">Email</th>
            <th className="border-b border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700">Course</th>
            <th className="border-b border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700">Progress</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.email}>
              <td className="border-b border-slate-200 px-3 py-2 text-slate-800">{student.name}</td>
              <td className="border-b border-slate-200 px-3 py-2 text-slate-700">{student.email}</td>
              <td className="border-b border-slate-200 px-3 py-2 text-slate-700">{student.course}</td>
              <td className="border-b border-slate-200 px-3 py-2 text-slate-700">{student.progress}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </section>
  );
}
