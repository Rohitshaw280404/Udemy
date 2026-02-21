export function Courselisting({ courses, onOpenCourse }) {
  const getId = (course) => course._id || course.id;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-1 text-3xl font-black tracking-tight text-slate-900">All Courses</h1>
      <p className="mb-5 text-slate-600">Choose a course and start learning today.</p>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <article key={getId(course)} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-1 text-lg font-semibold text-slate-900">{course.title}</h3>
            <p className="mb-2 text-sm text-slate-600">
              {course.category} | {course.level}
            </p>
            <p className="mb-3 text-slate-700">{course.description}</p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-sm font-medium text-slate-700">
                {course.rating} stars | ${course.price}
              </span>
              <button
                type="button"
                className="font-medium text-sky-700 transition hover:text-sky-900"
                onClick={() => onOpenCourse(getId(course))}
              >
                Open course
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
