export function Home({ featuredCourses, onBrowseCourses, onOpenCourse }) {
  const getId = (course) => course._id || course.id;
  const getInstructorName = (course) =>
    typeof course.instructor === 'object' ? course.instructor?.name : course.instructor;

  return (
    <div className="grid gap-5">
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-cyan-50 to-amber-50 p-6 shadow-sm md:p-8">
        <p className="mb-2 text-xs font-extrabold tracking-[0.16em] text-slate-600">ONLINE LEARNING PLATFORM</p>
        <h1 className="mb-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Build skills that move your career forward</h1>
        <p className="max-w-3xl text-slate-700">
          Learn from real-world courses in web development, design, data science,
          and more. Study at your pace and practice with project-based lessons.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg bg-teal-700 px-4 py-2 font-semibold text-white transition hover:bg-teal-800"
            onClick={onBrowseCourses}
          >
            Explore Courses
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Featured Courses</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredCourses.map((course) => (
            <article key={getId(course)} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="mb-1 text-lg font-semibold text-slate-900">{course.title}</h3>
              <p className="mb-2 text-sm text-slate-600">{getInstructorName(course)}</p>
              <p className="mb-3 text-slate-700">{course.description}</p>
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-slate-900">${course.price}</span>
                <button
                  type="button"
                  className="font-medium text-sky-700 transition hover:text-sky-900"
                  onClick={() => onOpenCourse(getId(course))}
                >
                  View details
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
