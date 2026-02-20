export function Coursedetails({ course, onBack, onEnroll }) {
  if (!course) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <h2 className="mb-3 text-2xl font-bold text-slate-900">Course not found</h2>
        <button
          type="button"
          className="rounded-lg bg-teal-700 px-4 py-2 font-medium text-white transition hover:bg-teal-800"
          onClick={onBack}
        >
          Back to courses
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <button type="button" className="mb-2 font-medium text-sky-700 transition hover:text-sky-900" onClick={onBack}>
        Back
      </button>
      <h1 className="mb-1 text-3xl font-black tracking-tight text-slate-900">{course.title}</h1>
      <p className="mb-3 text-slate-600">
        {course.category} | {course.level} | {course.duration}
      </p>
      <p className="text-slate-700">{course.description}</p>

      <div className="my-4 flex flex-wrap gap-4 text-sm text-slate-700">
        <span>{course.rating} stars</span>
        <span>{course.students.toLocaleString()} students</span>
        <span>Instructor: {course.instructor}</span>
      </div>

      <h2 className="mb-2 text-xl font-bold text-slate-900">Lectures</h2>
      <ul className="mb-5 list-disc space-y-1 pl-5 text-slate-700">
        {course.lectures.map((lecture) => (
          <li key={lecture}>{lecture}</li>
        ))}
      </ul>

      <button
        type="button"
        className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white transition hover:bg-teal-800"
        onClick={() => onEnroll(course.id)}
      >
        Enroll now (${course.price})
      </button>
    </section>
  );
}
